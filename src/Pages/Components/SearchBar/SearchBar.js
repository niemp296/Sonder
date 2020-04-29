import React, { Component } from 'react';
import SearchList from '../SearchList/SearchList';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
    }
    componentDidMount() {
        this.setState({
          filtered: this.props.items
        });
      }
      
      componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items
        });
      }

      handleChange = (e) => {
        let currentList = [];
        let newList = [];
        
        let search = e.target.value;
        if (search !== "") {
            currentList = this.props.items;
            newList = currentList.filter(item => {
            //convert list of items and search to lowercase so capitalization doesn't matter
            return item.name.toLowerCase().includes(search.toLowerCase());
            });
        } else {
            newList = this.props.items;
            }
            this.setState({
                filtered: newList
            });
        }
    
    render() {
        return (
            <div>
                <form className="form-inline d-flex justify-content-center md-form form-md mt-0">
                <input className="form-control form-control-sm w-75" type="text" onChange={this.handleChange} placeholder="Search"
                    aria-label="Search" />
                </form>
                <SearchList items={this.state.filtered} />
            </div>
        )
    }
}

 
export default SearchBar;