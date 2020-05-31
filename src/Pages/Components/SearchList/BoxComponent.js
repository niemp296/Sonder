import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./BoxComponent.css";

export default class SearchList extends Component {

    static propTypes = {
        items: PropTypes.array
    }

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
        const Name = ({title}) => <div className="item"><h1 className="Name">{title.text}</h1></div>;
        const Info = ({title}) => <div className="item"><p>{title.text}</p></div>;
        return (
            <div className="SmallResourceBox">
                <img src={this.state.filtered.url} className="Image" alt="headShot"/>
                <div className="Info">
                    <Name title={{text: this.state.filtered.name}}/>                   
                    <Info title={{text: this.state.filtered.type}}/>
                    <Info title={{text: this.state.filtered.spending === 0 ? 'Budget: Free' : 'Budget: $' + this.state.filtered.spending}}/>
                </div>
            </div>
        );
    }
}