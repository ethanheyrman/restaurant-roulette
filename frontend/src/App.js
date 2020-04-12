import React from 'react';
import './App.css';
import RandomPage from './Components/RandomPage';
import HomePage from './Components/HomePage';
import FilterPage from './Components/FilterPage';
import Results from './Components/Results.js';
import Form from './Components/Form.js';
import Reservation from './Components/Reservation.js';
import Acknowledgement from './Components/Acknowledgement.js';

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
        <Route path="/results">
            <Results />
        </Route>
        <Route path="/res">
            <Reservation />
        </Route>
        <Route path="/ack">
            <Acknowledgement />
        </Route>
        <Route path="/form">
            <Form />
        </Route>
        <Route path="/filtered">
            <Filter />
        </Route>
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
  return <HomePage></HomePage>;
}

function Random() {
  return <RandomPage></RandomPage>;
}

function Filter() {
  return <FilterPage></FilterPage>
}

export default App;
