import React, { Component } from "react";
import ProfilItem from "./profileItem";
import MotDePassItem from "./motDePasseItem";
import ReseauItem from "./reseauItem";
import NavBarItem from "../NavBarItem";
import "./Profile.css"

class Profile extends Component {
apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    var src = window.URL.createObjectURL(file);
}
  render() {
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
                 {/* <img
                    src="images/profile.jpg"
                    className="img-responsive"
                    alt="image"
                  />
                  <a href="#" className="top10 bottom20">
                    changer votre photo de profil
                  </a>
                  <p className="text-center">
                    Minimum 215px x 215px<span>*</span>
                  </p>*/}
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

export default Profile;
