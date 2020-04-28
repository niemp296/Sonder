import React, { Component } from 'react';
import SearchBar from './SearchBar'

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [
            "quick brown fox",
            "jumps over",
            "the lazy goodyboy"
          ]
        };
      }
    render() {
        return (
            <section className="SideBar">               
                <SearchBar items={this.state.list} />
            </section>
        );
    }
}