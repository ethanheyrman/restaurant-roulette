import React from 'react';
import './App.css';
import RandomPage from './Components/RandomPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div class="App">
     <Router>
        <Switch>
        <Route path="/random">
            <Random />
        </Route>
        <Route path="/">
            <Home />
        </Route>
        </Switch>
    </Router>
    </div>
  );
}

function Home() {
  return <Link to="/random">random</Link>;
}

function Random() {
  return <RandomPage></RandomPage>;
}

export default App;
