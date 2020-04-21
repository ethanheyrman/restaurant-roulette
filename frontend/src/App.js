import React from 'react';
import './App.css';
import RandomPage from './Components/RandomPage';
import HomePage from './Components/HomePage';
import FilterPage from './Components/FilterPage';
import Results from './Components/Results.js';
import Form from './Components/Form.js';
import Form2 from './Components/Form2.js';
import Facebook from './Components/Facebook.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Router>
        <Switch>
        <Route path="/filtered" render={(props) => <FilterPage {...props}/>}>
        </Route>

        <Route path="/results" render={(props) => <Results {...props}/>}>
        </Route>

        <Route path="/form" render={(props) => <Form {...props}/>}>
        </Route>

        <Route path="/form2"render={(props) => <Form2 {...props}/>}>
        </Route>

        <Route path="/fb"render={(props) => <Facebook {...props}/>}>
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


export default App;
