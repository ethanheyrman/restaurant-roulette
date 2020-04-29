import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class Results extends React.Component {

    constructor(props) {
        super(props)
         this.state = {
             restaurants:[],
             users: []
         }
         this.getRestaurant = this.getRestaurant.bind(this)
     }

     async componentDidMount() {
         console.log(this.props)
         this.setState({
            users: this.state.users.concat(this.props.location.state) || [],
        }, () => {

                console.log(this.state)
            this.setState ({
                users: this.state.users.concat(this.props.location.users)
            }, () => {
                console.log(this.state)
                fetch('http://127.0.0.1:8000/restaurant/filtered/', {
                    method: 'POST',
                    body: JSON.stringify(this.state.users)
                })
                .then (res => res.json())
                .then (json => {
                    console.log(json)
                    this.setState ({
                        restaurants: json.restaurant_queryset
                    }) 
                    console.log(this.state)
                })
            })  
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
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
            </div>
            case 1.5:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/half-star-2015.svg" alt=""></img>
            </div>
            case 2: 
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
            </div>
            case 2.5:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/half-star-2015.svg" alt=""></img>
            </div>
            case 3:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
            </div>
            case 3.5:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/half-star-2015.svg" alt=""></img>
            </div>
            case 4:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
            </div>
            case 4.5:
                return <div>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/half-star-2015.svg" alt=""></img>
            </div>
            case 5: 
                return <div>
                    <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                    <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                    <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                    <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                    <img src="https://images.media-allrecipes.com/ar-images/icons/rating-stars/full-star-2015.svg" alt=""></img>
                </div>
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
        }     
    }

     monOpenHours(item){
        return item.monday_open === '00:00:00' ? 'Closed' : item.monday_open
     }

     monCloseHours(item){
        if (item.monday_open === '00:00:00' && item.monday_close === '00:00:00') {
            return ''
        } else {
            return item.monday_close
        }     
    }

     tuesOpenHours(item){
        return item.tuesday_open === '00:00:00' ? 'Closed' : item.tuesday_open
     }

     tuesCloseHours(item){
        if (item.tuesday_open === '00:00:00' && item.tuesday_close === '00:00:00') {
            return ''
        } else {
            return item.tuesday_close
        }     
    }

     wednesOpenHours(item){
        return item.wednesday_open === '00:00:00' ? 'Closed' : item.wednesday_open
     }

     wednesCloseHours(item){
        if (item.wednesday_open === '00:00:00' && item.wednesday_close === '00:00:00') {
            return ''
        } else {
            return item.wednesday_close
        }     
    }

     thursOpenHours(item){
        return item.thursday_open === '00:00:00' ? 'Closed' : item.thursday_open
     }

     thursCloseHours(item){
        if (item.thursday_open === '00:00:00' && item.thursday_close === '00:00:00') {
            return ''
        } else {
            return item.thursday_close
        }     
    }

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
        }     
    }

     addDash(item){
         return item === '00:00:00' ? '' : '-'
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
                         <p>{this.sunOpenHours(item)} {this.addDash(item.sunday_open)} {this.sunCloseHours(item)}</p>
                         <p>{this.monOpenHours(item)} {this.addDash(item.monday_open)} {this.monCloseHours(item)}</p>
                         <p>{this.tuesOpenHours(item)} {this.addDash(item.tuesday_open)} {this.tuesCloseHours(item)}</p>
                         <p>{this.wednesOpenHours(item)} {this.addDash(item.wednesday_open)} {this.wednesCloseHours(item)}</p>
                         <p>{this.thursOpenHours(item)} {this.addDash(item.thursday_open)} {this.thursCloseHours(item)}</p>
                         <p>{this.friOpenHours(item)} {this.addDash(item.friday_open)} {this.friCloseHours(item)}</p>
                         <p>{this.satOpenHours(item)} {this.addDash(item.saturday_open)} {this.satCloseHours(item)}</p>
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