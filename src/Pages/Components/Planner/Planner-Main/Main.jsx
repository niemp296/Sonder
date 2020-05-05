import React from 'react';
import list from '../../../../TestData/activities.json'
import Activities from '../Activities/Activities'
import "./Main.css"

//this class contains the list of all activities and
//render the time of day + activities
export default class Main extends React.Component {
    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            list: list.activities,
            time: ["Morning", "Afternoon", "Evening"]
          };
    }

    static defaultProps = {
        // contains default props
    }
    /*
    renderActivities(){
        return(
        <ul>
            {this.state.list.map(activity => <Activities key = {activity.id}>{activity}</Activities>)} 
        </ul>
        );
    }*/

    render() {
        return (
            <div>
                <h1 id="day-estimated-cost">Estimated cost: </h1>
                {this.state.time.map(time =>
                    <div>
                        <h1 id="day-time">{time}</h1>
                        <Activities activities = {this.state.list}/>
                    </div>
                    )}
            </div>
        );
    }
}