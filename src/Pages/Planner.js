import React from 'react';
import PlannerHeader from './Components/Planner/Planner-Header/Header';
import PlannerSideBar from './Components/Planner/Planner-SideBar/SideBar';
import Flight from './Components/Planner/Planner-Flight/Flight';
import * as PlannerComponents from './Components/Planner/Planner-Router/Router';
import Stay from './Components/Planner/Planner-Stay/Stay';
import Main from './Components/Planner/Planner-Main/Main';
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
        if(!selectedComponent)
            return <Flight />
        const Com = PlannerComponents[selectedComponent];
        return <Com />
    }

    render() {
        console.log(PlannerComponents);
        return (
            <div>
            <PlannerHeader/>
            <div id ="Planner-container">
                <PlannerSideBar handleClick = {this.selectComponent}/>
                {this.renderSelectedComponent(this.state.selectedComponent)}
            </div>
            </div>
        );
    }
}