import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUp from './Pages/Components/SignUp/SignUp';
import Home from './Pages/Home';
import Planner from './Pages/Planner';
import Stay from './Pages/Components/Planner/Planner-Stay/Stay';
/*
import Flight from './Pages/Components/Planner/Planner-Flight/Flight';
import Stay from './Pages/Components/Planner/Planner-Stay/Stay';
import Main from './Pages/Components/Planner/Planner-Main/Main';
*/

//TODO: put home back to router
ReactDOM.render(
  <Router>
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route exact path="/plan-trip" component={Planner} />
          <Route exact path="/stay" component={Stay} />
      </div>
  </Router>, document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();