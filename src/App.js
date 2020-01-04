import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routes from "./Routes";
import { getProfileAction } from "./Redux/userActions";
import Modal from 'react-awesome-modal';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal(e) {
      this.setState({
          visible : false,  
      });
  }

  openModal() {
    this.setState({
        visible : true
    });
}

  componentDidMount() {
    if (localStorage.getItem("Authorization")) {
      !this.props.user.nom && this.props.getProfileAction();
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header openModalBeta={this.openModal} />
            <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                <div>
                    <h1 style={{color:"#e60505"}}><i className="far fa-hand-peace">félicitations 🎉</i></h1>
                    <h4 style={{textAlign:"center",color:"#000000",marginTop:" 63px"}}>votre demande a été envoyée avec succès</h4>
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                            <button type="button" className="btn btn-primary" style={{marginTop:" 44px",width: "94px",height: "48px",marginLeft: "278px"}}>Fermer</button>
                    </a>
                </div>
            </Modal>
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
