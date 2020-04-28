import React from 'react';
import Header from './Components/Header';
import Main from './Components/MainContent';

export default class Home extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            //contains state variables
        }
    }

    static defaultProps = {
        // contains default props
    }

    render() {
        return (
            <div>
            <Header/>
            <Main/>
            </div>
        );
    }
}