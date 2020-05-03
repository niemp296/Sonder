import React from 'react';
import PlannerHeader from './Components/Planner/Planner-Header/Header';
import PlannerSideBar from './Components/Planner/Planner-SideBar/SideBar';
import PlannerMain from './Components/Planner/Planner-Main/Main';
import './Planner.css'

//todo: make a function to handle total cost: flight (passed by sidebar) + stays (passed by sidebar) + activities (passed by Main)
export default class Planner extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            //contains state variables
        }
    }

    static defaultProps = {
        // contains default props
    }

    render() {
        return (
            <div>
            <PlannerHeader/>
            <div id ="Planner-container">
                <PlannerSideBar/>
                <PlannerMain/>
            </div>
            </div>
        );
    }
}