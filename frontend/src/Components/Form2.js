import React, { Component } from "react";
import "./Form.css";
import {Link} from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { GoogleComponent } from 'react-google-location'; 
//import Facebook from './Components/Facebook.js';

const API_KEY = "AIzaSyAGrH5hYx20Y_k4drcU47uRPoBhz336QZM";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // check 1 if form  is being submitted empty
  Object.values(formErrors).forEach(val => {
    if (val.length <= 0) valid = false;
  });

  // check 2 if the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cuisine: null,
      price: null,
      rating: null,
      distance: null,
      latitude: [],
      longitude: [],
      value: "default",
      formErrors: {
        cuisine: "",
        price: "",
        rating: "",
        distance: ""
      }
    };
  }

  async componentDidMount() {
    console.log(this.props.location.state)

    if (this.props.location.state !== undefined) {
            this.setState({

            longitude: this.props.location.state.longitude || [],
            latitude: this.props.location.state.latitude|| [],
            cuisine: this.props.location.state.cuisine || "",
            rating: this.props.location.state.rating || "",
            price: this.props.location.state.price || ""

        }, () => console.log(this.state) )
        
    }
    console.log(this.state)
}

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Cuisine: ${this.state.cuisine}
        Price: ${this.state.price}
        Rating: ${this.state.rating}
        Distance: ${this.state.distance}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    
    switch (name) {
      case "cuisine":
        formErrors.cuisine =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "price":
        formErrors.price =
            value.length < 1 ? "minimum 1 character required" : "";
        break;
      case "rating":
        formErrors.rating =
            value.length === null ? "minimum 1 character required" : "";
        break;
      case "distance":
        formErrors.distance =
            value.length < 1 ? "minimum 1 character required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onCuisineChange = (event, values) => {
    console.log(this.state)
    console.log(this.state.cuisine == null)
    if (this.state.cuisine == null) {
      this.setState({
        cuisine: values
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }
    else {
      this.setState({
        cuisine: this.state.cuisine.concat(values)
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }
  }

  onPriceChange = (event, values) => {

    if (this.state.price == null) {
      this.setState({
        price: values
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }
    else {
      this.setState({
        price: this.state.price.concat(values)
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }
    
  }

  onRatingChange = (event, values) => {
    if (this.state.rating == null) {
      this.setState({
        rating: values
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }
    else {
      this.setState({
        rating: this.state.rating.concat(values)
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state);
      });
    }

    
  }

  onCoordinateChange = (event) => {
    console.log(event.coordinates)
    if (event.coordinates.lat !== undefined) {
      if (this.state.latitude === []) {
        this.setState({
          latitude: event.coordinates.lat
        }, () => {
          // This will output an array of objects
          // given by Autocompelte options property.
          console.log(this.state);
        });
      }
      else {
        this.setState({
          latitude: this.state.latitude.concat(event.coordinates.lat)
        }, () => {
          // This will output an array of objects
          // given by Autocompelte options property.
          console.log(this.state);
        });
      }
    }

    if (event.coordinates.lng !== undefined) {  
      if (this.state.longitude === []) {
        this.setState({
          longitude: event.coordinates.lng
        }, () => {
          // This will output an array of objects
          // given by Autocompelte options property.
          console.log(this.state);
        });
      }
      else {
        this.setState({
          longitude: this.state.longitude.concat(event.coordinates.lng)
        }, () => {
          // This will output an array of objects
          // given by Autocompelte options property.
          console.log(this.state);
        });
      }
    }
  }


  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Ready? Set. Go!</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="location">
              <label htmlFor="location">Location</label>
              <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                locationBoxStyle={'boxstyle'}
                locationListStyle={'liststyle'}
                onChange={this.onCoordinateChange} />
              {formErrors.distance.length > 0 && (
                <span className="errorMessage">{formErrors.distance}</span>
              )}
            </div>
            <div className="cuisine">
               <Autocomplete
                multiple
                options={cuisinePref}
                getOptionLabel={option => option.title}
                // defaultValue={[cuisinePref]}
                onChange={this.onCuisineChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Cuisine"
                    placeholder="Cuisines"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </div>
          
            <div className="price">
            <Autocomplete
                multiple
                options={pricePref}
                getOptionLabel={option => option.title}
                // defaultValue={[pricePref[0]]}
                onChange={this.onPriceChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Price"
                    placeholder="Price"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
              </div>

            <div className="rating">
            <Autocomplete
            multiple
            options={ratingPref}
            getOptionLabel={option => option.title}
            onChange={this.onRatingChange}
            renderInput={params => (
                <TextField
                {...params}
                variant="standard"
                label="Rating"
                placeholder="Rating"
                margin="normal"
                fullWidth
                />
            )}
            />
            </div>
            <div className="sub_mit">
            <div class="Navigation">
                <Link class="link" to="/"><button class="sub_mit">Home</button></Link>

            {
              !this.props.formValid
              ? <Link class="link" to={
                { 
                    pathname: "/results",
                    state: {
                      longitude: this.state.longitude || [],
                      latitude: this.state.latitude || [],
                      cuisine: this.state.cuisine || "",
                      rating: this.state.rating || "",
                      price: this.state.price || ""
                    }
                }}><button class="sub_mit">
                Submit</button></Link> :
              <Link to={
                { 
                    pathname: "/results"
                }
            }>
            <button class="sub_mit">Submit</button></Link>
           }
           {
              !this.props.formValid
              ? <Link class="link" to={
                { 
                    pathname: "/filtered",
                    state: {
                      longitude: this.state.longitude || [],
                      latitude: this.state.latitude || [],
                      cuisine: this.state.cuisine || "",
                      rating: this.state.rating || "",
                      price: this.state.price || ""
                    }
                }}><button class="sub_mit" disabled={!this.state.latitude || !this.state.longitude}>
                Add user</button></Link> :
              <Link class="link" to="/filtered"><button class="sub_mit">Add user</button></Link>
           }
            </div>
              {/* <small>Already Have an Account</small> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;

// Cuisine preference
const cuisinePref = [
  { title: 'Italian'},
  { title: 'Indian'},
  { title: 'Chinese'},
  { title: 'Japanese'},
  { title: 'Mexican'},
  { title: 'Greek'},
  { title: 'American'},
  { title: 'French'},
  { title: 'Asian fusion'},
  { title: 'Mediterranean'},
  { title: 'Thai' },
];

// Price preference
const pricePref = [
  { title: '$'},
  { title: '$$'},
  { title: '$$$'},
  { title: '$$$$'},
];

// Rating preference
const ratingPref = [
  { title: '⭐' },
  { title: '⭐⭐'},
  { title: '⭐⭐⭐'},
  { title: '⭐⭐⭐⭐'},
  { title: '⭐⭐⭐⭐⭐'},
];