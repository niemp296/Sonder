import React from 'react';
import logo from '../../../logo.svg';
import './Header.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //need to set up to change this state variable later when sign in
            //and sign up page are done
            //for now can change the boolean of this variable to test for UI
            isLoggedIn : this.props["isLoggedIn"] !== undefined? true : false,
            userId: this.props["isLoggedIn"] !== undefined ? this.props.isLoggedIn : ""
        }
    }

    _beforeLogIn() {
        return (
            <ul> 
                <a href="/">
                    <img src={logo} className="Logo" alt="logo"/> 
                </a>        
                <li><a href="/sign-up">Sign Up</a></li> 
                <li><a href="/sign-in">Sign In</a></li>                                   
            </ul>
        );
    }

    _afterLogIn() {
        let path = "/Account:" + this.state.userId;
        let map = "/map:" + this.state.userId;
        return (
            <ul> 
                <a href={map}>
                    <img src={logo} className="Logo" alt="logo"/> 
                </a>             
                <li><a href={path}>My Profile</a></li>                                    
            </ul>
        );
    }

    render() {
        return (
            <div className="Header">               
                {this.state.isLoggedIn ? this._afterLogIn() : this._beforeLogIn()}
            </div>
        );
    }
}