import React from 'react';
import './SideBar.css'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Hotel';
import DateRangeIcon from '@material-ui/icons/DateRange';

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
            <ul id="planner-sidebar" className="list-group">
                <li>
                    <HotelIcon fontSize="large"/>
                </li>
                <li><FlightTakeoffIcon fontSize="large"/></li>
                <li>
                    <DateRangeIcon fontSize="large"/>
                </li>
            </ul>
        );
    }
}