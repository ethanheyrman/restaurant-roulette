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
            sunday_open: '',
            sunday_close: '',
            monday_open: '',
            monday_close: '',
            tuesday_open: '',
            tuesday_close: '',
            wednesday_open: '',
            wednesday_close: '',
            thursday_open: '',
            thursday_close: '',
            friday_open: '',
            friday_close: '',
            saturday_open: '',
            saturday_close: '',
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
                sunday_open: json.sunday_open,
                sunday_close: json.sunday_close,
                monday_open: json.monday_open,
                monday_close: json.monday_close,
                tuesday_open: json.tuesday_open,
                tuesday_close: json.tuesday_close,
                wednesday_open: json.wednesday_open,
                wednesday_close: json.wednesday_close,
                thursday_open: json.thursday_open,
                thursday_close: json.thursday_close,
                friday_open: json.friday_open,
                friday_close: json.friday_close,
                saturday_open: json.saturday_open,
                saturday_close: json.saturday_close,            }) 
        })
    }
    
    getRating(rating) {
        switch (rating) {
            case 1: 
                return "⭐"
            case 2: 
                return "⭐⭐"
            case 3:
                return "⭐⭐⭐"
            case 4:
                return "⭐⭐⭐⭐"
            case 5: 
                return "⭐⭐⭐⭐⭐"
            default:
                return ""
        }
    }

    getPrice(price) {
        switch (price) {
            case 1: 
                return "$"
            case 2: 
                return "$ $"
            case 3:
                return "$ $ $"
            case 4:
                return "$ $ $ $"
            default:
                return ""
        }
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