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

    //todo: change to react fragment instead?
    render() {
        if(typeof this.props.activity === 'undefined'){
            return null;
        }
        return (
            <div className="card bg-light border-dark mb-3 planner-activity-cards">   
                <img className="card-img planner-activity-background" src="https://picsum.photos/300" alt="background" />  
                <div className="card-img-overlay">    
                    <h2 className="card-title text-center planner-activity-text">{this.props.activity.name}</h2>
                    <p className="card-title text-center planner-activity-text">{this.props.activity.hours}</p>
                    <p className="card-text text-center planner-activity-text">${this.props.activity.spending}</p>
                </div>
            </div>
        );
    } 
}