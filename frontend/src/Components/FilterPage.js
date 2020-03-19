import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class FilterPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            hours: '',
            number: '',
            review: '',
            price: '',
            cuisine: '',
            location: '',
            url: '',
        }
        this.getRestaurant = this.getRestaurant.bind(this)
    }

    async componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users/8/')
        .then (res => res.json())
        .then (json => {
            this.setState ({
                name: json.name,
                number: json.phone,
                review: json.id,
                price: json.username,
                cuisine: json.email,
                location: json.address.street,
                url: json.website,
                hours: json.address.zipcode
            }) 
        })
    }
    
    getRestaurant() {
        fetch('https://jsonplaceholder.typicode.com/users/6/')
        .then (res => res.json())
        .then (json => {
            this.setState ({
                name: json.name,
                number: json.phone,
                review: json.id,
                price: json.username,
                cuisine: json.email,
                location: json.address.street,
                url: json.website,
                hours: json.address.zipcode
            }) 
        })
    }

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