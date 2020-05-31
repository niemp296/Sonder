import React, { Component } from 'react';
import "./SearchList.css";
import axios from 'axios';
import BoxComponent from "./BoxComponent";
import PropTypes from 'prop-types';

export default class SearchList extends Component {

    static propTypes = {
        filterCity: PropTypes.bool,
        filterPlace: PropTypes.bool,
        filterCountry: PropTypes.bool,
        userHasSearched: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
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
    
    componentWillUnmount() {
        this.setState({
            filtered: []
          });
    }
    
    getLocationAPI = () => {
        axios.get('http://localhost:5000/api/locations/')
            .then((response) => {
                // handle success
                let location = response.data[0];
                if(response.status === 200){
                    this.setState({
                        filtered: {
                            name: location.name,
                            type: location.type
                        },
                        userHasSearched: true,
                    })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    renderResultsMessage () {
        const Name = ({title}) => <div className="result"><h1>{title.text}</h1></div>;
        if (this.props.filterCity) {
            return (
                <Name title={{text: "Showing you results for " + this.state.filtered[0].city + ", " + this.state.filtered[0].country}}/>
            );
        } else if (this.props.filterCountry) {
            return (
                <Name title={{text: "Showing you results for " + this.state.filtered[0].country}}/>
            );
        } else {
            return (
                <Name title={{text: "Showing you results for " + this.state.filtered[0].name}}/>
            );
        }

    }

    render() {
        const Name = ({title}) => <div className="result"><h1>{title.text}</h1></div>;
        return (
            <div>
                {this.state.filtered[0] !== undefined ? 
                this.renderResultsMessage() 
                : this.props.userHasSearched ? <Name title={{text: "No results found"}}/> : ''        
                }
                {this.state.filtered.map(item => (
                    <BoxComponent items={item}/>
                ))}
            </div>
        );
    }
}