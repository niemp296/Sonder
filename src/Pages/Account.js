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
            id : this.props.match.params.id.substring(1, this.props.match.params.id.length),
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

    //this method is called when user clicks the addplan button
    addPlan = () =>{
        this.setState({
            add_plan: true
        })
    }

    //this method is called when the user clicks on one of the plan
    seePlan = (plan_id) => {
        console.log(plan_id);
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
    /*
    TODO: redirect add plans to map
    */
    render() {
        if(this.state.add_plan){
            return <Redirect to ="/"></Redirect>
        }
        if(this.state.see_plan !== ""){
            let path = '/plan-trip/:' + this.state.id + '/:' + this.state.see_plan;
            return <Redirect to = {path} />
        }
        return (
            <div>
                <Header />
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
                        <button type="button" className="btn btn-outline-dark">Update Profile</button>
                        <button type="button" className="btn btn-outline-dark">Log Out</button>
                        <button type="button" className="btn btn-outline-danger">Delete Account</button>
                    </div>
                </section>
            </div>
        );
    }
}