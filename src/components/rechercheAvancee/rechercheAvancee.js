import React, { Component } from "react";
import { connect } from "react-redux";

import "./rechercheAvancee.css";

import { getAnnouncementsList } from "../../Redux/annoncesActions";
import { addFilter } from "../../Redux/filtersActions";

class RechercheAvancee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searched: false,
      ecart: "",
      paginationList: [],
      nbrPages: 0,
      showList: [],
      filtredList: [],
      titre: "",
      region: "",
      categorie: "",
      statut: "",
      nombreChambre: "",
      nombreSalleDeBain: "",
      surface: "",
      prixMax: "",
      prixMin: ""
    };
  }

  sliderChange(value) {
    this.setState({ prix: value });
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.addFilter({ [e.target.name]: e.target.value });
  };

  onRechercheClick = () => {
    let filters = Object.keys(this.props.filters);
    let validFilters = {};
    filters.map(el => {
      if (this.props.filters[el] !== "")
        return (validFilters = {
          ...validFilters,
          [el]: this.props.filters[el]
        });
    });

    this.props.getAnnouncementsList({ ...validFilters });
  };

  // For pagination
  show = index => {
    let result = this.state.filtredList.slice(index, index + 3);
    this.setState({ showList: result });
  };

  render() {
    return (
      <div className="search-main">
        <form className="callus col-xs-12 search-form">
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label> Catégorie </label>
              <select
                style={{ width: "100%" }}
                name="categorie"
                value={this.state.categorie}
                onChange={this.handleInputChange}
              >
                <option value="">Toutes les Catégories</option>
                {[
                  "Appartement",
                  "Bureau",
                  "Local Commerciale",
                  "Maison",
                  "Résidence",
                  "Terre/Terrain"
                ].map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
              {/* <Categories /> */}
            </div>
          </div>
 {this.props.displayStatu &&
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label> Statut du bien </label>
              <select
                name="statut"
                value={this.state.statut}
                onChange={this.handleInputChange}
                style={{ width: "100%" }}
              >
                <option value=""> </option>
                <option>A Vendre</option>
                <option>A louer</option>
              </select>
            </div>
            {/* <Statut /> */}
          </div>}

          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label> Surface du bien </label>
              <select
                name="surface"
                value={this.state.surface}
                onChange={this.handleInputChange}
                style={{ width: "100%" }}
              >
                <option value=""> </option>
                {[
                  "Inférieur à 100M2",
                  "Entre 100 et 200 M2",
                  "Entre 200 et 300 M2",
                  "Entre 200 et 300 M2",
                  "Entre 300 et 400 M2",
                  "Supéreieur à 400 M2"
                ].map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <Statut /> */}
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label> Région </label>
              <select
                name="region"
                value={this.state.region}
                onChange={this.handleInputChange}
                style={{ width: "100%" }}
              >
                <option value="">Toutes Les Régions</option>
                {villes.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            {/* <Regions /> */}
          </div>

          <div className="col-md-3 col-sm-6">
            <div className=" form-group">
              <label> Nombre de Chambre </label>

              <select
                name="nombreChambre"
                disabled={
                  this.state.categorie != "Résidence" &&
                  this.state.categorie != "Maison" &&
                  this.state.categorie != "Appartement"
                }
                value={this.state.nombreChambre}
                onChange={this.handleInputChange}
                style={{ width: "100%" }}
              >
                <option className="active" value=""></option>
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
            {/* <nombreChambre /> */}
          </div>
          <div className="col-md-3 col-sm-6">
            <div className=" form-group">
              <label> Nombre de Salon </label>

              <select
                name="nombreSalon"
                disabled={
                  this.state.categorie != "Résidence" &&
                  this.state.categorie != "Maison" &&
                  this.state.categorie != "Appartement"
                }
                value={this.state.nombreSalon}
                onChange={this.handleInputChange}
                style={{ width: "100%" }}
              >
                <option className="active" value=""></option>
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
            {/* <nombreChambre /> */}
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label> Nombre Salle de Bain </label>
              <select
                disabled={
                  this.state.categorie != "Résidence" &&
                  this.state.categorie != "Maison" &&
                  this.state.categorie != "Appartement"
                }
                name="nombreSalleDeBain"
                style={{ width: "100%" }}
                value={this.state.nombreSalleDeBain}
                onChange={this.handleInputChange}
              >
                <option className="active" value=""></option>
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
              {/* <nombreSalleDeBain /> */}
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <label> Nombre de Garage </label>
            <div className="form-group">
              <select
                disabled={
                  this.state.categorie != "Résidence" &&
                  this.state.categorie != "Maison"
                }
                name="nombreGarage"
                style={{ width: "100%" }}
                value={this.state.nombreGarage}
                onChange={this.handleInputChange}
              >
                <option className="active" value=""></option>
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
              {/* <nombreSalleDeBain /> */}
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <label> Prix Minimum </label>
            <input
              id="placeholder-color"
              name="prixMin"
              style={{ width: "100%" }}
              type="number"
              value={this.state.prixMin}
              onChange={this.handleInputChange}
              className="keyword-input"
              placeholder="Prix"
            />
          </div>

          <div className="col-md-3 col-sm-6 lastChild">
            <label> Prix Maximum </label>
            <input
              id="placeholder-color"
              name="prixMax"
              style={{ width: "100%" }}
              type="number"
              value={this.state.prixMax}
              onChange={this.handleInputChange}
              className="keyword-input"
              placeholder="Prix"
            />
          </div>
        </form>
        <div className="search-btn">
          <button onClick={this.onRechercheClick}> Rechercher </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filtersReducer
  };
};

export default connect(
  mapStateToProps,
  { getAnnouncementsList, addFilter }
)(RechercheAvancee);

const numbers = [1, 2, 3];
let villes = [
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Mannouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Touzeur",
  "Tunis",
  "Zaghouan"
];
