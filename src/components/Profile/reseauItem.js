import React, { Component } from "react";
import { connect } from "react-redux";

import { editProfileAction } from "../../Redux/userActions";
import "./Profile.css"
class ReseauItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook: "",
      twitter: "",
      google: "",
      linkedin: "",
      isEditable: false
    };
  }

  componentDidMount() {
    this.setState({
      ...this.props.user.socialMedia
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state && !state.isEditable) {
      return { ...props.user.socialMedia };
    } else return {};
  }

  onChange = e => {
    this.setState({
      isEditable: true,
      [e.target.name]: e.target.value
    });
  };

  onSubmitChangeClicked = () => {
    this.props.editProfileAction({
      socialMedia: {
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        google: this.state.google,
        linkedin: this.state.linkedin
      }
    });
  };

  render() {
    return (
      <div className="row">
        <div className="callus">
          <div className="col-sm-4">
            <div className="single-query">
              <label>Facebook:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                onChange={this.onChange}
                value={this.state.facebook}
                name="facebook"
                className="keyword-input"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Twitter:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                onChange={this.onChange}
                name="twitter"
                value={this.state.twitter}
                className="keyword-input"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Google Plus:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                onChange={this.onChange}
                name="google"
                value={this.state.google}
                className="keyword-input"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-query">
              <label>Linkedin:</label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="single-query form-group">
              <input
                onChange={this.onChange}
                name="linkedin"
                value={this.state.linkedin}
                className="keyword-input"
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

export default connect(
  mapStateToProps,
  { editProfileAction }
)(ReseauItem);
