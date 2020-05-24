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