import React, { Component } from "react";
import { connect } from "react-redux";

import RechercheAvancee from "./../rechercheAvancee/rechercheAvancee";
import LocationList from "./locationList";
import "./location.css";

import PaginationSimple from "./../pagination/pagination";
import { getAnnouncementsList } from "../../Redux/annoncesActions";
import MapContainer from "./../google-map/googleMap";

class LocationComponent extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.getAnnouncementsList({ statut: "A louer" });
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
      <div className="location-main">
        {/*Maps*/}
        {/*    <section id="banner-map">
          <div className="container-fluid">
            <h3 className="hidden">hiden</h3>
            <div className="row property-list-area property-list-map-area">
              <div className="property-list-map">
                 <div id="property-listing-map" className="multiple-location-map" style={{width: '100%', height: '545px'}} /> 
                <MapContainer />
              </div>
            </div>
          </div>
        </section> */}
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
              <RechercheAvancee statut="A louer" displayStatu={true} />
            </div>
          </div>
        </section>
        {/* Search End */}
        {/* Listing Filer */}
        <section id="property" className="padding">
          <div className="container">
            <LocationList liste={this.announcementsListToDisplay()} />
          </div>
        </section>
        {/* Listing Filer End */}
        <div className="padding_bottom text-center">
          {/* <ul className="pager">
            <li className="active">
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
          </ul> */}
          <PaginationSimple
            collectionLength={this.props.collectionLength}
            currentPage={this.state.currentPage}
            onPrevPaginationClick={e => this.onPrevPaginationClick(e)}
            onNextPaginationClick={e => this.onNextPaginationClick(e)}
            onSelectedPageClick={e => this.onSelectedPageClick(e)}
          />
        </div>
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
)(LocationComponent);
