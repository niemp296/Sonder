import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import './SideBar.css'
import list from '../../../TestData/search.json'

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: list.entries
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