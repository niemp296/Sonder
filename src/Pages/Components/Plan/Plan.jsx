import React from 'react';
import axios from "axios";
import './Plan.css'

export default class Plan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location_id: [],
            budget: 0.0,
            author:""
        }
        this.getPlanInfo()
    }

    //this function retrieve plan data from the database
    getPlanInfo = () => {
        var id = this.props.id.$oid;
        axios.get('http://localhost:5000/api/plans/' + id)
            .then((response) => {
                // handle success
                
                /* debugger
                console.log(response);
                console.log(response.data.name); //location name
                console.log(response.data.locations[0].$oid); //location id
                console.log(response.data.budget); //location budget
                */
                var plan_info = response.data;
                if(response.status === 200){
                    this.setState({
                        name: plan_info.name,
                        location_id: plan_info.locations[0].$oid,
                        budget: plan_info.budget,
                        author: plan_info.author
                    })
                }
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    //TODO: picture?
    render() {
        return (
            <section>
            <div className="card bg-light border-dark mb-3 user-plan"> 
                <div className="card-body">
                    <h2 className="card-title text-center planner-activity-text">{this.state.name}</h2>
                    <h2 className="card-title text-center planner-activity-text">${this.state.budget}</h2>
                </div>
            </div>
            </section>
        );
    }
}