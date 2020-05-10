import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css';


L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Maps extends React.Component {

  state = {
    lat: 35.28275, 
    lng: -120.65962,
    zoom: 10
  };

  render() {
    var location = [this.state.lat, this.state.lng];

    return (
      <Map className="map" zoom={this.state.zoom} center={location}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={location}>
          <Popup>Location</Popup>
        </Marker>
      </Map>
    );
  }
};

export default Maps;