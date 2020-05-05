import React from 'react';
import PlannerHeader from './Components/Planner/Planner-Header/Header';
import PlannerSideBar from './Components/Planner/Planner-SideBar/SideBar';
import * as PlannerComponents from './Components/Planner/Planner-Router/Router';
import './Planner.css';

//todo: make a function to handle total cost: flight (passed by sidebar) + stays (passed by sidebar) + activities (passed by Main)
export default class Planner extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    
    constructor(props) {
        super(props);
        //this.handler = this.handler.bind(this);
        this.state = {
            selectedComponent: ''
        }
    }

    selectComponent = (comp) => {
        this.setState({
            selectedComponent: comp
        })
    }
    
    //this method renders Flight, Stays, or Activity based on users' choice
    renderSelectedComponent(selectedComponent){
        //default option to stay
        const Com = (!selectedComponent) ? PlannerComponents["Stay"]: PlannerComponents[selectedComponent];
        return <Com />

    }

    render() {
        return (
            <div>
            <PlannerHeader/>
            <div id ="Planner-container">
                <PlannerSideBar handleClick = {this.selectComponent}/>
                <div id="planner-main">
                {this.renderSelectedComponent(this.state.selectedComponent)}
                </div>
            </div>
            </div>
        );
    }
}