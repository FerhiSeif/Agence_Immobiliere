import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "90%"
};
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
                { latitude:this.props.lat ,longitude: this.props.lng }
              ]
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: this.props.lat, lng: this.props.lng}}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBiNHeOMq8PHjRp1DTQgSedH1xbB1lxxxg"
})(MapContainer);
