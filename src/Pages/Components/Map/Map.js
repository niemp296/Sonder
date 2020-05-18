import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css';
import axios from 'axios';


L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.28275, 
        lng: -120.65962,
      },
      userHasSearched: false,
      zoom: 3,
      name: ''
    };
  }

  componentDidMount() {
    //TODO: will modify to connect this with search engine 
    this.getLocationAPI();
  }

  componentWillUnmount(){
    this.setDefault();
  }

  getLocationAPI = () => {
    axios.get('http://localhost:5000/api/locations/')
        .then((response) => {
            // handle success
            let location = response.data[0];
            if(response.status === 200){
                this.setState({
                  location: {
                    lat: location.coord[0],
                    lng: location.coord[1]
                  },
                  name: location.name,
                  userHasSearched: true,
                  zoom: 13
                })
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
  }
  
  setDefault() {
    this.setState({
      location: {
        lat: 35.28275, 
        lng: -120.65962,
      },
      userHasSearched: false,
      zoom: 3,
      name: ''
    });
  }

  showMarker() {
    var location = [this.state.location.lat, this.state.location.lng];
    return (
      <Marker position={location}>
        <Popup>{this.state.name}</Popup>
      </Marker>
    );
  }

  render() {
    var location = [this.state.location.lat, this.state.location.lng];

    return (
      <Map className="map" zoom={this.state.zoom} center={location}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { this.state.userHasSearched ? 
          this.showMarker() : ''
        }
      </Map>
    );
  }
};

export default Maps;
