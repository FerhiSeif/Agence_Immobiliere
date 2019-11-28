import React, { Component } from "react";
import BienRecommande from "../bienRecomande/bienRecomande";
 

class ListeBienRecomande extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('this.props.myListe from listBien Recomande ;;;;;;;');
    console.log(this.props.myListe);
    return (
      <div className="three-item owl-carousel">
        <p className="heading_space">
          {" "}
          Nous sommes fiers de vous présenter certaines des meilleures
          maisons, appartements, bureaux , avec les meilleurs prix.
          prices.
        </p>        {this.props.myListe.map((el, index) => (
           <BienRecommande key={index} item={el} />
        ))}
      </div>
    );
  }
}

export default ListeBienRecomande;
