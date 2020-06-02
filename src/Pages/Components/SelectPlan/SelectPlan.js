import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
        marginLeft: "10%",
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
                    <InputLabel htmlFor="plan-native-simple">Plan</InputLabel>
                    <Select
                      native
                      value={this.state.selectedPlan}
                    >
                      <option name='selectedPlan' id ="" value="" onClick={this.props.selectPlanValues}/>
                      {this.state.plans.map(item => (
                          <option name='selectedPlan' id ={item["_id"]["$oid"]} value={item.name} onClick={this.props.selectPlanValues}>{item.name}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} disabled={this.state.dayTimeDisabled}>
                    <InputLabel htmlFor="day-native-disabled">Day</InputLabel>
                    <NativeSelect
                      native
                      value={this.state.selectedDay}
                    >
                      <option name="selectedDay" aria-label="None" value="" onClick={this.props.selectPlanValues}/>
                      {Array.from(Array(this.state.days), (e,i) => {
                        return <option name="selectedDay" id={i} value={i} onClick={this.props.selectPlanValues}>Day {i+1}</option>
                      })}
                    </NativeSelect>
                  </FormControl>
                  <FormControl className={classes.formControl} disabled={this.state.dayTimeDisabled}>
                    <InputLabel htmlFor="time-native-disabled">Time</InputLabel>
                    <NativeSelect
                      native
                      value={this.state.selectedName}
                    >
                      <option aria-label="None" name="selectedTime" onClick={this.props.selectPlanValues} value=""/>
                      <option name="selectedTime" onClick={this.props.selectPlanValues} value={'morning'}>Morning</option>
                      <option name="selectedTime" onClick={this.props.selectPlanValues} value={'afternoon'}>Afternoon</option>
                      <option name="selectedTime" onClick={this.props.selectPlanValues} value={'evening'}>Evening</option>
                    </NativeSelect>
                  </FormControl>  
               
            </div>
        );
    }
}

export default withStyles(useStyles)(SelectPlan);