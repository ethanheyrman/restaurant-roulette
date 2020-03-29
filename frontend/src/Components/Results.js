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
                    <div class="Title">cuisine</div>
                    <div class="Value">{this.state.cuisine}</div>
                    <div class="Title">rating</div>
                    <div class="Value">{this.getRating(this.state.review)}</div>
                    <div class="Title">price</div>
                    <div class="Value">{this.getPrice(this.state.price)}</div>
                </div>
                <div class="Contact">
                    <div class="Title">address</div>
                    <div class="Value">{this.state.location}</div>
                    <div class="Title">phone number</div>
                    <div class="Value">{this.state.number}</div>
                    <div class="Title">website</div>
                    <div class="Value"><a id="url" href={this.state.url}>{this.state.url}</a></div>
                </div>
                <div class="Hours">
                    <h4>time</h4>
                    <div>
                        <p>{this.state.sunday_open} - {this.state.sunday_close}</p>
                        <p>{this.state.monday_open} - {this.state.monday_close}</p>
                        <p>{this.state.tuesday_open} - {this.state.tuesday_close}</p>
                        <p>{this.state.wednesday_open} - {this.state.wednesday_close}</p>
                        <p>{this.state.thursday_open} - {this.state.thursday_close}</p>
                        <p>{this.state.friday_open} - {this.state.friday_close}</p>
                        <p>{this.state.saturday_open} - {this.state.saturday_close}</p>
                    </div>
                </div>
                <div class="Days">
                    <h4>day</h4>
                    <p>sunday:</p>
                    <p>monday:</p>
                    <p>tuesday:</p>
                    <p>wednesday:</p>
                    <p>thursday:</p>
                    <p>friday:</p>
                    <p>saturday:</p>
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