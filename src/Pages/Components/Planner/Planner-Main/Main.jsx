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
          console.log("clicked day ", this.props);
          this.getEachLocations();
    }
    
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

    //TODO: the function add plan adds to the estimated cost
    //and use props to update the estimated cost in header
    addLocation = () =>{
        //user see a list of possible locations
    }

    //this function is called when user press the remove button
    //it updates this.state.cost
    //and uses function props from Planner to update the total budget
    removeLocation = (day_time, location_id, location_cost) => {
        //remove id from database
        this.props.updateBudget(-location_cost, location_id, this.props.day, day_time);
        this.setState({
            cost: this.state.cost - location_cost
        })
    }

    
    componentDidUpdate(prevProps, prevState){
        /*
        const prevLocations ={
            morning: prevState.morning,
            afternoon: prevState.afternoon,
            evening: prevState.evening
        }*/

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
        /*
        console.log(prevLocations);
        console.log(prevState);
        console.log(prevProps.locations);
        console.log(this.props.locations);
        console.log(this.props.locations[this.props.day]);
        console.log("did update");*/
    }

    /*when planner has a change of state due to addition
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(this.props);
        this.setState({
            cost : 0,
            morning:[],
            afternoon: [],
            evening: []
        })
        this.getEachLocations();
      }*/

    render() {
        return (
            <div>
                <h5 id="day-estimated-cost">
                    Estimated cost for day {this.props.day + 1}: ${this.state.cost}
                    </h5>
                {this.state.time.map(t =>
                    <div>
                        <h1 id="day-time">{t}</h1>
                        <Activities 
                            activities = {this.state[t]}
                            day_time = {t}
                            onRemove = {this.removeLocation}
                            />
                    </div>
                )}
            </div>
        );
    }
}