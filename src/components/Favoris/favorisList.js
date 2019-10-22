import React, { Component } from "react";
import FavorisItem from "./favorisItem";

class FavorisList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.favoritesAnnouncements.map((el, index) => (
          <FavorisItem key={index} item={el} />
        ))}
      </div>
    );
  }
}

export default FavorisList;
