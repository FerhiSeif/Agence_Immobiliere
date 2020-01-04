import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteFavoriteAnnoncement } from "../../Redux/userActions";
import ImageSlider from 'ac-react-simple-image-slider';


 var ExampleSlider  = (props) => (
  <ImageSlider height='260px' width='550px' data={props.imageData} />
);

class FavorisItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDeleteFavoriteAnnoncementClicked = () => {
    this.props.deleteFavoriteAnnoncement(this.props.item._id);
  };

  render() {
    const { item } = this.props;
    const {images} = this.state

    var oldimages = []
    item.files.forEach(element => {
        oldimages.push({src:`http://localhost:8080/uploads/${element.filename}`,title:''});
    });

    console.log('oldimages :::::');
    console.log(oldimages);
    return (
      <div className="col-sm-4">
        <div className="property_item heading_space">
          <div className="image">
            <ExampleSlider  imageData={oldimages}/>
            <span className="tag_l">
            <Link to={`/detail-annonce/${item._id}`}>
                {item.situation ? "Publié" : "En cours de validation"}
            </Link>
            </span>            <div className="price clearfix">
              <span className="tag pull-right">Prix : {item.prix}</span>
            </div>
            <span className="tag_l">Featured</span>
            <span className="tag_t">{item.statut}</span>
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
              <p className="pull-md-left" title="Valable à Partir De">
                <i className="icon-calendar2" />
                &nbsp;{item.ValableAPartirDe ? item.ValableAPartirDe.slice(0, 10):false}
              </p>
              <ul className="pull-right">
                <li title="Effacer de la liste de favoris">
                  <Link onClick={this.onDeleteFavoriteAnnoncementClicked}>
                    <span>
                      <i className="icon-trash" />
                    </span>
                  </Link>
                </li>
                <li title="Partager l'annonce">
                  <a
                    href="#one"
                    className="share_expender"
                    data-toggle="collapse"
                  >
                    <i className="icon-share3" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="toggle_share collapse" id="one">
              <ul>
                <li>
                  <a href="facebook.com" className="facebook">
                    <i className="icon-facebook-1" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="twitter.com" className="twitter">
                    <i className="icon-twitter-1" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="vimeo.com" className="vimo">
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

export default connect(
  null,
  { deleteFavoriteAnnoncement }
)(FavorisItem);
