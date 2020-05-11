import React from 'react';
import Header from './Components/Header/Header';
import axios from "axios";
import "./Account.css";
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
        }
        this.getUserInfo();
    }
    getUserInfo = () => {
        var id = this.state.id;
        axios.get('http://localhost:5000/api/users/' + id.toString())
            .then((response) => {
                // handle success
                console.log(response);
                console.log(response.data[0].firstname);
                console.log(response.data[0].lastName);
                console.log(response.data[0].email);
                
                var user_data = response.data[0];
                if(response.status === 200){
                    this.setState({
                        firstName: user_data.firstname,
                        lastName: user_data.lastName,
                        email: user_data.email
                    })
                    console.log(this.state);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <Header />
                <section id="account-container">
                    <section id ="greet_user">
                        <h1 className="greet_user">Welcome Back, </h1>
                        <h1 className="greet_user">{this.state.firstName}</h1>
                    </section>
                    <section id="account-plan-list">
                        <h1>Your travel plans:</h1>
                    </section>
                    <div class="btn-toolbar account-button-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-dark">Update Profile</button>
                        <button type="button" class="btn btn-outline-dark">Change Password</button>
                        <button type="button" class="btn btn-outline-danger">Delete Account</button>
                    </div>
                </section>
            </div>
        );
    }
}