import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import "./SearchList.css";
import axios from 'axios';
import BoxComponent from "./BoxComponent";

export default class SearchList extends Component {
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

    render() {
        const Name = ({title}) => <div className="result"><h1>{title.text}</h1></div>;
        return (
            <div>
                {this.state.filtered[0] !== undefined ? 
                <Name title={{text: "Showing you results for " + this.state.filtered[0].city + ", " + this.state.filtered[0].country}}/> : ''
                }
                {this.state.filtered.map(item => (
                    <BoxComponent items={item}/>
                ))}
            </div>
        );
    }
}