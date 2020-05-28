import React, { Component } from 'react';
import SearchList from '../SearchList/SearchList';
import list from '../../../TestData/search.json'
import Grid from '@material-ui/core/Grid';
import Map from '../Map/Map'
import axios from 'axios';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filtered: [],
            search: ""
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
        this.setState({filtered: []});
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let currentList = [];
            let newList = [];
            if (this.state.search !== "") {
                currentList = this.state.data;
                newList = currentList.filter(item => {
                                return item.city.toLowerCase().includes(this.state.search.toLowerCase());
                })
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

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <form className="form-inline d-flex justify-content-center md-form form-md mt-0">
                        <input className="form-control form-control-sm w-75" type="text" onChange={this.handleChange} placeholder="Search"
                            aria-label="Search" onKeyPress={this.handleKeyPress}/>
                        </form>
                        <SearchList items={this.state.filtered} />
                    </Grid>
                    <Grid item md={3}>
                        <Map items={this.state.filtered}/> 
                    </Grid>
                </Grid>               
            </div>
        )
    }
}

 
export default SearchBar;
