import React, { Component } from "react";
import ProfilItem from "./profileItem";
import MotDePassItem from "./motDePasseItem";
import ReseauItem from "./reseauItem";
import NavBarItem from "../NavBarItem";
import "./Profile.css"
import AvatarImageCropper from 'react-avatar-image-cropper';
import axios from "axios"
import { connect } from "react-redux";
import { compose } from "redux";
import { editProfileAction } from "../../Redux/userActions";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imageProfile: undefined,
        files :[],
        loading : false
    };
    this.apply = this.apply.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
}

componentDidMount() {
  
  console.log("localStorage:")
  var data = JSON.parse(localStorage.user)
  var userId = data.user._id ;
  console.log("userrrrrrrrr")
  axios
  .get(`http://localhost:8080/clients/userId?id=${userId}`)
  .then(res => {
    console.log(res.data)
    this.setState({imageProfile : res.data.files})
  })
  .catch(err => console.log(err.response.data));

}
onSubmit(e){
  e.preventDefault()
  console.log("clicked")
  var cancel = this
  this.setState({imageProfile: undefined,
    files:[]
  })
}

apply(file) {
    // handle the blob file you want
    // such as get the image src

    this.setState({loading : true })
    var thisLocal = this ;
    console.log("remplir inside applay function", file);

    const formData = new FormData() 
    const fileBeta = file
    formData.append("files", fileBeta);

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    axios({  
        method: "POST",
        url: `/clients/update-profile`,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { Authorization: localStorage.getItem("Authorization") }
    }).then(function(response) {
        console.log("response update-profile ;;;;;;;");
        console.log(response);
        thisLocal.setState(
          {
            imageProfile : response.data.files,
            loading : false
          })


    }).catch(function(error) {
        console.log("error update-profile ;;;;;;;");
        console.log(error);
    });
    var src = window.URL.createObjectURL(file);
}


  render() {

    const {imageProfile,loading} = this.state

    return (
      <div className="Profile">
        <section className="page-banner padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-uppercase"> Immobilier App </h1>
                <h3
                  className="text-uppercase"
                  style={{ color: "white", marginBottom: "27px" }}
                >
                  Vente, Achat Etude et Conseil dans le domaine Immobilier
                </h3>
                <p className="text-uppercase">Serving you since 1999</p>
              </div>
            </div>
          </div>
        </section>
        {/* Profile Start */}
        <section id="agent-2-peperty" className="profile padding">
          <div className="container">
            <div className="row">
              <NavBarItem currentPage="profile" />
            </div>
          </div>
          <div className="container-3">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <h2 className="text-uppercase bottom30">mon profil</h2>
                <div className="agent-p-img">
               
                      <div style={{ width: '260px', height: '300px', margin: 'auto', border: '1px solid black' }}>
                      <button onClick={this.onSubmit}className="fa fa-times-circle"
                             style={{fontSize:"30px",color:"red",marginLeft:"217px",marginTop:"10px"
                          }}></button>
                  { 
                      imageProfile == undefined 
                      ? 
                      
                          <AvatarImageCropper apply={this.apply} />
                      :
                          <div>
                            
                            
                            {
                              loading == false
                              ?
                              <img src={`http://localhost:8080/uploads/${imageProfile[0].filename}`} style={{width:"100%"}} />
                              :
                              <p>loading ....</p>
                            }
                          </div>
                  }
                  
                  
                
              </div>
                </div>
                
              </div>
              <div className="col-md-8">
                <div className="profile-form">
                  <ProfilItem />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-6 col-xs-12 profile-form margin40">
                <h3 className="bottom30 margin40">Mon réseau social</h3>
                <ReseauItem />
              </div>
              <div className="col-md-2 hidden-xs" />
              <div className="col-md-5 col-sm-6 col-xs-12 profile-form margin40">
                <h3 className=" bottom30 margin40">
                  Changer Votre Mot DE Passe
                </h3>
                <MotDePassItem />
              </div>
            </div>
          </div>
        </section>
        {/* Profile end */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default compose(
  connect(
    mapStateToProps,
    { editProfileAction }
  )

)(Profile);
