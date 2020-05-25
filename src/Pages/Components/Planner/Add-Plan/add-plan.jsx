import React from 'react';
import { Redirect } from 'react-router-dom'
import Header from '../../Header/Header'
/*
todo: 
- get user id from props
- populate state with user field
*/
export default class AddPlan extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id : this.props.match.params.user_id.substring(1)
        }
    }
    
    render() {
        return (
            <div>
                <Header isLoggedIn = {this.state.id}/>
                <section id="account-container">
                    <h1>add-plan</h1>
                </section>
            </div>
        );
    }
}