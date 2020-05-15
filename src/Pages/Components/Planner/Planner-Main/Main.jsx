import React from 'react';
import Activities from '../Activities/Activities';
import "./Main.css";
import axios from 'axios';

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
            evening: []
          };
          console.log("clicked day ", this.props.day);
          this.getEachLocations();
    }
    //TODO: Planner should pass a funciton that calculates total cost
    //for each day and then update the total cost in the database
    getEachLocations = () => {
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
                    console.log(error);
                })
            )
        )
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
        return (
            <div>
                <h5 id="day-estimated-cost">
                    Estimated cost for day {this.props.day + 1}: ${this.state.cost}
                    </h5>
                {this.state.time.map(t =>
                    <div>
                        <h1 id="day-time">{t}</h1>
                        <Activities activities = {this.state[t]}/>
                    </div>
                )}
            </div>
        );
    }
}