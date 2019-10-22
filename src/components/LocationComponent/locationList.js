import React, { Component } from "react";
import LocationItem from "./locationItem";

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.liste.map((el, index) => (
          <LocationItem key={index} item={el} />
        ))}
      </div>
    );
  }
}

export default LocationList;
