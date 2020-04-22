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
                <div className="Navigation">
                    <Link className="link" to="/random"><button className="randombutton">Random</button></Link>
                    <Link className="link" to="/filtered"><button className="filterbutton">Filters</button></Link>
                </div>
            </div>
        )
    }
}
export default HomePage