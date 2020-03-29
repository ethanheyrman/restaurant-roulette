import React, { Component } from "react";
import "./Form.css";
import {Link} from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
    //   password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        // password: ""
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
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        //   check if email has @sign else invalid
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "cuisine":
        formErrors.cuisine =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "price":
        formErrors.price =
            value.length < 1 ? "minimum 1 characater required" : "";
        break;
      case "rating":
        formErrors.rating =
            value.length < 1 ? "minimum 1 characater required" : "";
        break;
      case "distance":
        formErrors.distance =
            value.length < 1 ? "minimum 1 characater required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

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
            <div className="cuisine">
              <label htmlFor="cuisine">Cuisine</label>
              <input
                className={formErrors.cuisine.length > 0 ? "error" : null}
                placeholder="Cuisine"
                type="cuisine"
                name="cuisine"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cuisine.length > 0 && (
                <span className="errorMessage">{formErrors.cuisine}</span>
              )}
            </div>
            <div className="price">
              <label htmlFor="price">Price</label>
              <input
                className={formErrors.price.length > 0 ? "error" : null}
                placeholder="Price"
                type="price"
                name="price"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.price.length > 0 && (
                <span className="errorMessage">{formErrors.price}</span>
              )}
            </div>
            <div className="rating">
              <label htmlFor="rating">Rating</label>
              <input
                className={formErrors.rating.length > 0 ? "error" : null}
                placeholder="Rating"
                type="rating"
                name="rating"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.rating.length > 0 && (
                <span className="errorMessage">{formErrors.rating}</span>
              )}
            </div>
            <div className="distance">
              <label htmlFor="distance">Distance</label>
              <input
                className={formErrors.distance.length > 0 ? "error" : null}
                placeholder="Distance"
                type="distance"
                name="distance"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.distance.length > 0 && (
                <span className="errorMessage">{formErrors.distance}</span>
              )}
            </div>
            <div className="sub_mit">
            <div class="Navigation">
                <Link class="link" to="/"><button class="sub_mit">Home</button></Link>
            <Link class="link" to="/results"><button class="sub_mit">Submit</button></Link>
            <Link class="link" to="/filtered"><button class="sub_mit">Add user</button></Link>
            </div>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;