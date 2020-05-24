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
            filtered: []
        }
    }
    async componentDidMount() {
        this.setState({
          data: (await axios.get('http://localhost:5000/api/locations/')
                    .then((response) => response.data)),
          filtered: []
        });
        console.log(this.state.data)
      }
      
    //   componentWillReceiveProps(nextProps) {
    //     this.setState({
    //       filtered: nextProps.items
    //     });
    //   }

    handleChange = async(e) => {
        let currentList = [];
        let newList = [];
        
        let search = e.target.value;
        if (search !== "") {
            currentList = this.state.data;
            newList = currentList.filter(item => {
                            return item.name.toLowerCase().includes(search.toLowerCase());
                        })
        } else {
            newList = [];
        }
        this.setState({
            filtered: newList
        });
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <form className="form-inline d-flex justify-content-center md-form form-md mt-0">
                        <input className="form-control form-control-sm w-75" type="text" onChange={this.handleChange} placeholder="Search"
                            aria-label="Search" />
                        </form>
                        <SearchList items={this.state.filtered} />
                    </Grid>
                    <Grid item xs={9}>
                        <Map items={this.state.filtered}/> 
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

 
export default SearchBar;