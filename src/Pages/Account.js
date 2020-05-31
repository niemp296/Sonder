import React from 'react';
import Header from './Components/Header/Header';
import axios from "axios";
import "./Account.css";
import Plan from './Components/Plan/Plan'
import { Redirect } from 'react-router-dom'
/*
todo: 
- get user id from props
- populate state with user field
*/
export default class Account extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    
    constructor(props) {
        super(props);
        //this.handler = this.handler.bind(this);
        this.state = {
            id : this.props.match.params.id.substring(1),
            firstName: "",
            lastName: "",
            email: "",
            plans: [],
            add_plan: false,
            see_plan: ""
        }
        this.getUserInfo();
    }
    getUserInfo = () => {
        var id = this.state.id;
        axios.get('http://localhost:5000/api/users/' + id.toString())
            .then((response) => {
                // handle success
                let user_data = response.data[0];
                if(response.status === 200){
                    this.setState({
                        firstName: user_data.firstName,
                        lastName: user_data.lastName,
                        email: user_data.email,
                        plans: user_data.plans
                    })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    updateUserInfo = (new_plan_id) => {
        //get all id
        let userplans =[]
        for (let id in this.state.plans){
            userplans.push(this.state.plans[id].$oid)
        }
        console.log(userplans);
        userplans.push(new_plan_id);
        const new_user_info = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            plans: userplans
        }
        console.log(new_user_info)
        axios.put('http://localhost:5000/api/users/' + this.state.id, new_user_info)
        .then((response)=>{
            console.log("updateUserInfo success");
            this.setState({
                see_plan: new_plan_id
            })
        })    
        .catch(error =>{
                alert("Error: New plan was created, but fail to push to user's database")
            })
    }
    //this method is called when user clicks the addplan button
    addPlan = () =>{
        const new_plan = {
            name : "Untitled Plan",
            locations: [{
                morning: [], afternoon: [], evening: []
            }],
            budget: 0.0,
            author: this.state.id
        }
        // post to the database
        axios.post('http://localhost:5000/api/plans/', new_plan)
                .then((response) =>{
                    console.log("posted to database");
                    //then update user database
                    const new_plan_id = response.data.id;
                    console.log(new_plan_id);
                    this.updateUserInfo(new_plan_id);
                })
                .catch(function(error){
                    console.log(error);
                })
    }

    //this method is called when the user clicks on one of the plan
    seePlan = (plan_id) => {
        this.setState({
            see_plan: plan_id.$oid
        })
    }

    renderPlans(){
        if (this.state.plans.length === 0) return null

        else {
            return(<ul id="user-plans-group">{
                this.state.plans.map(
                    plan => 
                    <li onClick = {() => this.seePlan(plan)}> <Plan id={plan}></Plan>
                    </li>)} 
                    </ul>);
        }
    }

    signOut = () =>{
        console.log("signing out..");
        this.setState({
            isSignedOut: true
        })
    }

    render() {
        if(this.state.isSignedOut === true){
            return <Redirect to = '/' />
        }
        if(this.state.see_plan !== ""){
            let path = '/plan-trip/:' + this.state.id + '/:' + this.state.see_plan;
            return <Redirect to = {path} />
        }
        return (
            <div>
                <Header isLoggedIn = {this.state.id}/>
                <section id="account-container">
                    <section id ="greet_user">
                        <h1 className="greet_user">Hello,</h1>
                        <h1 className="greet_user">{this.state.firstName}</h1>
                    </section>
                    <section id="account-plan-list">
                        <h1>Your travel plans</h1>
                        <button 
                        className="btn btn-lg btn-block btn-outline-dark"
                        onClick = {this.addPlan
                        }>
                            Add a plan
                        </button>
                        {this.renderPlans()}
                    </section>
                    <div className="btn-toolbar account-button-group" role="group" aria-label="account-btn-settings">
                        <button type="button" className="btn btn-outline-dark" onClick = {this.signOut}>Log Out</button>
                        {/*<button type="button" className="btn btn-outline-dark">Update Profile</button>
                        <button type="button" className="btn btn-outline-danger">Delete Account</button>*/}
                    </div>
                </section>
            </div>
        );
    }
}