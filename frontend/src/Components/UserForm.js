import React, { Component } from 'react';
import FormUserDetails from './FormPrimaryDetails';
import FormPersonalDetails from './FormSecondaryDetails';
import Review from './Review';
import Display from './Display';

export class UserForm extends Component {
  state = {
    step: 1,
    Name: '',
    Cuisine: '',
    Price: '',
    Rating: '',
    Distance: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { Name, Cuisine, Price, Rating, Distance } = this.state;
    const values = { Name, Cuisine, Price, Rating, Distance };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Review
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Display />;
    }
  }
}

export default UserForm;