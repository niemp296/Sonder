import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Pages/Components/SignUp';

function App() {

    const signUpPage = (
      <Route path={SignUp}>
        <SignUp />
      </Route>
    )

  return (
    <Router>
      <Switch>
        {signUpPage}
      </Switch>
    </Router>
  );
}

export default App;