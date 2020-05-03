import React from 'react';
import './SideBar.css'

export default class SideBar extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            //contains state variables
        }
    }

    static defaultProps = {
        // contains default props
    }

    //TODO: return clicklable symbol for stay, flight, and calendar
    render() {
        return (
            <ul id="planner-sidebar">
                <li>Home</li>
                <li>Flight</li>
                <li>Dates</li>
            </ul>
        );
    }
}