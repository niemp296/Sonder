import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import "./SearchList.css"


export default class SearchList extends Component {
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
        return (
        <List className="Capitalize">
            {this.state.filtered.map(item => (
                <React.Fragment>
                    <ListItem alignItems="flex-start">
                    <ListItemText 
                        primary={item.name}
                        secondary={item.type}
                    />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
        );
    }
}