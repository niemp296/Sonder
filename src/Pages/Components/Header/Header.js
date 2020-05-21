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
            isLoggedIn : false 
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
                <li><a href="#help">Help</a></li>                                      
            </ul>
        );
    }

    _afterLogIn() {
        return (
            <ul> 
                <a href="/">
                    <img src={logo} className="Logo" alt="logo"/> 
                </a>             
                <li><a href="#myProfile">My Profile</a></li> 
                <li><a href="#help">Help</a></li>                                     
            </ul>
        );
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div className="Header">               
                {isLoggedIn ? this._afterLogIn() : this._beforeLogIn()}
            </div>
        );
    }
}