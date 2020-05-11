import React from 'react';
import Header from './Components/Header/Header';
import axios from "axios";

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
            id : this.props.match.params.id,
            firstName: "",
            lastName: "",
            email: "",
        }
    }
    getUserInfo = () => {
        var id = this.state.id.substring(1,this.state.id.length)
        axios.get('http://localhost:5000/api/users/' + id.toString())
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
        console.log("id", this.props.match.params.id);
        this.getUserInfo();
        return (
            <div>
                <Header />
                <section className="container">
                    <h1>Welcome Back!</h1>
                    <ul>
                        <li>Plans</li>
                        <li>Update Profile</li>
                        <li>Delete Account</li>
                    </ul>
                </section>
            </div>
        );
    }
}