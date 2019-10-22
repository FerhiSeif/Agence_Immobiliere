import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { logOutAction } from "../../Redux/userActions";

class NavBarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogOutClick = () => {
    this.props
      .logOutAction()
      .then(res => res === 200 && this.props.history.push("/"));
  };

  render() {
    let { currentPage } = this.props;
    return (
      <div className="col-md-12">
        <ul className="f-p-links margin_bottom">
          <li>
            <Link
              to="/profile"
              className={currentPage === "profile" ? "active" : ""}
            >
              <i className="icon-icons230" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/mesProprietes"
              className={currentPage === "mesProprietes" ? "active" : ""}
            >
              <i className="icon-icons215" /> Mes Propriétés
            </Link>
          </li>
          <li>
            {currentPage === "modifierAnnonce" ? (
              <Link
                className={currentPage === "modifierAnnonce" ? "active" : ""}
              >
                <i className="icon-icons215" /> Modifier l'annonce
              </Link>
            ) : (
              <Link
                className={currentPage === "creerAnnonce" ? "active" : ""}
                to="/déposer-une-annonce"
              style={{width: "190px",height: "46px",
              marginTop: "-5px",
              paddingTop: "15px"}}>
              🖊️  Soumettre la propriété
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/favoris"
              className={currentPage === "favoris" ? "active" : ""}
            >
              <i className="icon-icons43" /> Propriétés favorites
            </Link>
          </li>
          <li>
            <Link onClick={this.onLogOutClick}>
              <i className="icon-lock-open3" />
              Déconnexion
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { logOutAction }
  ),
  withRouter
)(NavBarItem);
