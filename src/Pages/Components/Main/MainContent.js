import React from 'react';
//import SideBar from '../SideBar/SideBar'
import SearchBar from '../SearchBar/SearchBar'
import './Main.css'

function Main(props) {
    return (
      <div className="Main">
        <SearchBar isLoggedIn ={props.isLoggedIn}/>
      </div>
    );
  }
  
  export default Main;
  