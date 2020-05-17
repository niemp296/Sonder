import React, { Component } from "react";
import "./SignUp.css";
import Link from '@material-ui/core/Link';
import Header from '../Header/Header';
import axios from 'axios';
import {Redirect} from "react-router-dom"

const checkEmailFormat = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      traveler: false,
      advertiser: false,
      email: null,
      password: null,
      confirmPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      isRegistered: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      if (this.state.firstName !== "") {
        axios.post('http://localhost:5000/api/signUp', this.state)
        .then(response => {
          if(response.data === 400 || response.data === "400"){
              alert("User Already exist");
              console.log("user already exists");
            }
          else if(response.data === 200 || response.data === "200"){
            this.setState({
              isRegistered: true
            })
            alert("You are succesfully registered");
          } 
        })
        .catch(function(error){
          console.log("There's an error passing in data to the back-end")
          console.log(error);
        });
    } else {
        alert("The search query cannot be empty")
    }

    } 
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = checkEmailFormat.test(value) ? "" : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confirmPassword":	
        formErrors.confirmPassword =	
          (value !== this.state.password) ? "password does not match" : "";	
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    if(this.state.isRegistered){
      return (
        <Redirect to ="/sign-in"></Redirect>
      )
    }
    return (
        <div>
            <Header/>     
        <div className="outerContainer">
            <div className="registrationForm">
                <h1 className="title">
                    Sign Up
                </h1>
            <form action ="http://127.0.0.1:5000/api/signUp" method ="post" onSubmit={this.handleSubmit} noValidate>
                <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                    className={formErrors.firstName.length > 0 ? "error" : null}
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    noValidate
                    onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                )}
                </div>
                <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                    className={formErrors.lastName.length > 0 ? "error" : null}
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    noValidate
                    onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                )}
                </div>
                <div>
                {/* TODO: connect state varible traveler and advertiser here  */}
                <label className="areyou">Are you: </label>
                    <label className="container"> Traveler
                        <input 
                            type="radio" 
                            checked="checked" 
                            name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container"> Advertiser
                        <input 
                            type="radio" 
                            checked="checked"
                            name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="email">
                <label htmlFor="email">Email</label>
                <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                )}
                </div>
                <div className="password">
                <label htmlFor="password">Password</label>
                <input
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                )}
                </div>
                <div className="password">
                <label htmlFor="password">Confirm Password</label>
                <input
                    className={formErrors.confirmPassword.length > 0 ? "error" : null}
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    noValidate
                    onChange={this.handleChange}
                />
                {formErrors.confirmPassword.length > 0 && (
                    <span className="errorMessage">{formErrors.confirmPassword}</span>
                )}
                </div>
                <div className="createAccount">
                <button type="submit">Create Account</button>
                <Link href="/sign-in" variant="body">
                    <small>  {"Already have an account? Sign in"} </small>
                </Link>
                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default SignUp;