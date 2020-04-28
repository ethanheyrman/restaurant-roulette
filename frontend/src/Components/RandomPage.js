import React from 'react'
import './RandomPage.css'

import {
    Link
  } from "react-router-dom";

class RandomPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
        fetch('http://127.0.0.1:8000/restaurant/rand/')
        .then (res => res.json())
        .then (json => {
            this.setState ({
                name: json.name,
                number: json.phone,
                review: json.rating,
                price: json.price,
                cuisine: json.category,
                location: json.address,
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
                saturday_close: json.saturday_close,
            }) 
        })
    }
    
    getRestaurant() {
        fetch('http://127.0.0.1:8000/restaurant/rand/')
        .then (res => res.json())
        .then (json => {
            this.setState ({
                name: json.name,
                number: json.phone,
                review: json.rating,
                price: json.price,
                cuisine: json.category,
                location: json.address,
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
                saturday_close: json.saturday_close,
            }) 
        })
    }

    getRating(rating) {
        switch (rating) {
            case 1: 
                return "⭐"
            case 1.5:
                return "⭐⭐"
            case 2: 
                return "⭐⭐"
            case 2.5:
                return "⭐⭐⭐"
            case 3:
                return "⭐⭐⭐"
            case 3.5:
                return "⭐⭐⭐⭐"
            case 4:
                return "⭐⭐⭐⭐"
            case 4.5:
                return "⭐⭐⭐⭐⭐"
            case 5: 
                return "⭐⭐⭐⭐⭐"
            default:
                return "No Rating Available"
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
                return "No Price Available"
        }
    }

    sunOpenHours(item){
        return item.sunday_open === '00:00:00' ? 'Closed' : item.sunday_open
     }

     sunCloseHours(item){
        if (item.sunday_open === '00:00:00' && item.sunday_close === '00:00:00') {
            return ''
        } else {
            return item.sunday_close
        }     }

     monOpenHours(item){
        return item.monday_open === '00:00:00' ? 'Closed' : item.monday_open
     }

     monCloseHours(item){
        if (item.monday_open === '00:00:00' && item.monday_close === '00:00:00') {
            return ''
        } else {
            return item.monday_close
        }     }

     tuesOpenHours(item){
        return item.tuesday_open === '00:00:00' ? 'Closed' : item.tuesday_open
     }

     tuesCloseHours(item){
        if (item.tuesday_open === '00:00:00' && item.tuesday_close === '00:00:00') {
            return ''
        } else {
            return item.tuesday_close
        }     }

     wednesOpenHours(item){
        return item.wednesday_open === '00:00:00' ? 'Closed' : item.wednesday_open
     }

     wednesCloseHours(item){
        if (item.wednesday_open === '00:00:00' && item.wednesday_close === '00:00:00') {
            return ''
        } else {
            return item.wednesday_close
        }     }

     thursOpenHours(item){
        return item.thursday_open === '00:00:00' ? 'Closed' : item.thursday_open
     }

     thursCloseHours(item){
        if (item.thursday_open === '00:00:00' && item.thursday_close === '00:00:00') {
            return ''
        } else {
            return item.thursday_close
        }     }

     friOpenHours(item){
        return item.friday_open === '00:00:00' ? 'Closed' : item.friday_open
     }

     friCloseHours(item){
        if (item.friday_open === '00:00:00' && item.friday_close === '00:00:00') {
            return ''
        } else {
            return item.friday_close
        }
    }

     satOpenHours(item){
        return item.saturday_open === '00:00:00' ? 'Closed' : item.saturday_open
     }

     satCloseHours(item){
        if (item.saturday_open === '00:00:00' && item.saturday_close === '00:00:00') {
            return ''
        } else {
            return item.saturday_close
        }     }

     addDash(item){
         return item === '00:00:00' ? '' : '-'
     }

    render() {
        return (
            <div>
            <div class="RandomRestaurant">
                <div class="RName">{this.state.name}</div>
                <div class="RInfo">
                    <div class="RTitle">cuisine</div>
                    <div class="RValue">{this.state.cuisine}</div>
                    <div class="RTitle">rating</div>
                    <div class="RValue">{this.getRating(this.state.review)}</div>
                    <div class="RTitle">price</div>
                    <div class="RValue">{this.getPrice(this.state.price)}</div>
                </div>
                <div class="RContact">
                    <div class="RTitle">address</div>
                    <div class="RValue">{this.state.location}</div>
                    <div class="RTitle">phone number</div>
                    <div class="RValue">{this.state.number}</div>
                    <div class="RTitle">website</div>
                    <div class="RValue"><a id="Rurl" href={this.state.url}>{this.state.url}</a></div>
                </div>
                <div class="RHours">
                    <h4>time</h4>
                    <div>
                        <p>{this.sunOpenHours(this.state)} {this.addDash(this.state.sunday_open)} {this.sunCloseHours(this.state)}</p>
                        <p>{this.monOpenHours(this.state)} {this.addDash(this.state.monday_open)} {this.monCloseHours(this.state)}</p>
                        <p>{this.tuesOpenHours(this.state)} {this.addDash(this.state.tuesday_open)} {this.tuesCloseHours(this.state)}</p>
                        <p>{this.wednesOpenHours(this.state)} {this.addDash(this.state.wednesday_open)} {this.wednesCloseHours(this.state)}</p>
                        <p>{this.thursOpenHours(this.state)} {this.addDash(this.state.thursday_open)} {this.thursCloseHours(this.state)}</p>
                        <p>{this.friOpenHours(this.state)} {this.addDash(this.state.friday_open)} {this.friCloseHours(this.state)}</p>
                        <p>{this.satOpenHours(this.state)} {this.addDash(this.state.saturday_open)} {this.satCloseHours(this.state)}</p>
                    </div>
                </div>
                <div class="RDays">
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
                <button class="rerollbutton" onClick={this.getRestaurant}>reroll</button>
                <Link class="link" to="/"><button class="rerollbutton">home</button></Link>
            </div>
            </div>
        )
    }
}
export default RandomPage