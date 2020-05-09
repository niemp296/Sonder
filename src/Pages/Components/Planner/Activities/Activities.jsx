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
        <div id="planner-activities" className="card-deck">
            {this.props.activities.map(activity => 
            <Activity 
            activity ={activity}>
            </Activity>)}
            <div className="card bg-light border-dark mb-3 planner-activity-cards">
            <h2 className="card-title text-center planner-activity-text">Add Activity</h2>
            </div>
        </div>
        );
    }
}
 
export default Activities;