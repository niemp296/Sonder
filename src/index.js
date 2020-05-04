import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './Pages/Components/SignUp/SignUp';

ReactDOM.render(
  <Router>
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
      </div>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();