import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";

import { loginAction } from "../../Redux/userActions";
const firebase = require("firebase");

class LoginItem extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      motDePasse: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

   onLoginClick = async() => {
    this.props
      .loginAction({
        email: this.state.email,
        motDePasse: this.state.motDePasse
      })
      .then(() => {
        this.props.history.push("/profile");
      });
      await  firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.motDePasse)
      .then(() => {
        this.props.history.push('/profile');
      }, err => {
        this.setState({ serverError: true });
        console.log('Error logging in: ', err);
      });
  };
  
  
  render() {
    const { errors } = this.state;
    return (
      <div className="agent-p-form">
        <form action="#" className="callus clearfix">
          <div className="single-query form-group col-sm-12">
            <input
              type="text"
              className="keyword-input"
              placeholder="Adresse Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="single-query form-group  col-sm-12">
            <input
              type="text"
              className="keyword-input"
              placeholder="Email Address"
              name="motDePasse"
              value={this.state.motDePasse}
              onChange={this.onChange}
            />
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-6">
                <div className="search-form-group white form-group text-left">
                  <div className="check-box-2">
                    <i>
                      <input type="checkbox" name="check-box" />
                    </i>
                  </div>
                  <span>Remember Me</span>
                </div>
              </div>
              <div className="col-sm-6 text-right">
                <a href="#" className="lost-pass">
                  Lost your password?
                </a>
              </div>
            </div>
          </div>
          <div className=" col-sm-12">
            <Button
              onClick={this.onLoginClick}
           
              className="btn-slide border_radius"
            >
              Soumettre
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
export default compose(
  connect(
    null,
    { loginAction }
  ),
  withRouter
)(LoginItem);
