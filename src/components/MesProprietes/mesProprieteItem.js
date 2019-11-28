import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAnnoncementAction } from "../../Redux/annoncesActions";

import ImageSlider from 'ac-react-simple-image-slider';


 var ExampleSlider  = (props) => (
  <ImageSlider height='260px' width='550px' data={props.imageData} />
);

class MesProprietesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images:[]
    };
  }

  onDeleteAnnoncementClicked = () => {
    this.props.deleteAnnoncementAction(
      this.props.item._id,
      this.props.item.titre
    );
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
      <div className="col-sm-4 mes-proprietes-item">
        <div className="property_item heading_space">
          <div className="image" > 
              <ExampleSlider  imageData={oldimages}/>
            <span className="tag_l">
            <Link to={`/detail-annonce/${item._id}`}>
                {item.situation ? "Publié" : "En cours de validation"}
            </Link>
            </span>
            <span className="tag_t">{item.statut}</span>
          </div>
          <div className="proerty_content">
            <div className="proerty_text" style={{width:"358px", height:"97.6px", marginBottom: "-28px",
            marginTop:"-22px",    paddingLeft: "10px",
            paddingRight: "89px"}}>
              <h3 className="captlize" style={{textAlign: "center"}}>
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
            <div className="favroute clearfix card-buttom">
              <p className="pull-md-left" title="Valable à Partir De">
                <i className="icon-calendar2" />
                &nbsp;{item.ValableAPartirDe ? item.ValableAPartirDe.slice(0, 10) : ""}
              </p>
              <div className="actions-containers">
                <Link to={`/modifier-annonce/${item._id}`}>
                  <button className="modif-propriete-btn">Modifier</button>
                </Link>
                <button
                  className="modif-propriete-btn"
                  onClick={this.onDeleteAnnoncementClicked}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteAnnoncementAction }
)(MesProprietesItem);
