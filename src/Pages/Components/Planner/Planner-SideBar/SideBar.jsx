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


    //TODO: make all symbols clickable, let user add days
    render() {
        return (
            <div className="btn-group-vertical" id="planner-sidebar">
                <button className="mb-2 btn-outline-dark">
                    <HotelIcon fontSize="large"/>
                </button>
                <button className="mb-2 btn-outline-dark">
                    <FlightTakeoffIcon fontSize="large"/>
                </button>
                <div id= "planner-date-range">
                    <button className="mb-2 btn-outline-dark">
                        <DateRangeIcon fontSize="large"/>
                    </button>
                    <button className="mb-2 btn-outline-dark" role="button" data-toggle="collapse" data-target="#planner-days-icons" aria-expanded="false" aria-controls="planner-days-icons">
                        <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                        </svg>
                    </button>
                </div>
                <div class="collapse" id="planner-days-icons">
                    <button type="button" className="btn btn-light btn-outline-dark planner-day-icon mb-2">1</button>
                    <button type="button" className="btn btn-light btn-outline-dark planner-day-icon mb-2">+</button>
                </div>
            </div>
        );
    }
}