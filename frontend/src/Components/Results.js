import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class Results extends React.Component {

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
                <div class="Name">{this.state.name}</div>
                <div class="Info">
                    <div>{this.state.cuisine}</div>
                    <div>{this.state.review}</div>
                    <div>{this.state.price}</div>
                    <div>{this.state.location}</div>
                    <div>{this.state.number}</div>
                    <div><a id="url" href={"https://www." + this.state.url}>{this.state.url}</a></div>
                </div>
                <div class="Hours">
                    <div>hours</div>
                    <div>{this.state.hours}</div>
                </div>
            </div>
            <div class="Navigation">
                <Link class="link" to="/"><button class="homebutton">Home</button></Link>
            </div>
            </div>
        )
    }
}
export default Results