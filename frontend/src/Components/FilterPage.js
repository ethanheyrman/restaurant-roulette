import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class FilterPage extends React.Component {

    render() {
        return (
            <div>
            <div class="FilteredRestaurant">
            <Link class="link" to="/userform"><button class="homebutton">Start</button></Link>
            </div>
            <div class="Navigation">
                <Link class="link" to="/"><button class="homebutton">Home</button></Link>
            </div>
            </div>
        )
    }
}
export default FilterPage