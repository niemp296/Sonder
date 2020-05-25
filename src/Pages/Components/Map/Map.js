import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css';
import PropTypes from 'prop-types';


L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Maps extends React.Component {

  static propTypes = {
    items: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.28275, 
        lng: -120.65962,
      },
      userHasSearched: false,
      zoom: 3,
      name: '',
      filtered: []
    };
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
    this.checkUserHasSearch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
    this.checkUserHasSearch();
  }

  componentWillUnmount() {
    this.setDefault();
  }

  checkUserHasSearch() {
    if (this.state.filtered !== []) {
      this.setState({userHasSearched: true, zoom: 13});
    }
  }
  
  setDefault() {
    this.setState({
      location: {
        lat: 35.28275, 
        lng: -120.65962,
      },
      userHasSearched: false,
      zoom: 3,
      name: '',
      filtered: []
    });
  }

  showMarker() {
    return (
      this.state.filtered.map(item => (
        <Marker position={[item.coord[0], item.coord[1]]}>
          <Popup>
            <p><em>{item.name}</em></p>
            <p><em>{'Open hour: ' + item.openHours}</em></p>
            <p><em>{item.spending === 0 ? 'Budget: Free' : 'Budget: $' + item.spending}</em></p>          
          </Popup>
        </Marker>
      ))
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
          {this.state.userHasSearched ? this.showMarker() :  ''}
      </Map>
    );
  }
};

export default Maps;

