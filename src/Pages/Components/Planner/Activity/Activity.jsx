import React from 'react';
import './Activity.css'

export default class Activity extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.activity = {
          list: list.entries
        };
      }*/

    render() {
        console.log(this.props.activity)
        if(typeof this.props.activity === 'undefined'){
            return null;
        }
        return (
            <div className="card bg-light border-dark mb-3 planner-activity-cards">      
                <img className = "card-img-top" src= {this.props.activity.url} alt="background" />
                <div className = "card-body">
                    <h2 className="card-title text-center planner-activity-text">{this.props.activity.name}</h2>
                    <p className="card-title text-center planner-activity-text">{this.props.activity.hours}</p>
                    <p className="card-text text-center planner-activity-text">${this.props.activity.spending}</p>
                    <button 
                        className="btn btn-light mx-auto w-100" 
                        onClick ={ () => this.props.onRemove(this.props.day_time, this.props.activity._id.$oid, this.props.activity.spending)}>
                            Remove
                    </button>
                </div>
            </div>
        );
    } 
}