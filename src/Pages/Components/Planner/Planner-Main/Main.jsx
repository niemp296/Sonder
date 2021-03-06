import React from 'react';
import Activities from '../Activities/Activities';
import "./Main.css";
import axios from 'axios';
import {Redirect} from 'react-router-dom'

//this class contains the list of all activities and
//render the time of day + activities
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cost: 0.0,
            time: ["morning", "afternoon", "evening"],
            morning:[],
            afternoon: [],
            evening: [],
            addLocation: false
          };
          this.getEachLocations();
    }
    
    getEachLocations = () => {
        if(this.props.day >= this.props.locations.length){
            return;
        }
        this.state.time.map(t =>
            this.props.locations[this.props.day][t].map(location => 
                axios.get('http://localhost:5000/api/locations/' + location)
                .then((response) =>{
                    //handle success
                    const location_data = response.data;
                    const append_to_array = this.state[t].concat(location_data);
                    this.setState({
                        [t]: append_to_array
                    })
                    //add to total cost
                    this.setState({
                        cost: this.state.cost + location_data.spending
                    })

                })
                .catch(function(error){
                    alert("An error has occured. Check your network and reload the page.")
                })
            )
        )
    }

    //TODO: the function add plan adds to the estimated cost
    //and use props to update the estimated cost in header
    addLocation = () =>{
        this.setState({
            addLocation: true
        })
    }

    //this function is called when user press the remove button
    //it updates this.state.cost
    //and uses function props from Planner to update the total budget
    removeLocation = (day_time, location_id, location_cost) => {
        //remove id from database
        this.props.updateBudget(-location_cost, location_id, this.props.day, day_time);
        this.setState({
            cost : 0,
            morning:[],
            afternoon: [],
            evening: []
        })
        this.getEachLocations();

    }
    
    componentDidUpdate(prevProps){
        if(prevProps.day !== this.props.day){
            //user wants to see plan for different day
            this.setState({
                cost : 0,
                morning:[],
                afternoon: [],
                evening: []
            })
            this.getEachLocations();
        }
    }

    render() {
        if(this.state.addLocation === true){
            const path = "/map:" + this.props.user_id;
            return <Redirect to = {path} />
        }
        return (
            <div>
                <h5 id="day-estimated-cost">
                    Estimated cost for day {this.props.day + 1}: ${this.state.cost}
                    </h5>
                {this.state.time.map(t =>
                    <div>
                        <h2 className="display-2 text-center mb-3" id="day-time">{t}</h2>
                        <Activities 
                            activities = {this.state[t]}
                            day_time = {t}
                            onRemove = {this.removeLocation}
                            addLocation = {this.addLocation}
                            />
                    </div>
                )}
            </div>
        );
    }
}