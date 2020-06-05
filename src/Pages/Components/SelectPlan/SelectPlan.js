import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './SelectPlan.css'


const useStyles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,          
        "flex-direction": "column",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      selectDaysContainer: {
        margin: "auto",
        "text-align": "center",
        marginTop: "10px"
      }
  });

class SelectPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
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

    renderDays (days) {
      for (var i=0; i<days; i++) {
        return 
      }
      const Name = ({title}) => <div className="result"><h1>{title.text}</h1></div>;
      if (this.props.filterCity) {
          return (
              <Name title={{text: "Showing you results for " + this.state.filtered[0].city + ", " + this.state.filtered[0].country}}/>
          );
      } else if (this.props.filterCountry) {
          return (
              <Name title={{text: "Showing you results for " + this.state.filtered[0].country}}/>
          );
      } else {
          return (
              <Name title={{text: "Showing you results for " + this.state.filtered[0].name}}/>
          );
      }

  }

    render() {
        const { classes } = this.props;
        return (
          
            <div className={classes.selectDaysContainer}>
        
                  <FormControl className={classes.formControl}>
                    <InputLabel id="plan-select-label">Plan</InputLabel>
                    <Select
                      labelId="plan-select-label"
                      id="plan-select"
                      value={this.state.selectedPlan}
                      name="selectedPlan"
                      onChange={this.props.selectPlanValues}
                    >
                      {this.state.plans.map(item => (
                          <MenuItem name='selectedPlan' id ={item["_id"]["$oid"]} value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl} disabled={this.state.dayTimeDisabled}>
                    <InputLabel id="day-select-label">Day</InputLabel>
                    <Select
                      labelId="day-select-label"
                      id="day-select"
                      value={this.state.selectedDay}
                      name="selectedDay"
                      onChange={this.props.selectPlanValues}
                    >
                      {Array.from(Array(this.state.days), (e,i) => {
                        return <MenuItem name="selectedDay" id={i} value={i}>Day {i+1}</MenuItem>
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl} disabled={this.state.dayTimeDisabled}>
                    <InputLabel id="time-select-label">Time</InputLabel>
                    <Select
                      labelId="time-select-label"
                      id="time-select"
                      value={this.state.selectedTime}
                      name="selectedTime"
                      onChange={this.props.selectPlanValues}
                    >
                      <MenuItem name="selectedTime" value={'morning'}>Morning</MenuItem>
                      <MenuItem name="selectedTime" value={'afternoon'}>Afternoon</MenuItem>
                      <MenuItem name="selectedTime" value={'evening'}>Evening</MenuItem>
                    </Select>
                  </FormControl>
               
            </div>
        );
    }
}

export default withStyles(useStyles)(SelectPlan);