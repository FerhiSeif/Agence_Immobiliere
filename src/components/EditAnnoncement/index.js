import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import NavBarItem from "../NavBarItem";
import checkboxes from "./checkboxes";
import Checkbox from "./checkbox";
import { villes, categories, numbers } from "./static";
import {
  getSelectedAnnoncementToEditAction,
  editSelectedAnnoncementAction
} from "../../Redux/annoncesActions";

import "./editAnnoncement.css";

const BASE_URL = "http://localhost:8080/";

class EditAnnoncement extends Component {
  constructor() {
    super();
    this.state = {
      titre: "",
      region: "",
      surface: "",
      adresse: "",
      prix: "",
      nombreEtage: "",
      nombrePiece: "",
      nombreFacade: "",
      nombreSalleDeBain: "",
      statut: "",
      description: "",
      ALaUne: "",
      ValableAPartirDe: "",
      etat: "",
      categorie: "",
      options: {
        piscine: false,
        jardin: false,
        interphone: false,
        internet: false,
        vueSurMer: false,
        camera: false,
        chauffage: false,
        balcon: false,
        climatisation: false
      },
      images: [],
      imageUrls: [],
      message: "",
      nombreGarage: "",
      nombreSalon: ""
    };
  }

  componentDidMount() {
    this.accessControl();
    this.props.getSelectedAnnoncementToEditAction(this.props.id).then(() => {
      this.setState({
        ...this.props.editableAnnoncement
      });
    });
  }

  accessControl = () => {
    let autorization = localStorage.getItem("Authorization");
    if (!autorization) this.props.history.push("/login");
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onEditButtonClicked = () => {
    this.props
      .editSelectedAnnoncementAction({
        ...this.state
      })
      .then(res => {
        res === 200 && this.props.history.push("/mesProprietes");
      });
  };

  handleChange(e) {
    this.setState({
      options: {
        ...this.state.options,
        [e.target.name]: !this.state.options[e.target.name]
      }
    });
  }
  selectImages = event => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
    let message = `${images.length} valid image(s) selected`;
    this.setState({ images, message });
  };

  uploadImages = () => {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);

