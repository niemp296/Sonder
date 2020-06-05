import React, { Component } from "react";
import "./SignIn.css";
import Link from '@material-ui/core/Link';
import Header from '../Header/Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

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

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      },
      isSignedIn: false,
      user_id: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      if (this.state.firstName !== "") {
        axios.post('http://localhost:5000/api/signIn', this.state)
            .then(response => {
                console.log(response);

              if(response.data === "404" || response.data === 404){
                alert("User does not exists")
              }
              else if(response.data === "400"){
                alert("Wrong password")
              }
              else {
                this.setState({user_id: response.data});
                this.setState({isSignedIn: true});
                console.log("sign_in is succesful");
              }
        })
        .catch(function(error){
          //Perform action based on error
            console.log(error);
        });
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    console.log("end of sign in method")
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = checkEmailFormat.test(value) ? "" : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    if(this.state.isSignedIn){
      var path_name = '/Account:' + this.state.user_id;
      return <Redirect to = {{pathname: path_name}} />;
    }
    return (
        <div>
            <Header />     
        <div className="outerContainer">
            <div className="registrationForm">
                <h1 className="title">
                    Welcome back!
                </h1>
            <form action ="http://localHost:5000/api/signIn" method ="post" onSubmit={this.handleSubmit} noValidate>
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
                <div className="signIn">
                <button type="submit">Sign In</button>
                    <Link href="/sign-up" variant="body">
                    <small>  {"Don't have your account? Sign Up"} </small>
                    </Link>
                    <Link href="/forgot-password" variant="body">
                        <small>  {"Forgot your password?"} </small>
                    </Link>
                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default SignIn;