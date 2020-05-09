import React, { Component } from "react";
import "./SignIn.css";
import Link from '@material-ui/core/Link';
import Header from '../Header/Header';

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
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
       //TODO: validate info then direct to home page
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
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

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
        <div>
            <Header/>     
        <div className="outerContainer">
            <div className="registrationForm">
                <h1 className="title">
                    Welcome back!
                </h1>
            <form onSubmit={this.handleSubmit} noValidate>
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