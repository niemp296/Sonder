import React, { Component } from 'react';
import SearchList from '../SearchList/SearchList';
import Grid from '@material-ui/core/Grid';
import Map from '../Map/Map'
import axios from 'axios';
import './SearchBar.css';
import { Button } from 'react-bootstrap';

const styles = {
    item: {
        height: "78vh",
        "overflow-y": "auto",
    }
  };


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filtered: [],
            search: "",
            filterCity: true,
            filterPlace: false,
            filterCountry: false,
            userHasSearched: false,
            isLoggedIn: this.props.isLoggedIn,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    async componentDidMount() {
        this.setState({
          data: (await axios.get('http://localhost:5000/api/locations/')
                    .then((response) => response.data)),
          filtered: []
        });
      }
    
    componentWillUnmount() {
        this.setState({filtered: [], userHasSearched: false});
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let currentList = [];
            let newList = [];
            if (this.state.search !== "") {
                currentList = this.state.data;
                this.setState({
                    userHasSearched: true
                });
                if (this.state.filterCity) {
                    newList = currentList.filter(item => {
                                    return item.city.toLowerCase().includes(this.state.search.toLowerCase());
                    })
                } else if (this.state.filterPlace) {
                    newList = currentList.filter(item => {
                                    return item.name.toLowerCase().includes(this.state.search.toLowerCase());
                    })
                } else if (this.state.filterCountry) {
                    newList = currentList.filter(item => {
                                    return item.country.toLowerCase().includes(this.state.search.toLowerCase());
                    })
                }
            } else {
                newList = [];
            }
            this.setState({
                filtered: newList
            });
        }
      }

    handleChange = e => {
        e.preventDefault();
        this.setState({search: e.target.value});
    }

    filterCity = () => {
        this.setState({
            filterCity: true,
            filterCountry: false,
            filterPlace: false
        });
    }

    filterPlace = () => {
        this.setState({
            filterCity: false,
            filterCountry: false,
            filterPlace: true
        });
    }

    filterCountry = () => {
        this.setState({
            filterCity: false,
            filterCountry: true,
            filterPlace: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={2} className="gridItem">
                    <Grid item xs={6} className="gridItem">
                        <form className="form-inline d-flex justify-content-center md-form form-md mt-1">
                        <input className="form-control form-control-sm w-70" type="text" name="searchbox" onChange={this.handleChange} placeholder="Search"
                            aria-label="Search" onKeyPress={this.handleKeyPress}/>
                        </form>
                        <div className="filter">
                            <Button variant="outline-secondary" className ={this.state.filterCity ? "active ":"filterItem"} onClick={() => this.filterCity()}>By City</Button>
                            <Button variant="outline-secondary" className ={this.state.filterPlace ? "active ":"filterItem"} onClick={() => this.filterPlace()}>By Place</Button>
                            <Button variant="outline-secondary" className ={this.state.filterCountry ? "active ":"filterItem"} onClick={() => this.filterCountry()}>By Country</Button>
                        </div>
                        <SearchList items={this.state.filtered} 
                                    filterCity={this.state.filterCity}
                                    filterCountry={this.state.filterCountry}
                                    filterPlace={this.state.filterPlace}
                                    userHasSearched={this.state.userHasSearched}
                                    isLoggedIn ={this.state.isLoggedIn}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Map items={this.state.filtered}/> 
                    </Grid>
                </Grid>               
            </div>
        )
    }
}

 export default SearchBar;