      // Make an AJAX upload request using Axios
      return axios.post(BASE_URL + "upload", data).then(response => {
        this.setState({
          imageUrls: [response.data.imageUrl, ...this.state.imageUrls]
        });
      });
    });

    // Once all the files are uploaded
    axios
      .all(uploaders)
      .then(() => {
        console.log("done");
      })
      .catch(err => alert(err.message));
  };

  render() {
    return (
      <div className="edit-annoncement-container">
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
        {/* My Properties  */}
        <section id="property" className="padding listing1">
          <div className="container">
            <div className="row">
              <NavBarItem currentPage={"modifierAnnonce"} />
            </div>

            <div className="row">
              <div className="col-sm-1 col-md-2" />
              <div className="col-sm-10 col-md-8">
                <h2 className="text-uppercase bottom40">
                  Modifier l'annonce {this.state.titre}
                </h2>
                <form
                  className="callus clearfix border_radius submit_property"
                  onSubmit={() => console.log("hello")}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="single-query form-group bottom20">
                        <label>Titre</label>
                        <input
                          type="text"
                          className="keyword-input"
                          placeholder="Entrer le titre de votre bien"
                          name="titre"
                          value={this.state.titre}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="single-query form-group bottom20">
                        <label>Catégories</label>
                        <select
                          value={this.state.categorie}
                          onChange={this.onChange}
                          name="categorie"
                        >
                          <option>Categorie</option>
                          {categories.map((el, i) => (
                            <option key={i} value={el}>
                              {el}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div
                        className="single-query form-group bottom20"
                        style={{ marginTop: "-8px" }}
                      >
                        <label>region</label>
                        <select
                          name="region"
                          value={this.state.region}
                          onChange={this.onChange}
                        >
                          <option>Localisation</option>
                          {villes.map((el, i) => (
                            <option key={i} value={el}>
                              {el}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="single-query form-group bottom20">
                        <label className="control-label">Adresse</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.onChange}
                          value={this.state.adresse}
                          name="adresse"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="single-query form-group bottom20">
                        <label>Prix</label>
                        <input
                          type="text"
                          className="keyword-input"
                          placeholder="Entrer le titre de votre bien"
                          name="prix"
                          value={this.state.prix}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div
                        className="single-query form-group bottom20"
                        style={{ marginTop: "-102px" }}
                      >
                        <label>Statut</label>
                        {/* <div className="intro"> */}
                        <select
                          value={this.state.statut}
                          onChange={this.onChange}
                          name="statut"
                        >
                          <option className="active" value="A louer">
                            A louer
                          </option>
                          <option className="active" value="A Vendre">
                            A Vendre
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div
                    className="col-sm-12"
                    style={{
                      marginTop: "-19px;",
                      marginBottom: "23px"
                    }}
                  >
                    <h3 className="bottom15 margin40">
                      Détails de la propriété
                    </h3>
                  </div>
                </div>

                <form
                  className="callus clearfix border_radius submit_property"
                  onSubmit={() => console.log("hello")}
                >
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="single-query form-group bottom20">
                        <label>Surface</label>
                        <div className="intro">
                          <input
                            type="text"
                            className="keyword-input"
                            placeholder="Surface (m²)"
                            style={{ paddingTop: "2px" }}
                            name="surface"
                            value={this.state.surface}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-query form-group bottom20">
                        <label>Salon</label>

                        <select
                          name="nombreSalon"
                          value={this.state.nombreSalon}
                          onChange={this.onChange}
                        >
                          <option className="active">Nombre de salon</option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-query form-group bottom20">
                        <label>Salle de bains</label>

                        <select
                          name="nombreSalleDeBain"
                          value={this.state.nombreSalleDeBain}
                          onChange={this.onChange}
                        >
                          <option className="active">
                            Nombre de salle de bains
                          </option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-query  form-group bottom20">
                        <label>Chambres</label>

                        <select
                          name="nombrePiece"
                          value={this.state.nombrePiece}
                          onChange={this.onChange}
                        >
                          <option className="active">Nombre des piéces</option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-query form-group bottom20">
                        <label>Garges</label>
                        <select
                          onChange={this.onChange}
                          name="nombreGarage"
                          value={this.state.nombreGarage}
                        >
                          <option className="active">Nombre de Garges</option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-query form-group  bottom20">
                        <label>Etage</label>
                        <select
                          name="nombreEtage"
                          value={this.state.nombreEtage}
                          onChange={this.onChange}
                        >
                          <option className="active">Nombre des étages</option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="single-query form-group bottom20"
                        // style={{ marginTop: "-102px" }}
                      >
                        <label>Façade</label>
                        <select
                          name="nombreFacade"
                          value={this.state.nombreFacade}
                          onChange={this.onChange}
                        >
                          <option className="active">Nombre de Façade</option>
                          {numbers.map((el, i) =>
                            el !== 3 ? (
                              <option key={i} value={el}>
                                {el}
                              </option>
                            ) : (
                              <option key={i} value={el}>
                                3 ou +
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <h3 className="bottom15 margin40"> Description</h3>
                      <br />
                      <textarea
                        className="keyword-input description-taxt-area"
                        placeholder="Entrer le titre de votre bien"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                      ></textarea>
                      {/* <MyUploader /> */}
                      {/* <textarea id="txtEditor" defaultValue={""} />*/}
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group has-danger">
                        <h3 className="bottom15 margin40">
                          Valables A Partir De
                        </h3>
                        <br />
                        <input
                          type="date"
                          className="form-control"
                          placeholder="dd/mm/yyyy"
                          onChange={this.onChange}
                          value={this.state.ValableAPartirDe}
                          name="ValableAPartirDe"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="margin40 bottom15">
                          {" "}
                          Photos de la Propriété{" "}
                          <i
                            className="fa fa-info-circle help"
                            data-toggle="tooltip"
                            title="add images to upload for property!"
                          />
                        </h3>
                        <div className="file_uploader bottom20">
                          {/* <form onSubmit={this.onSubmit}
                        id="upload-widget"
                        method="post"
                        action="http://wahabali.com/upload"
                        className="dropzone"
                   
                      > */}
                          <div className="col-sm-12">
                            <div className="col-sm-4">
                              <input
                                className="form-control "
                                type="file"
                                onChange={this.selectImages}
                                multiple
                                style={{
                                  height: "188px",
                                  width: "683px"
                                }}
                              />
                            </div>
                            <p className="text-info">{this.state.message}</p>
                            <br />
                            <br />
                            <br />
                            <div className="col-sm-4">
                              <button
                                className="btn btn-primary"
                                value="Submit"
                                onClick={this.uploadImages}
                              >
                                Submit
                              </button>
                            </div>
                          </div>

                          <div className="row col-lg-12">
                            {this.state.imageUrls.map((url, i) => (
                              <div className="col-lg-2" key={i}>
                                <img
                                  src={BASE_URL + url}
                                  className="img-rounded img-responsive"
                                  alt="not available"
                                />
                                <br />
                              </div>
                            ))}
                          </div>
                          <div className="dz-default dz-message">
                            <span>
                              <i className="fa fa-plus-circle" />
                              Cliquez ici pour déposer des fichiers à
                              télécharger
                            </span>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h3 className="bottom15 margin40">Options</h3>
                      <div className="search-propertie-filters">
                        <div className="container-2">
                          <div className="row">
                            <div className="col-md-8 col-sm-8">
                              <div className="form-group white checkbox-container ">
                                {checkboxes.map(item => (
                                  <div className="checkbox-unity">
                                    <Checkbox
                                      name={item.name}
                                      checked={this.state.options[item.name]}
                                      onChange={e => this.handleChange(e)}
                                    />
                                    <label
                                      key={item.key}
                                      style={{
                                        fontSize: "16px",
                                        textTransform: "capitalize"
                                      }}
                                    >
                                      {item.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h3 className="bottom15 margin40">
                        Vidéo de Présentation
                      </h3>
                      <div className="single-query form-group bottom15">
                        <label>URL Vidéos ou Youtube </label>
                        <input
                          type="text"
                          className="keyword-input"
                          placeholder="https://vimeo.com/"
                        />
                      </div>
                    </div>
                    {/*  <TextEditor / > */}
                    <div className="col-sm-12">
                      <h3 className="bottom15 margin40">Placez sur la carte</h3>
                      <div className="single-query form-group bottom15">
                        <label> Addresse de la propriété</label>
                        <input
                          type="text"
                          className="keyword-input"
                          placeholder="Enter La Localisation"
                        />
                      </div>
                      <div id="single_map">{/* <GoogleApiWrapper /> */}</div>
                    </div>
                  </div>
                </form>
                <div className="col-md-4">
                  <button
                    className="btn-blue border_radius margin40"
                    onClick={this.onEditButtonClicked}
                    style={{ height: "60px", margin: "0px" }}
                  >
                    Modifier l'annonce
                  </button>
                </div>
              </div>
              <div className="col-sm-1 col-md-2" />
              <div className="col-sm-4" />
            </div>
          </div>
        </section>
        {/* My Properties End */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    editableAnnoncement: state.editableAnnoncementReducer.selectedAnnoncement
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getSelectedAnnoncementToEditAction, editSelectedAnnoncementAction }
  ),
  withRouter
)(EditAnnoncement);
