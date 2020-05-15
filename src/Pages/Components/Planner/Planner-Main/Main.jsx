import React from 'react';
import Activities from '../Activities/Activities';
import "./Main.css";
import axios from 'axios';

//this class contains the list of all activities and
//render the time of day + activities
export default class Main extends React.Component {
    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            time: ["morning", "afternoon", "evening"],
            morning:[],
            afternoon: [],
            evening: []
          };
          console.log("clicked day ", this.props.day);
          this.getEachLocations();
    }

    static defaultProps = {
        // contains default props
    }
    getEachLocations = () => {
        this.state.time.map(t =>
            this.props.locations[this.props.day][t].map(location => 
                axios.get('http://localhost:5000/api/locations/' + location)
                .then((response) =>{
                    //handle success
                    console.log(t);
                    const location_data = response.data;
                    this.setState({
                        [t]: [this.state.t, location_data]
                    })
                    console.log(this.state);
                })
                .catch(function(error){
                    console.log(error);
                })
            )
        )
    }

    render() {
        return (
            <div>
                <h1 id="day-estimated-cost">Estimated cost: </h1>
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