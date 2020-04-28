import React, { Component } from 'react';
import SearchBar from './SearchBar'
import './SideBar.css'

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [
            "omg it's 3 am",
            "need sleep",
            "super tuesday @ popeyes tomorrow",
            "i mean today"
          ]
        };
      }
    render() {
        return (
            <section className="SideBar">               
                <SearchBar items={this.state.list}/>
            </section>
        );
    }
}