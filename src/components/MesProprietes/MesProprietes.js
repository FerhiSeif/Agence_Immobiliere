import React, { Component } from "react";
import { connect } from "react-redux";

import NavBarItem from "../NavBarItem";
import MesProprietesListe from "./mesPropreitesListe";
import "./MesProprietes.css";
import PaginationSimple from "./../pagination/pagination";

import { getMyAnnoncementsAction } from "../../Redux/annoncesActions";

class MesProprietes extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.getMyAnnoncementsAction();
  }

  mesProprietesToDisplay = () => {
    return this.state.currentPage === 1
      ? this.props.mesProprietes.slice(0, 3)
      : this.props.mesProprietes.slice(
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
      <div className="MesProprietes">
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
        {/* My - Property Start */}
        <section id="agent-2-peperty" className="my-pro padding">
          <div className="container">
        <div className="row">
          <NavBarItem currentPage={"mesProprietes"} />
        </div>
            <div className="row bottom30">
              <div className="col-md-12 text-center">
                <h2 className="text-uppercase">Mes Propriété</h2>
              </div>
            </div>
          </div>
          <div className="container  list-t-border">
            <MesProprietesListe mesProprietes={this.mesProprietesToDisplay()} />
          </div>
        </section>
        {/* My - Property end */}
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
    mesProprietes: state.mesProprietesReducer.mesProprietes,
    collectionLength: state.mesProprietesReducer.collectionLength
  };
};

export default connect(
  mapStateToProps,
  { getMyAnnoncementsAction }
)(MesProprietes);
