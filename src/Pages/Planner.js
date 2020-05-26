import React from 'react';
import PlannerHeader from './Components/Planner/Planner-Header/Header';
import PlannerSideBar from './Components/Planner/Planner-SideBar/SideBar';
import * as PlannerComponents from './Components/Planner/Planner-Router/Router';
import './Planner.css';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Header from './Components/Header/Header';

//todo: make a function to handle total cost: flight (passed by sidebar) + stays (passed by sidebar) + activities (passed by Main - ok)
export default class Planner extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    
    constructor(props) {
        super(props);
        //this.handler = this.handler.bind(this);
        this.state = {
            selectedComponent: '',
            title: '',
            locations: '',
            length: '',
            budget: 0.0,
            new_plan_id: "", //we use this field if the user edit other user's plan
        }
        console.log(props);
        this.getPlannerInfo();
    }

    // this function retrieve plan data from the database
    // if user != the plan author, we create a duplicate plan
    // and post it to user's database
    getPlannerInfo = () => {
        let user_id = this.props.match.params.user_id.substring(1); 
        let plan_id = this.props.match.params.plan_id;
        axios.get('http://localhost:5000/api/plans/' + plan_id.substring(1, plan_id.length))
            .then((response) => {
                // handle success
               
                var plan_info = response.data;
                if(response.status === 200){
                    let plan_author = plan_info.author;
                    
                    if(plan_author !== user_id){
                        this.createDuplicatePlan(user_id, plan_info);
                    }
                    this.setState({
                        title: plan_info.name,
                        locations: plan_info.locations,
                        budget: plan_info.budget,
                        author: plan_author
                    })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    // we call this when user see a plan that they like from map
    // but that plan belongs to other user
    // we duplicare that plan & let them edit the new duplicated plan
    createDuplicatePlan = (user_id, plan_info) => {
        console.log(plan_info);
        const dup_plan = {
            author: user_id,
            budget: plan_info.budget,
            locations: plan_info.locations,
            name: plan_info.name
        }

        //delete old plans from user
        axios.get('http://localhost:5000/api/users/' + user_id)
            .then((response) => {
                let user_data = response.data[0];
                const old_id_index = user_data.plans.indexOf(plan_info._id.$oid);
                if(user_data.plans.length > 1)
                    delete user_data.plans[old_id_index];
                else
                    user_data.plans=[];
                delete user_data["_id"];
                //update user data
                axios.put('http://localhost:5000/api/users/' + user_id, user_data)
                    .then((response) =>{
                        console.log("success removing old plan id");
                        console.log(response);
                        //post new plan to database
                        axios.post('http://localhost:5000/api/plans/', dup_plan)
                        .then((response) =>{
                            //handle success
                            const newId = response.data.id;
                            this.updatePlanArray(user_id, user_data, newId);
                            this.setState({
                                new_plan_id: newId
                            })
                        })
                        .catch(function(error){
                            console.log(error);
                        })
                    })
                    .catch ((error) =>{
                        console.log("error removing old plan", error)
                    })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }
    
    updatePlanArray = (user_id, user_data, new_plan_id) =>{
        user_data.plans.push(new_plan_id);
        delete user_data["_id"];
        //update user info
        axios.put('http://localhost:5000/api/users/' + user_id, user_data)
            .catch(error =>{
                console.log("error updating user data", error)
            })

    }

    //this function is to be passed to main
    //when user adds or remove plan from main, 
    //main will pass the cost difference so we can update this state
    updateBudget = (priceDifference, location_id, day, day_time) =>{
        // if a location is removed => we remove it from the database
        if (priceDifference < 0){
            //delete from location database
            const index_to_remove = this.state.locations[day][day_time].indexOf(location_id);
            let updated_locations = this.state.locations;
            updated_locations[day][day_time].splice(index_to_remove,1)
            this.setState({
                locations: updated_locations,
            })
        } //else, user adds a new location
        else if(priceDifference > 0){
            const updated_locations = this.state.locations[day][day_time].push(location_id);
            this.setState({
                locations: updated_locations,
            })
        }
        //update the database 
        const plan_id = this.props.match.params.plan_id.substring(1);
        const new_plan_data = {
            name: this.state.title,
            locations: this.state.locations,
            budget: this.state.budget + priceDifference,
            author: this.state.author
        }
        axios.put('http://localhost:5000/api/plans/' + plan_id, new_plan_data)
            .then((response) =>{
                this.setState({
                    budget: this.state.budget + priceDifference,
                })
                //this.selectComponent("Activity", day);
            })
            .catch(error =>{
                console.log("error updating user data", error)
            })
    }

    
    selectComponent = (comp, day) => {
        console.log(comp, day);
        this.setState({
            selectedComponent: comp,
            selectedDay: day
        })
    }
    //this method renders Flight, Stays, or Activity based on users' choice
    renderSelectedComponent(selectedComponent){
        //default option to stay
        const Com = (!selectedComponent) ? PlannerComponents["Stay"]: PlannerComponents[selectedComponent];
        if(selectedComponent === "Activity"){
            return <Com 
            locations = {this.state.locations}
            day = {this.state.selectedDay}
            updateBudget = {this.updateBudget}
            />
        }
        return <Com />

    }

    render() {
        if(this.state.new_plan_id !== ""){
            const path = "/plan-trip/" + this.props.match.params.user_id + "/:" + this.state.new_plan_id;
            return <Redirect to = {path} />
        }
        return (
            <div>
            <Header isLoggedIn = {this.props.match.params.user_id.substring(1)} />
            <PlannerHeader
                title = {this.state.title}
                length = {this.state.length}
                budget = {this.state.budget}
            />
            <div id ="Planner-container">
                <PlannerSideBar handleClick = {this.selectComponent} 
                    plan_id = {this.props.match.params.plan_id.substring(1)}/>
                <div id="planner-main">
                {this.renderSelectedComponent(this.state.selectedComponent)}
                </div>
            </div>
            </div>
        );
    }
}