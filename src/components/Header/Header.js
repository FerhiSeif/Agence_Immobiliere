import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";

import { logOutAction } from "../../Redux/userActions";

class Header extends Component {
  onLogOutClick = () => {
    this.props
      .logOutAction()
      .then(res => res === 200 && this.props.history.push("/"));
  };
  
  render() {
    return (
      <div className="Header">
        <header className="layout_default">
          <div className="topbar grey">

            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <p>Nous sommes les meilleurs.</p>
                </div>
                <div className="col-md-7 text-right">
                  <ul className="breadcrumb_top text-right">
                    <li>
                      {this.props.user.nom && (
                        <Link to="/favoris">
                          <i className="icon-icons43" />
                          Favoris
                        </Link>
                      )}
                    </li> 
                    <li>
                      <Link to="/déposer-une-annonce">
                      {  /*<i className="icon-icons215" />*/}
                        
                        🖊️  Créer une annonce
                      </Link>
                    </li>
                    {this.props.user.nom && (
                      <li>
                        <Link to="/mesProprietes">
                        <i className="icon-icons215" />
                        
                          Mes Proprietés 
                        </Link>
                      </li>
                    )}
                    {this.props.user.nom && (
                      <li>
                        <Link to="/messages">
                        <i className="icon-icons142"></i>
                          Messages
                        </Link>
                      </li>
                    )}
                    {this.props.user.nom && (
                      <li>
                        <Link to="/profile">
                          <i className="icon-icons230" />
                          Profil
                        </Link>
                      </li>
                    )}
                    <li>
                      {this.props.user.nom ? (
                        <Link onClick={this.onLogOutClick}>
                          <i className="icon-icons179" />
                          Déconnexion
                        </Link>
                      ) : (
                        <Link to="/login">
                          <i className="icon-icons179" />
                          Connexion / Inscription
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-upper">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-12">
                  <div className="logo">
                    <Link to="/">
                      <img src="images/logo.png" />
                    </Link>
                  </div>
                </div>
                {/*Info Box*/}
                <div className="col-md-9 col-sm-12 right">
                  <div className="info-box first">
                    <div className="icons">
                      <i className="icon-telephone114" />
                    </div>
                    <ul>
                      <li>
                        <strong>Teléphone</strong>
                      </li>
                      <li>+1 900 234 567 - 68</li>
                    </ul>
                  </div>
                  <div className="info-box">
                    <div className="icons">
                      <i className="icon-icons74" />
                    </div>
                    <ul>
                      <li>
                        <strong>Tunisia</strong>
                      </li>
                      <li>MeilleurImmo</li>
                    </ul>
                  </div>
                  <div className="info-box">
                    <div className="icons">
                      <i className="icon-icons142" />
                    </div>
                    <ul>
                      <li>
                        <strong>Addresse Email</strong>
                      </li>
                      <li>
                        <Link to="javascript:void(0)">
                          info@MeilleurImmo.com
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="navbar navbar-default navbar-sticky bootsnav">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="attr-nav">
                    <ul className="social_share clearfix">
                      <li>
                        <Link to="javascript:void(0)" className="facebook">
                          <i className="fa fa-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link to="javascript:void(0)" className="twitter">
                          <i className="fa fa-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link className="google" to="javascript:void(0)">
                          <i className="icon-google4" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Start Header Navigation */}
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target="#navbar-menu"
                    >
                      <i className="fa fa-bars" />
                    </button>
                    <Link className="navbar-brand sticky_logo" to="/">
                      <img src="images/logo-white.png" className="logo" />
                    </Link>
                  </div>
                  {/* End Header Navigation */}
                  <div className="collapse navbar-collapse" id="navbar-menu">
                 
                    <ul
                      className="nav navbar-nav"
                      data-in="fadeIn"
                      data-out="fadeOut"
                    >
                       <li>
                        <Link to="/">Accueil</Link>
                      </li>
                      <li className="dropdown">
                        <Link
                          to="#."
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Immobilier{" "}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/achat">Achat</Link>
                          </li>
                          <li>
                            <Link to="/location">Location</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <Link
                          to="#."
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                        > 
                          Services{" "}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="/etudeProjet">Etude de projet </Link>
                          </li>

                          <li>
                            <Link to="/conseils">Conseils</Link>
                          </li>
                          <li>
                            <Link to="/autre">Autres</Link>
                          </li>
                        </ul>
                      </li>
                     
                       {this.props.user.nom && (
                      <li>
                      <Link to="/estimations">Estimations</Link>
                    </li>
                       )}
                        <li>
                        <Link to="/reclamation">Réclamation</Link>
                      </li>
                      <li>
                        <Link to="/agents">Nos Agents</Link>
                      </li>
                      <li>
                        <Link to="/agents">Vos Avis</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contactez Nous</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
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
    { logOutAction }
  ),
  withRouter
)(Header);
