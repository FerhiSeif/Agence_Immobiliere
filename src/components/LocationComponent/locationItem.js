import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addFavoriteAnnoncement } from "../../Redux/userActions";

class LocationItem extends Component {
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
      <div
        className="cbp-item sale col-sm-4"
        style={{ margin: "10px 0 20px 0" }}
      >
        <div className="property_item">
          <div className="image">
            <Link to={`/detail-annonce/${item._id}`}>
              <img
                src="images/listing1.jpg"
                alt="latest property"
                className="img-responsive"
              />
            </Link>

            <span className="tag_t">{item.prix} / Mois</span>
          </div>
          <div className="proerty_content">
            <div className="proerty_text">
              <h3 className="captlize">
                <Link to={`/detail-annonce/${item._id}`}>{item.titre}</Link>
              </h3>
            </div>
            <div className="property_meta transparent">
              <span title="Surface">
                <i className="icon-select-an-objecto-tool" />
                {item.surface}
              </span>
              <span title="Nombre de Chambre">
                <i className="icon-bed" />
                {item.nombrePiece}
              </span>
              <span title="Nombre de Salle de Bain">
                <i className="icon-safety-shower" />
                {item.nombreSalleDeBain}
              </span>
            </div>
            <div className="property_meta transparent bottom30">
              <span title="Nombre de Salon">
                <i className="icon-old-television" />
                {item.nombreSalon}
              </span>
              <span title="Nombre de Garage">
                <i className="icon-garage" />
                {item.nombreGarage}
              </span>
              <span />
            </div>
            <div className="favroute clearfix">
              <p title="Valable à Partir De">
                <i className="icon-calendar2" />
                &nbsp;{item.ValableAPartirDe.slice(0, 10)}
              </p>
              <ul className="pull-right">
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
                  <a
                    href="#seven"
                    className="share_expender"
                    data-toggle="collapse"
                  >
                    <i className="icon-share3" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="toggle_share collapse" id="seven">
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
)(LocationItem);
