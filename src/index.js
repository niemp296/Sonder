import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './Pages/Components/SignUp/SignUp';
import SignIn from './Pages/Components/SignIn/SignIn';
import Home from './Pages/Home';
import Planner from './Pages/Planner';
import Account from './Pages/Account';
import AddPlan from './Pages/Components/Planner/Add-Plan/add-plan';

ReactDOM.render(
  <Router>
      <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/map:id" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/plan-trip/:user_id/:plan_id" component={Planner} />
          <Route path ="/Account:id" component = {Account}/>
          <Route path = "/add-plan:user_id" component = {AddPlan}></Route>
      </div>
  </Router>, document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();