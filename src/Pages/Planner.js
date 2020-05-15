import React from 'react';
import PlannerHeader from './Components/Planner/Planner-Header/Header';
import PlannerSideBar from './Components/Planner/Planner-SideBar/SideBar';
import * as PlannerComponents from './Components/Planner/Planner-Router/Router';
import './Planner.css';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

//todo: make a function to handle total cost: flight (passed by sidebar) + stays (passed by sidebar) + activities (passed by Main)
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
            budget:'',
            new_plan_id: "" //we use this field if the user edit other user's plan
        }
        console.log(props);
        this.getPlannerInfo();
    }

    // this function retrieve plan data from the database
    // if user != the plan author, we create a duplicate plan
    // and post it to user's database
    getPlannerInfo = () => {
        let user_id = this.props.match.params.user_id.substring(1, this.props.match.params.user_id.length); 
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
        //post to axios
        axios.post('http://localhost:5000/api/plans/', dup_plan)
            .then((response) =>{
                //handle success
                console.log(response);
                const newId = response.data.id;
                console.log("new id = ", newId);
                this.setState({
                    new_plan_id: newId
                })
                //TODO: delete old plan in user API, post new plan
            })
            .catch(function(error){
                console.log(error);
            })
    }
    
    selectComponent = (comp, day) => {
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
            console.log("activity")
            return <Com 
            locations = {this.state.locations}
            day = {this.state.selectedDay}
            />
        }
        return <Com />

    }

    render() {
        if(this.state.new_plan_id !== ""){
            console.log("redirecting");
            const path = "/plan-trip/" + this.props.match.params.user_id + "/:" + this.state.new_plan_id;
            return <Redirect to = {path} />
        }
        return (
            <div>
            <PlannerHeader
                title = {this.state.title}
                length = {this.state.length}
                budget = {this.state.budget}
            />
            <div id ="Planner-container">
                <PlannerSideBar handleClick = {this.selectComponent}/>
                <div id="planner-main">
                {this.renderSelectedComponent(this.state.selectedComponent)}
                </div>
            </div>
            </div>
        );
    }
}