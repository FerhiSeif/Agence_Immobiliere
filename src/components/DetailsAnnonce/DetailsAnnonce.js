import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./detailsAnnonce.css";
import { getSelectedAnnoncementAction } from "../../Redux/annoncesActions";

class DetailsAnnonce extends Component {
  componentDidMount() {
    this.props.getSelectedAnnoncementAction(this.props.id);
  }

  displayAnnoncementOptions = () => {
    let { options } = this.props.selectedAnnoncement;
    let optionsKeys = Object.keys(options);
    let validOptions = optionsKeys.filter(el => options[el] === true);
    return validOptions;
  };

  render() {
    let { selectedAnnoncement } = this.props;
    return (
      <div className="details-annonce-container">
        {/* Page Banner Start*/}
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
        {/* Page Banner End */}
        {/* Property Detail */}
        <section id="property" className="padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 listing1 property-details">
                {selectedAnnoncement.situation === false && (
                  <p className="annonce-situation">
                    Cette annonce est en cours de validation par les
                    administrateurs
                  </p>
                )}
                <h2 className="text-uppercase">{selectedAnnoncement.titre}</h2>
                <p className="bottom30">
                  {selectedAnnoncement.adresse}, {selectedAnnoncement.region}
                </p>

                <div id="property-d-1" className="owl-carousel single">
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="surface"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-1-1.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div id="property-d-1-2" className="owl-carousel single">
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-2.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-3.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-4.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-5.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-1.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="images/property-details/property-d-s-1-2.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                <div className="property_meta bg-black bottom40">
                  <span>
                    <i className="icon-select-an-objecto-tool" />
                    Surface : {selectedAnnoncement.surface}
                  </span>
                  <span>
                    <i className=" icon-microphone" /> Chambres :{" "}
                    {selectedAnnoncement.nombrePiece}
                  </span>
                  <span>
                    <i className="icon-safety-shower" />
                    Salle de bain : {selectedAnnoncement.nombreSalleDeBain}
                  </span>
                  <span>
                    <i className="icon-old-television" />
                    Salon : {selectedAnnoncement.nombreSalon}
                  </span>
                  <span>
                    <i className="icon-garage" /> Garage :{" "}
                    {selectedAnnoncement.nombreGarage}
                  </span>
                </div>
                <h2 className="text-uppercase"> Déscription de la propriété</h2>
                <p className="bottom30">{selectedAnnoncement.description}</p>

                <h2 className="text-uppercase bottom20">SOMMAIRE RAPIDE</h2>
                <div className="row property-d-table bottom40">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-striped table-responsive">
                      <tbody>
                        <tr>
                          <td>
                            <b>ID propriété </b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement._id}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>prix</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.statut === "A louer"
                              ? selectedAnnoncement.prix + "/Mois"
                              : selectedAnnoncement.prix}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Surface</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.surface} M²
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Chambre</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombrePiece}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-striped table-responsive">
                      <tbody>
                        <tr>
                          <td>
                            <b>Salles de bain</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreSalleDeBain}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Garages </b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreGarage}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Etage</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.nombreEtage}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>valable a partir de</b>
                          </td>
                          <td className="text-right">
                            {selectedAnnoncement.ValableAPartirDe.slice(0, 10)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">Options</h2>
                <div className="row bottom40">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <ul className="pro-list options-list">
                      {this.displayAnnoncementOptions().map((el, i) => {
                        return (
                          <li key={i} style={{ textTransform: "capitalize" }}>
                            {el}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">
                  Vidéo de Présentation
                </h2>
                <div className="row bottom40">
                  <div className="col-md-12 padding-b-20">
                    <div className="pro-video">
                      <figure className="wpf-demo-gallery">
                        <video className="video" controls>
                          <source src="video/video.mp4" type="video/mp4" />
                          <source src="video/video.html" type="video/ogg" />
                        </video>
                      </figure>
                    </div>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">localisation</h2>
                <div className="row bottom40">
                  <div className="col-md-12 bottom20">
                    <div className="property-list-map">
                      <div
                        id="property-listing-map"
                        className="multiple-location-map"
                        style={{ width: "100%", height: "430px" }}
                      />
                    </div>
                  </div>
                  <div class="social-networks">
                    <div class="social-icons-2">
                      <span class="share-it">Share this Property</span>
                      <span>
                        <a href="#">
                          <i class="fa fa-facebook" aria-hidden="true"></i>{" "}
                          Facebook
                        </a>
                      </span>
                      <span>
                        <a href="#">
                          <i class="fa fa-twitter" aria-hidden="true"></i>{" "}
                          Twitter
                        </a>
                      </span>
                      <span>
                        <a href="#">
                          <i class="fa fa-google-plus" aria-hidden="true"></i>{" "}
                          Google +
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-uppercase bottom20">Contact Agent</h2>
                <div className="row">
                  <div className="col-sm-4 bottom40">
                    <div className="agent_wrap">
                      <div className="image">
                        <img src="images/agent-round1.png" alt="Agents" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 bottom40">
                    <div className="agent_wrap">
                      <h3>Bohdan Kononets</h3>
                      <p className="bottom30">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh tempor cum soluta nobis
                        consectetuer adipiscing eleifend option congue nihil
                        imperdiet doming…
                      </p>
                      <table className="agent_contact table">
                        <tbody>
                          <tr className="bottom10">
                            <td>
                              <strong>Téléphone:</strong>
                            </td>
                            <td className="text-right">(+01) 34 56 7890</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Email Adress:</strong>
                            </td>
                            <td className="text-right">
                              <a href="#.">bohdan@castle.com</a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Skype:</strong>
                            </td>
                            <td className="text-right">
                              <a href="#.">bohdan.kononets</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div
                        style={{ borderBottom: "1px solid #d3d8dd" }}
                        className="bottom15"
                      />
                      <ul className="social_share">
                        <li>
                          <a href="#." className="facebook">
                            <i className="icon-facebook-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="twitter">
                            <i className="icon-twitter-1" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="google">
                            <i className="icon-google4" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="linkden">
                            <i className="fa fa-linkedin" />
                          </a>
                        </li>
                        <li>
                          <a href="#." className="vimo">
                            <i className="icon-vimeo3" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-4 bottom40">
                    <form className="callus">
                      <div className="form-group">
                        <label> Nom </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                        />
                      </div>
                      <div className="form-group">
                        <label> Teléphone </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Téléphone"
                        />
                      </div>
                      <div className="form-group">
                        <label> Email </label>

                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <label> Message </label>

                        <textarea
                          className="form-control"
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn-blue uppercase border_radius"
                        defaultValue="Envoyer Message"
                      />
                    </form>
                  </div>
                </div>
                <div className="row">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh tempor cum soluta nobis consectetuer adipiscing eleifend option congue nihil imperdiet doming…</p>
                <div className="col-sm-4 bottom40">
                <input
                        type="submit"
                        className="btn-blue uppercase border_radius"
                        defaultValue="Envoyer Message"
                      />
                      </div>
                      <div className="col-sm-4 bottom40">
                      <input
                              type="submit"
                              className="btn-blue uppercase border_radius"
                              defaultValue="Envoyer Message"
                            />
                            </div>
                            <div className="col-sm-4 bottom40">
                            <input
                                    type="submit"
                                    className="btn-blue uppercase border_radius"
                                    defaultValue="Envoyer Message"
                                  />
                                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  Property Detail End */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAnnoncement: state.singleAnnouncementReducer.selectedAnnoncement
  };
};

export default connect(
  mapStateToProps,
  { getSelectedAnnoncementAction }
)(DetailsAnnonce);
