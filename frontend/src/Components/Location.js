import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location' 
const API_KEY = "AIzaSyAGrH5hYx20Y_k4drcU47uRPoBhz336QZM"

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
        place: null,
        };
    }

    render() {
        return (
        <div >
            <GoogleComponent
            apiKey={API_KEY}
            language={'en'}
            country={'country:us'}
            coordinates={true}
            locationBoxStyle={'custom-style'}
            locationListStyle={'custom-style-list'}
            onChange={(e) => { this.setState({ place: e }) }} />
        </div>

        )
    } 
}
export default Location;