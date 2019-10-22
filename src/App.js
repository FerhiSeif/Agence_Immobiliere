import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routes from "./Routes";
import { getProfileAction } from "./Redux/userActions";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("Authorization")) {
      !this.props.user.nom && this.props.getProfileAction();
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getProfileAction }
)(App);
