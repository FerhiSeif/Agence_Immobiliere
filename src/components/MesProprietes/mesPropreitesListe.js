import React, { Component } from "react";
import MesProprietesItem from "./mesProprieteItem";

class MesProprietesListe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.mesProprietes.map((el, index) => (
          <MesProprietesItem key={index} item={el} />
        ))}
      </div>
    );
  }
}

export default MesProprietesListe;
