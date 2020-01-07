import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routes from "./Routes";
import { getProfileAction } from "./Redux/userActions";
import Modal from 'react-awesome-modal';
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      listNotfications:[]
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  closeModal(e) {
      this.setState({
          visible : false,  
      });
  }

  updateList(data)
  {
     this.setState({listNotfications : data})
  }

  openModal() {
    this.setState({
        visible : true
    });
    const {updateList} = this ;
    let response =
    axios.get("http://localhost:8080/notifications/getnotification")
      .then(res => {
                      console.log(res.data);
                      updateList(res.data);
                    })
      .catch(err => console.log(err.response.data)); 
}

  componentDidMount() {
    if (localStorage.getItem("Authorization")) {
      !this.props.user.nom && this.props.getProfileAction();

    }
  }
  render() {
        const { listNotfications } = this.state;
        console.log("itemmm");
        console.log(listNotfications)

    return (
      <BrowserRouter>
        <div className="App">
          <Header openModalBeta={this.openModal} />
            {/* <Modal visible={this.state.visible} width="269" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                <div>
                        {
                          listNotfications.notification
                          ?
                          <div>
                            	{
                                listNotfications.notification.map((el, index) => (
                                <div key={index}>
                                    obj:{el.object}
                                </div>
                                ))
                              }
                          </div>
                          :
                          null
                        }
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                           
                    </a>
                </div>
            </Modal> */}
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
