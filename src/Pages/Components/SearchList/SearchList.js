import React, { Component } from 'react';
import "./SearchList.css";
import axios from 'axios';
import BoxComponent from "./BoxComponent";
import PropTypes from 'prop-types';
import SelectPlan from '../SelectPlan/SelectPlan';

export default class SearchList extends Component {

    static propTypes = {
        filterCity: PropTypes.bool,
        filterPlace: PropTypes.bool,
        filterCountry: PropTypes.bool,
        userHasSearched: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            isLoggedIn : this.props["isLoggedIn"] !== undefined? true : false,
            userId: this.props["isLoggedIn"] !== undefined ? this.props.isLoggedIn : "",
            plans: [],
            selectedPlan: '',
            selectedPlanId: '',
            selectedDay: '',
            days: [],
            selectedTime: '',
            dayTimeDisabled: true,
            addWithoutPlan: false,
        }
    }

    async componentDidMount() {
        this.setState({
          filtered: this.props.items
        });
        if (this.state.isLoggedIn == true) {
            this.setState({
                plans: await axios.get('http://localhost:5000/api/userplans/'+this.state.userId)
                .then((response) => response.data),
            })   
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items,
        });
      }
    
    componentWillUnmount() {
        this.setState({
            filtered: []
          });
    }

    selectPlanValues = (event) => {
        const name = event.target.name;
        this.setState({
          [name]: event.target.value,
        }, () => {
          if (this.state.dayTimeDisabled && this.state.selectedPlan != '') {
            this.setState({
              dayTimeDisabled: false,
            })
          }
          else if (!this.state.dayTimeDisabled && this.state.selectedPlan == '') {
              this.setState({
                  dayTimeDisabled: true,
              })
          }
        })
        if (name == "selectedPlan" && this.state.selectedPlanId != event.currentTarget.id) {
            this.setState({
                selectedPlanId: event.currentTarget.id,
            })
            for (var i=0; i<this.state.plans.length; i++) {
                if (this.state.plans[i]["_id"]["$oid"] == event.currentTarget.id) {
                    this.setState({
                        days: this.state.plans[i]["locations"].length,
                    })
                }
            }
        }       
    };

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    addToPlan = async(event) => {
        if (this.state.selectedDay === '' || this.state.selectedPlan == '' || this.state.selectedTime == '') {
            this.setState({
                addWithoutPlan: true,
            })
        }
        else {
            if (this.state.addWithoutPlan) {
                this.setState({
                    addWithoutPlan: false,
                })
            }
            await this.updateDatabase(event.currentTarget.id, event.currentTarget.value)
        }
    }

    updateDatabase = async(id, spending) => {
        var planIndex;
        var _plan;
        var _plans = [...this.state.plans];
        _plans.find((o, i) => {
            if (o["_id"]["$oid"] == this.state.selectedPlanId) {
                planIndex = i;
                _plan = _plans[i]
                return;
            }
        });
        _plan["locations"][this.state.selectedDay][this.state.selectedTime].push(id)
        _plan["budget"] = parseFloat(_plan["budget"]) + parseFloat(spending)
        _plans[planIndex] = _plan;
        this.setState({
            plans: _plans,
        })
        var new_plan = {
            author: _plan["author"],
            budget: _plan["budget"],
            locations: _plan["locations"],
            name: _plan["name"],
        }
        await axios.put('http://localhost:5000/api/plans/'+this.state.selectedPlanId, new_plan)
                .then((response) => response.data);
    }
      

    renderResultsMessage () {
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
        const Name = ({title}) => <div className="result"><h1>{title.text}</h1></div>;
        return (
            <div>
                {!this.isEmpty(this.state.plans) && this.state.isLoggedIn ? 
                    <SelectPlan 
                        plans={this.state.plans} 
                        selectPlanValues={this.selectPlanValues} 
                        selectedPlan={this.state.selectedPlan}
                        dayTimeDisabled={this.state.dayTimeDisabled}
                        days={this.state.days}
                        selectedDay={this.state.selectedDay}
                        selectedTime={this.state.selectedTime}/> : ''}
                {this.state.addWithoutPlan ? <div>Error</div> : ''}
                {this.state.filtered[0] !== undefined ? 
                this.renderResultsMessage() 
                : this.props.userHasSearched ? <Name title={{text: "No results found"}}/> : ''        
                }
                {this.state.filtered.map(item => (
                    <BoxComponent isLoggedIn={this.state.isLoggedIn} addToPlan={this.addToPlan} key={item["_id"]["$oid"]} item={item}/>
                ))}
            </div>
        );
    }
}