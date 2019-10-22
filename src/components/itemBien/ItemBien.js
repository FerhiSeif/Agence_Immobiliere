import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./ItemBien.css";
import { addFavoriteAnnoncement } from "../../Redux/userActions";

class Itembien extends Component {
  onAddToFavoriteClick = () => {
    if (!this.props.user._id)
      return alert(
        "Please to log in to add this annoncement to your favorites annoncements"
      );
    if (this.verifyAnnoncementOwner()) {
      alert(
        "Your are the owner of these annoncement, you cant added it to your favorites annoncements"
      );
      return;
    } else if (this.verifyIsAnnoncementAlreadyInFavorites()) {
      alert(
        "These annoncement is already selected in your favorites annoncements"
      );
      return;
    } else this.props.addFavoriteAnnoncement(this.props.item._id);
  };

  verifyAnnoncementOwner = () => {
    if (!this.props.user._id) return false;
    if (this.props.item.userId == this.props.user._id) return true;
    else return false;
  };

  verifyIsAnnoncementAlreadyInFavorites = () => {
    if (
      this.props.user.favoris.filter(el => el == this.props.item._id).length > 0
    )
      return true;
    else return false;
  };

  render() {
    const { item } = this.props;
    return (
      <div className="item-bien-container col-sm-4">
        <div className="property_item heading_space">
          <div className="image">
            <Link to={`/detail-annonce/${item._id}`}>
              <img
                src="images/latest1.jpg"
                alt="latest property"
                className="img-responsive"
              />
            </Link>
          </div>
          <div className="price default_clr clearfix bottom20">
            <span className="tag pull-left">{item.statut}</span>
            <h4 className="pull-right">
              {item.prix} - <small>Categorie: {item.categorie}</small>
            </h4>
          </div>
          <div className="proerty_content">
            <div className="proerty_text">
              <h3 className="bottom15">
                <a href="property_detail1.html">{item.titre}</a>
              </h3>
              <p>{item.parag}</p>
            </div>
            <div className="favroute clearfix">
              <p className="pull-md-left"> {item.region} Tunisie </p>
              <ul className="pull-right">
                <li>
                  <Link>
                    <i className="icon-video-player" />
                  </Link>
                </li>
                <li>
                  {this.verifyIsAnnoncementAlreadyInFavorites() ? (
                    <Link onClick={this.onAddToFavoriteClick}>
                      <i className="icon-like" style={{ color: "red" }} />
                    </Link>
                  ) : (
                    <Link onClick={this.onAddToFavoriteClick}>
                      <i className="icon-like" />
                    </Link>
                  )}
                </li>
                <li>
                  <Link className="share_expender" data-toggle="collapse">
                    <i className="icon-share3" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="toggle_share collapse" id="one">
              <ul>
                <li>
                  <a href="javascript:void(0)" className="facebook">
                    <i className="icon-facebook-1" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" className="twitter">
                    <i className="icon-twitter-1" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" className="vimo">
                    <i className="icon-vimeo3" /> Vimeo
                  </a>
                </li>
              </ul>
            </div>
            <div className="property_meta">
              <span title="Surface">
                <i className="icon-select-an-objecto-tool" />
                {item.surface}
              </span>
              <span title="Nombre de Chambre">
                <i className="icon-bed" />
                {item.nombrePiece !== 3 ? item.nombrePiece : "3 ou +"}
              </span>
              <span title="Nombre de Salle de Bain">
                <i className="icon-safety-shower" />
                {item.nombreSalleDeBain !== 3
                  ? item.nombreSalleDeBain
                  : "3 ou +"}
              </span>
              <span title="Nombre de Salon">
                <i className="icon-old-television" />
                {item.nombreSalon !== 3 ? item.nombreSalon : "3 ou +"}
              </span>
              <span title="Nombre de Garage">
                <i className="icon-garage" />
                {item.nombreGarage !== 3 ? item.nombreGarage : "3 ou +"}
              </span>
            </div>
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
  { addFavoriteAnnoncement }
)(Itembien);
