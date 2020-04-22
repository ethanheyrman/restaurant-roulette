import React from 'react'
import './FilterPage.css'

import {
    Link
  } from "react-router-dom";

class FilterPage extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          firstName: '',
          lastName: null,
          email: null,
          category: null,
          price: null,
          rating: null,
          distance: null,
          latitude: '',
          longitude: '',
          users: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this)
      }

    async componentDidMount() {
        console.log(this.props)
        if (this.props.location.state !== undefined) {
            this.setState({
                longitude: this.props.location.state.longitude || "",
                latitude: this.props.location.state.latitude|| "",
                category: this.props.location.state.category || "",
                rating: this.props.location.state.rating || "",
                price: this.props.location.state.price || "",
                users: this.state.users.concat(this.props.location.state) || [],
            }, () => {
                this.setState ({
                    users: this.state.users.concat(this.props.location.users)
                }, () => {
                    console.log(this.state) 
                })
                
            })
            
            
        }
        
        
    }
    
    render() {
        return (
            <div>
            <div class="FilteredRestaurant">
            <Link class="link" to={
                { 
                    pathname: "/form",
                    state: {
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email: this.state.email,
                      longitude: this.state.longitude || "",
                      latitude: this.state.latitude || "",
                      category: this.state.category || "",
                      rating: this.state.rating || "",
                      price: this.state.price || ""
                    },
                    users: this.state.users || [],
                }}><button class="homebutton">Start</button></Link>
            </div>
            <div class="Navigation">
                <Link class="link" to="/"><button class="homebutton">Home</button></Link>
            </div>
            </div>
        )
    }
}
export default FilterPage