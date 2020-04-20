import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class Results extends React.Component {

    constructor(props) {
        super(props)
         this.state = {
             restaurants:[]
         }
         this.getRestaurant = this.getRestaurant.bind(this)
     }

     async componentDidMount() {
         console.log(this.props.location.state)
         fetch('http://127.0.0.1:8000/restaurant/filtered/', {
             method: 'POST',
             body: JSON.stringify(
                [
                    {
                        'longitude': this.props.location.state.longitude,
                        'latitude': this.props.location.state.latitude,
                        'category': this.props.location.state.cuisine,
                        'rating': this.props.location.state.rating,
                        'price': this.props.location.state.price
                    }
                ]
            )
         })
         .then (res => res.json())
         .then (json => {
             console.log(json)
             this.setState ({
                 restaurants: json.restaurant_queryset
             }) 
             console.log(this.state)
         })

     }

     getRestaurant() {
         fetch('http://127.0.0.1:8000/restaurant/filtered/', {
            method: 'POST',
            body: JSON.stringify(
                [
                    {
                        'longitude': this.props.location.state.longitude,
                        'latitude': this.props.location.state.latitude,
                        'category': this.props.location.state.cuisine,
                        'rating': this.props.location.state.rating,
                        'price': this.props.location.state.price
                    }
                ]
            )
        })
         .then (res => res.json())
         .then (json => {
             console.log(json)
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
            {this.state.restaurants.map((item) => 
                <div>
                 <div className="FilteredRestaurant">
                 <div className="FName">{item.name}</div>
                 <div className="FInfo">
                     <div className="FTitle">cuisine</div>
                     <div className="FValue">{item.category}</div>
                     <div className="FTitle">rating</div>
                     <div className="FValue">{this.getRating(item.rating)}</div>
                     <div className="FTitle">price</div>
                     <div className="FValue">{this.getPrice(item.price)}</div>
                 </div>
                 <div className="FContact">
                     <div className="FTitle">address</div>
                     <div className="FValue">{item.address}</div>
                     <div className="FTitle">phone number</div>
                     <div className="FValue">{item.phone}</div>
                     <div className="FTitle">website</div>
                     <div className="FValue"><a id="Furl" href={item.website}>{item.website}</a></div>
                 </div>
                 <div className="FHours">
                     <h4>time</h4>
                     <div>
                         <p>{item.sunday_open} - {item.sunday_close}</p>
                         <p>{item.monday_open} - {item.monday_close}</p>
                         <p>{item.tuesday_open} - {item.tuesday_close}</p>
                         <p>{item.wednesday_open} - {item.wednesday_close}</p>
                         <p>{item.thursday_open} - {item.thursday_close}</p>
                         <p>{item.friday_open} - {item.friday_close}</p>
                         <p>{item.saturday_open} - {item.saturday_close}</p>
                     </div>
                 </div>
                 <div className="FDays">
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
            
            </div>
        )}
             
             <div className="Navigation">
                <Link className="link" to="/"><button className="homebutton">Home</button></Link>
            </div>
            </div>
        )
    }
}
export default Results