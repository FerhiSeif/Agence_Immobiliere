import React, { Component } from "react";
import { connect } from "react-redux";
import { getFavoritesAnnoncement } from "../../Redux/userActions";

import NavBarItem from "../NavBarItem";
import FavorisList from "./favorisList";
import "./favoris.css";
import PaginationSimple from "./../pagination/pagination";

class Favoris extends Component {
  state = {
    currentPage: 1
  };
  componentDidMount() {
    this.props.getFavoritesAnnoncement();
  }

  favoritesAnnouncementsListToDisplay = () => {
    return this.state.currentPage === 1
      ? this.props.favoritesAnnouncements.slice(0, 3)
      : this.props.favoritesAnnouncements.slice(
          (this.state.currentPage - 1) * 3,
          this.state.currentPage * 3
        );
  };

  onPrevPaginationClick = () => {
    let { currentPage } = this.state;
    if (currentPage > 1) {
      return this.setState({
        currentPage: currentPage - 1
      });
    }
  };

  onNextPaginationClick = () => {
    let { currentPage } = this.state;
    if (currentPage < this.props.collectionLength) {
      return this.setState({
        currentPage: currentPage + 1
      });
    }
  };

  onSelectedPageClick = i => {
    this.setState({
      currentPage: i
    });
  };

  render() {
    return (
      <div className="favoris-container">
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
        {/* Favorite Properties  */}
        <section id="property" className="padding_top listing1">
          <div className="container">
            <div className="row">
              <NavBarItem currentPage="favoris" />

              <h2 className="text-uppercase text-center">
                MES PROPRIÉTÉS PRÉFÉRÉES
              </h2>
              <p className="heading_space text-center">
                Nous avons des propriétés dans ces régions Voir une liste de
                Properties.
              </p>
            </div>
            <div className="row">
              <FavorisList
                favoritesAnnouncements={this.favoritesAnnouncementsListToDisplay()}
              />
            </div>
          </div>
        </section>
        {/* Favorite Properties End */}
        <PaginationSimple
          collectionLength={this.props.collectionLength}
          currentPage={this.state.currentPage}
          onPrevPaginationClick={e => this.onPrevPaginationClick(e)}
          onNextPaginationClick={e => this.onNextPaginationClick(e)}
          onSelectedPageClick={e => this.onSelectedPageClick(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favoritesAnnouncements: state.annoncesFavorisReducer.favoritesAnnouncements,
    collectionLength: state.annoncesFavorisReducer.collectionLength
  };
};

export default connect(
  mapStateToProps,
  { getFavoritesAnnoncement }
)(Favoris);
