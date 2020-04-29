import React, { Component } from "react";
import "./Form.css";
import {Link} from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { GoogleComponent } from 'react-google-location';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'; 

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const prices = [
  {
    value: 1,
    label: '$',
  },
  {
    value: 2,
    label: '$$',
  },
  {
    value: 3,
    label: '$$$',
  },
  {
    value: 4,
    label: '$$$$',
  },
]

const ratings = [
  {
    value: 1,
    label:'1⭐',
  },
  { 
    value: 2,
    label:'2⭐',
  },
  { 
    value: 3,
    label:'3⭐'
  },
  { 
    value: 4,
    label:'4⭐',
  },
  { 
    value: 5,
    label:'5⭐'
  }
]

const API_KEY = "AIzaSyAGrH5hYx20Y_k4drcU47uRPoBhz336QZM";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // check 1 if form  is being submitted empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
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
      firstName: null,
      lastName: null,
      email: null,
      cuisine: null,
      price: null,
      rating: null,
      distance: null,
      latitude: '',
      longitude: '',
      value: "default",
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        cuisine: "",
        price: "",
        rating: "",
        distance: ""
      }
    };
  }


  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
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
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
      case "email":
        //   check if email has @sign else invalid
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
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
    this.setState({
      cuisine: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state);
    });
  }

  onPriceChange = (event, values) => {
    this.setState({
      price: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state);
    });
  }

  onRatingChange = (event, values) => {
    this.setState({
      rating: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state);
    });
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Ready? Set. Go!</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="location">
              <label htmlFor="location">Location</label>
              <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                locationBoxStyle={'boxstyle'}
                locationListStyle={'liststyle'}
                onChange={(e) => { this.setState({ latitude: e.coordinates.lat, longitude: e.coordinates.lng })}} />
              {formErrors.distance.length > 0 && (
                <span className="errorMessage">{formErrors.distance}</span>
              )}
            </div>
            <div className="cuisine">
               <Autocomplete
                multiple
                options={cuisinePref}
                getOptionLabel={option => option.title}
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
              <Typography id="price-values" gutterBottom>
                Price
              </Typography>
              <Slider
                defaultValue={1}
                min={1}
                step={1}
                marks={prices}
                max={4}
                valueLabelDisplay="auto"
                aria-labelledby="price-values"
              />
            </div>
            <div className="rating">
              <Typography id="rating-values" gutterBottom>
                Rating
              </Typography>
              <Slider
                defaultValue={5}
                min={1}
                step={.5}
                marks={ratings}
                max={5}
                valueLabelDisplay="auto"
                aria-labelledby="rating-values"
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
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email: this.state.email,
                      longitude: this.state.longitude || "",
                      latitude: this.state.latitude || "",
                      cuisine: this.state.cuisine || "",
                      rating: this.state.rating || "",
                      price: this.state.price || ""
                    }
                }}><button class="sub_mit" disabled={!this.state.email || !this.state.firstName}>
                Submit</button></Link> :
              <Link to={
                { 
                    pathname: "/results",
                    firstName: this.state.firstName
                }
            }>
            <button class="sub_mit">Submit</button></Link>
           }
           {
              !this.props.formValid
              ? <Link class="link" to="/filtered"><button class="sub_mit" disabled={!this.state.email || !this.state.firstName}>
                Add user</button></Link> :
              <Link class="link" to="/filtered"><button class="sub_mit">Add user</button></Link>
           }
            </div>
              {/* <small>Already Have an Account</small> */}
              <Link class="link" to={
                { 
                    pathname: "/fb",
                    users: this.state.users
                }} ><small>Already Have an Account?</small></Link>
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