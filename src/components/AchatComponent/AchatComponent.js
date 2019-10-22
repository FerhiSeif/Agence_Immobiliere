import React, { Component } from "react";
import { connect } from "react-redux";

import "./achatComponent.css";
import MapContainer from "./../google-map/googleMap";

import RechercheAvancee from "../rechercheAvancee/rechercheAvancee";
import { getAnnouncementsList } from "../../Redux/annoncesActions";
import ItemList from "../itemList/itemList";
import LocationList from "../LocationComponent/locationList";
import PaginationSimple from "./../pagination/pagination";

class AchatComponent extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.getAnnouncementsList({ statut: "A Vendre" });
  }

  onRechercheAvanceeClick = () => {
    let searchElement = document.getElementsByClassName("search-display")[0];
    if (searchElement.id === "search-display") {
      searchElement.id = "search-desabled";
    } else searchElement.id = "search-display";
  };

  announcementsListToDisplay = () => {
    return this.state.currentPage === 1
      ? this.props.announcementsList.slice(0, 3)
      : this.props.announcementsList.slice(
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
      <div className="achat-component">
        {/*  {/*Maps*/}
        {/*<section id="banner-map">
          <div className="container-fluid">
          <h3 className="hidden">hiden</h3>
          <div className="row property-list-area property-list-map-area">
          <div className="property-list-map">/*}
          {/* <div id="property-listing-map" className="multiple-location-map" style={{width: '100%', height: '545px'}} /> */}
        {/*    <MapContainer />
              </div>
              </div>
              </div>
            </section>*/}
        {/* Map Ends */}
        {/* Search */}

        <section
          className="property-query-area padding_bottom search-display"
          id="search-desabled"
          style={{ marginTop: "219px", background: "#edf3f8" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h2
                  className="uppercase"
                  id="recherche-display"
                  onClick={this.onRechercheAvanceeClick}
                  title="Cliquer pour afficher ou cacher la liste des filtres"
                >
                  Recherche Avancée
                </h2>
                <p className="heading_space">
                  Ouvrir la liste des filtres pour faciliter votre recherche.
                </p>
              </div>
            </div>
            <div className="row">
              <RechercheAvancee displayStatu={true} statut="A Vendre" />
            </div>
          </div>
        </section>
        <div className="list-container">
          {this.props.announcementsList.length === 0 ? (
            <div className="empty-search-div">
              Nous n'avons pas trouvé des biens qui correspondent à votre
              recherche
              <div>Merci de modifier vos critères de recherche</div>
            </div>
          ) : (
            <ItemList liste={this.announcementsListToDisplay()} />
          )}
        </div>
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
    announcementsList: state.announcementsReducer.announcements,
    collectionLength: state.announcementsReducer.collectionLength
  };
};

export default connect(
  mapStateToProps,
  { getAnnouncementsList }
)(AchatComponent);
