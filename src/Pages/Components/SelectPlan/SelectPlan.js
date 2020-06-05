import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './SelectPlan.css'

class SelectPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: '',
            selectedDay: '',
            days: 1,
            selectedTime: '',
            plans: [],
            dayTimeDisabled: true,
        }
    }

    componentDidMount() {
        this.setState({
          plans: this.props.plans
        });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
        plans: nextProps.plans,
        selectedPlan: nextProps.selectedPlan,
        dayTimeDisabled: nextProps.dayTimeDisabled,
        days: nextProps.days,
        selectedDay: nextProps.selectedDay,
        selectedTime: nextProps.selectedTime,
      }); 
    }


    componentWillUpdate(nextProps) {
      return this.state.plans != this.props.plans
    }

    render() {
        return (
          
            <div className="selectDaysContainer">
        
                  <FormControl className="formControl">
                    <InputLabel id="plan-select-label">Plan</InputLabel>
                    <Select
                      labelId="plan-select-label"
                      id="plan-select"
                      value={this.state.selectedPlan}
                      name="selectedPlan"
                      onChange={this.props.selectPlanValues}
                    >
                      {this.state.plans!=null ? this.state.plans.map(item => (
                          <MenuItem name='selectedPlan' key={item["_id"]["$oid"]} id ={item["_id"]["$oid"]} value={item.name}>{item.name}</MenuItem>
                      )) : ''}
                    </Select>
                  </FormControl>

                  <FormControl className="formControl" disabled={this.state.dayTimeDisabled}>
                    <InputLabel id="day-select-label">Day</InputLabel>
                    <Select
                      labelId="day-select-label"
                      id="day-select"
                      value={this.state.selectedDay}
                      name="selectedDay"
                      onChange={this.props.selectPlanValues}
                    >
                      {Array.from(Array(this.state.days), (e,i) => {
                        return <MenuItem key={i} name="selectedDay" id={i} value={i}>Day {i+1}</MenuItem>
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className="formControl" disabled={this.state.dayTimeDisabled}>
                    <InputLabel id="time-select-label">Time</InputLabel>
                    <Select
                      labelId="time-select-label"
                      id="time-select"
                      value={this.state.selectedTime}
                      name="selectedTime"
                      onChange={this.props.selectPlanValues}
                    >
                      <MenuItem key="morning" name="selectedTime" value={'morning'}>Morning</MenuItem>
                      <MenuItem key="afternoon" name="selectedTime" value={'afternoon'}>Afternoon</MenuItem>
                      <MenuItem key="evening" name="selectedTime" value={'evening'}>Evening</MenuItem>
                    </Select>
                  </FormControl>
               
            </div>
        );
    }
}

export default SelectPlan;