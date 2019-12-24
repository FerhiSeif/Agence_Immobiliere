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
       <div className="row">
      
           
         {this.props.myListe.map((el, index) => (
           <BienRecommande key={index} item={el} />
        ))} 
      
      </div>
    );
  }
}

export default ListeBienRecomande;
