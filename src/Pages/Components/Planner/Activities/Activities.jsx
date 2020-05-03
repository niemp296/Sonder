import React, { Component } from 'react'
import Activity from "../Activity/Activity.jsx"
import './Activities.css'

/*
this class renders the activities selected by users 
and another card called add activities
*/
class Activities extends Component {
    render() { 
        return (
        <div id="planner-activities" class="card-deck">
            {this.props.activities.map(activity => 
            <Activity 
            activity ={activity}>
            </Activity>)}
        </div>
        );
    }
}
 
export default Activities;