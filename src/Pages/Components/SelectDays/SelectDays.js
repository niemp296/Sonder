import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu'
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';


const useStyles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,          
        "flex-direction": "column",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

class SelectDays extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            selectedPlan: '',
            day: '',
            time: '',
            plans: {},
        }
    }
    componentDidMount() {
        this.setState({
          plans: this.props.plans
        });
        console.log(this.state.plans)
    }

      componentWillReceiveProps(nextProps) {
        this.setState({ plans: nextProps.plans });  
        console.log(this.state.plans)
      }
    
    componentWillUnmount() {
        this.setState({
            filtered: []
          });
    }

    componentWillUpdate(nextProps) {
      console.log("asdfsa")
      return this.state.plans != this.props.plans
    }
    


    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
          [name]: event.target.value,
        });
    };

      handleClick = (event) => {
        this.setState({
            age: event.target.value,
        })
      };

    render() {
        const { classes } = this.props;
        return (
          
            <div>
              
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Plan</InputLabel>
                    <Select
                      native
                      value={this.state.selectedPlan}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'selectedPlan',
                        id: 'age-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                        {(typeof this.props.plans) == "Array" ? this.state.plans.map(item => (
                            console.log(item)
                        )) : ''}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="name-native-disabled">Day</InputLabel>
                    <NativeSelect
                      native
                      value={this.state.name}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'day',
                        id: 'age-native-disabled',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={10}>Ten</option>
                      <option value={20}>Twenty</option>
                      <option value={30}>Thirty</option>
                    </NativeSelect>
                  </FormControl>
                  <FormControl className={classes.formControl} disabled={false}>
                    <InputLabel htmlFor="name-native-disabled">Time</InputLabel>
                    <NativeSelect
                      native
                      value={this.state.name}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'time',
                        id: 'age-native-disabled',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={'morning'}>Morning</option>
                      <option value={'afternoon'}>Afternoon</option>
                      <option value={'evening'}>Evening</option>
                    </NativeSelect>
                  </FormControl>  
               
            </div>
        );
    }
}

export default withStyles(useStyles)(SelectDays);