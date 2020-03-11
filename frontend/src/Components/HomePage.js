import React from 'react'
import './HomePage.css'
import {Link} from "react-router-dom";

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        return (
            <div>
                <div class="Navigation">
                    <Link class="link" to="/random"><button class="randombutton">Random</button></Link>
                    <Link class="link" to="/filters"><button class="filterbutton">Filters</button></Link>
                </div>
            </div>
        )
    }
}
export default HomePage