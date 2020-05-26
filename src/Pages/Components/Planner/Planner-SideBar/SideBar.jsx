import React from 'react';
import './SideBar.css'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HotelIcon from '@material-ui/icons/Hotel';
import DateRangeIcon from '@material-ui/icons/DateRange';
import axios from 'axios'

//TODO: update database whenever the + or - is clicked

export default class SideBar extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            budget: 0,
            locations: [],
            name: ""
        }
        this.populateState();
    }

    static defaultProps = {
        // contains default props
    }

    populateState = () =>{
        axios.get("http://localhost:5000/api/plans/" + this.props.plan_id)
        .then((response) =>{
            console.log(response);
            this.setState({
                author: response.data.author,
                budget: response.data.budget,
                locations: response.data.locations,
                name: response.data.name
            })
        })
    }

    renderPlannerDayButton(){
        const buttons =[];
        for(let i = 1; i<= this.state.locations.length; i++){
            buttons.push(React.createElement('button', { 
                className: "btn btn-light btn-outline-dark planner-day-icon mb-2",
                onClick: () => this.props.handleClick("Activity", i - 1)
            }, i));
        }
        return buttons;
    }

    incrementNumDays = () => {
        const loc = this.state.locations;
        loc.push({
            morning : [], afternoon : [], evening: []
        })
        
        const new_plan_data = {
            author: this.state.author,
            budget: this.state.budget,
            locations: loc,
            name: this.state.name
        }
        axios.put('http://localhost:5000/api/plans/' + this.props.plan_id, new_plan_data)
            .then((response) =>{
                this.setState({
                    locations: loc
                })
                console.log(this.state.locations);
            })
            .catch(error =>{
                console.log("error updating user data", error)
            })
    }

    decrementNumDays = () => {
        /*
        if(this.state.numDays >0)
            this.setState({numDays: this.state.numDays - 1});*/
    }

    //TODO: make all symbols clickable, let user add days
    render() {
        return (
            <div className="btn-group-vertical" id="planner-sidebar">
                <button 
                className="mb-2 btn-outline-dark" 
                onClick = {() => this.props.handleClick("Stay")}
                >
                    <HotelIcon fontSize="large"/>
                </button>
                <button 
                className="mb-2 btn-outline-dark"
                onClick = {() => this.props.handleClick("Flight")}
                >
                    <FlightTakeoffIcon fontSize="large"/>
                </button>
                <div id= "planner-date-range">
                    <button 
                    className="mb-2 btn-outline-dark">
                        <DateRangeIcon fontSize="large"/>
                    </button>
                    <button className="mb-2 btn-outline-dark" data-toggle="collapse" data-target="#planner-days-icons" aria-expanded="false" aria-controls="planner-days-icons">
                        <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                        </svg>
                    </button>
                </div>
                <div className="collapse" id="planner-days-icons">
                    {this.renderPlannerDayButton()}
                    <button 
                    className="btn btn-light btn-outline-dark planner-day-icon mb-2"
                    onClick = {() => {
                        this.incrementNumDays();
                    }}
                    >+</button>
                     <button 
                    className="btn btn-light btn-outline-dark planner-day-icon mb-2"
                    onClick = {() => {
                        this.decrementNumDays();
                    }}
                    >-</button>
                </div>
            </div>
        );
    }
}