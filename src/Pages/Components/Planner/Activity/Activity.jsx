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
        return (
            <div className="card bg-light mb-3">   
                <img className="card-img planner-activity-background" src="https://picsum.photos/100" alt="background" />  
                <div className="card-img-overlay">    
                    <h2 className="card-title text-center">{this.props.activity.name}</h2>
                    <h2 className="card-text text-center">${this.props.activity.cost}</h2>
                </div>
            </div>
        );
    }

    //TODO for defensive coding:make a function to handle no name, handle no cost  
}