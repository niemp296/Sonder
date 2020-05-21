import React from 'react';
import Header from './Components/Header/Header';
import Main from './Components/Main/MainContent';

export default class Home extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            //contains state variables
        }
        console.log(this.props)
    }

    static defaultProps = {
        // contains default props
    }

    render() {
        if(this.props.location.pathname.length > 1){
            return (
                <div>
                <Header isLoggedIn ={this.props.match.params.id.substring(1)}/>
                <Main/>
                </div>
            );
        }
        return (
            <div>
            <Header/>
            <Main/>
            </div>
        );
    }
}