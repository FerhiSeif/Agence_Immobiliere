import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import anonymos from '../../images/anonymos.png'
import { logOutAction } from "../../Redux/userActions";
import Modal from "react-awesome-modal";

import "./Header.css";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      numNotif:0,
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.getAll = this.getAll.bind(this);
  }
getnotification =  () =>{
  const { getAll } = this;
  let response = axios
    .get("http://localhost:8080/notifications/getnotification")
    .then(res => {
      //console.log("res");
      // console.log(res.data);
      getAll(res.data.notification);
    })
    .catch(err => console.log(err.response.data));
}

  getAll(data) {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      notifications: data.filter(elm => elm.target == user.user._id)
    },()=>{
      this.setState({
        numNotif:this.state.notifications.filter(elm=>elm.read===false).length
      })
       
    });
  }
  componentDidMount() {
    this.getnotification()
  }

  updateNOtif = (Notif)=>{
    //console.log('Notif',Notif)
    axios({
      method: "PUT",
      url:`http://localhost:8080/notifications/readnotification/${Notif._id}`,
      headers: { Authorization: localStorage.getItem("Authorization") },
      Notif
    })
    .then(res => {
      this.getnotification()
      console.log(res)
    })
  }

  onLogOutClick = () => {
    this.props
      .logOutAction()
      .then(res => res === 200 && this.props.history.push("/"));
  };

  openModal() {}

  render() {
    const { notifications,numNotif } = this.state;
    //const numNotif = notifications.length;

    //const numNotif = myNotif.length;
    console.log("numNotif,notifications2", notifications);
    return (
      <div className="Header">
        <header className="layout_default">
          <div className="topbar grey">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <p style={{ marginLeft: "-284px" }}>
                    Nous sommes les meilleurs.
                  </p>
                </div>
                <div className="col-md-7 text-right">
                  <ul className="breadcrumb_top text-right" style={{marginLeft: "-44px"}}>
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
                        {/*<i className="icon-icons215" />*/}
                        🖊️ Créer une annonce
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
                        <Link to="/profile">
                          <i className="icon-icons230" />
                          Profil
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
                      <li
                        
                        style={{
                          position: "relative",
                          color: "black"
                        }}
                      >
                        <i className="fa fa-bell-o" aria-hidden="true" style={{
                            cursor: "pointer",
                            color: "black"
                          }}></i>
                       <span onClick={() =>
                          this.setState({ isOpen: !this.state.isOpen })
                        }
                        style={{
                          cursor: "pointer",
                          color: "black"
                        }}
                        >
                           Notifications {numNotif!==0? <span style={{background:"red",color:"white",borderRadius:"300px",padding: "3px"}}> {numNotif}</span> : false }</span>
                        <div
                          className="modalNotif"
                          style={{
                            display: `${this.state.isOpen ? "flex" : "none"}`
                          }}
                        >
                          <div className="modalNotif-header">
                            <span>Toutes les Notifications</span>
              
                          </div>
                          <div className="modalNotif-contain">
                            {notifications.map((elm, i) => {
    
                              return (
                                <div className="notifi-contain" 
                                style={{background:`${elm.read?'none':'#c8d3d67d'}`,cursor:"pointer"}}
                                onClick={()=>this.updateNOtif(elm)}
                                >
                                  <img src={anonymos} alt="profile" style={{marginRight: '19px',width:"40px",height:"40px"}}/>
                                  <div className="notifi-body">
                                    <span className="notif-title">
                                      {elm.object}
                                    </span>
                                    <p className="notif-text">{elm.body}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="modalNotif-footer"
                          onClick={() =>
                            this.setState({ isOpen: false })
                          }
                          style={{
                            cursor: "pointer",
                            color: "black"
                          }}
                          >Close</div>
                        </div>
                      </li>
                    )}
                    <li style={{ marginRight: "-42px" }}>
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
                  <div className="logo" style={{ marginLeft: "-122px" }}>
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
                        <Link to="/avis">Vos Avis</Link>
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
  connect(mapStateToProps, { logOutAction }),
  withRouter
)(Header);
