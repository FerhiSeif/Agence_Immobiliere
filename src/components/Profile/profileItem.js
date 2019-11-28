import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import "./Profile.css"
import { editProfileAction } from "../../Redux/userActions";

class ProfilItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      adress: "",
      tel: "",
      email: "",
      isEditable: false,
      files:[]
    };
  }

  componentDidMount() {
    this.accessControl();
    this.setState({
      ...this.props.user
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state && !state.isEditable) {
      return { ...props.user };
    } else return {};
  }

  accessControl = () => {
    let autorization = localStorage.getItem("Authorization");
    if (!autorization) this.props.history.push("/login");
  };

  onChange = e => {
    this.setState({
      isEditable: true,
      [e.target.name]: e.target.value
    });
  };

  onSubmitChangeClicked = () => {
    this.props.editProfileAction({ ...this.state });
  };

  render() {
    return (
      <div className="row">
        <div className="callus">
          <div className="col-sm-4">
            <div className="single-query">
              <label>Nom:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                type="text"
                value={this.state.nom}
                onChange={this.onChange}
                name="nom"
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="single-query">
              <label>Teléphone:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                type="text"
                value={this.state.tel}
                onChange={this.onChange}
                className="keyword-input"
                name="tel"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Adresse Email :</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                type="text"
                value={this.state.email}
                onChange={this.onChange}
                className="keyword-input"
                name="email"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Adresse</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                type="text"
                value={this.state.adress}
                onChange={this.onChange}
                className="keyword-input"
                name="adress"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Description:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <textarea
                placeholder="Écris ici quelque chose"
                onChange={this.onChange}
                value={this.state.description}
                name="description"
                className="form-control"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 text-right">
            <button
              className="btn-blue border_radius"
              onClick={this.onSubmitChangeClicked}
            >
              Sauvegarder
            </button>
          </div>
        </div>
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
    { editProfileAction }
  ),
  withRouter
)(ProfilItem);
