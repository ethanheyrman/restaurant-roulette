import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

export class FormSecondaryDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
    this.onTagsChange = this.onTagsChange.bind(this);
  }
  onTagsChange = (event, values) => {
    this.setState({
      tags: values
    }, () => {
      // This outputs an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider >
        <React.Fragment>
        <Dialog 
            open="true"
            fullWidth="true"
            maxWidth='sm'
          >
            <AppBar title="part 2" />
            <Autocomplete
                multiple
                options={ratingPref}
                getOptionLabel={option => option.title}
                defaultValue={[ratingPref[2]]}
                onChange={this.onTagsChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select your rating preference"
                    placeholder="Rating"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            {/* DROPDOWN OPTION 2-------- */}
            {/* <form>
              <label>
                Rating
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="1star">{'\u2b50'}</option>
                  <option value="2star">{'\u2b50'}{'\u2b50'}</option>
                  <option value="3star">{'\u2b50'}{'\u2b50'}{'\u2b50'}</option>
                  <option value="4star">{'\u2b50'}{'\u2b50'}{'\u2b50'}{'\u2b50'}</option>
                  <option value="5star">{'\u2b50'}{'\u2b50'}{'\u2b50'}{'\u2b50'}{'\u2b50'}</option>
                </select>
              </label>
            </form> */}
            <br />
            <TextField
              placeholder="Enter Your Distance Preference"
              label="Distance"
              onChange={handleChange('Distance')}
              defaultValue={values.Distance}
              margin="normal"
							fullWidth="true"
            />
            <br />
        
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

// Price preference
const ratingPref = [
  { title: '⭐' },
  { title: '⭐⭐'},
  { title: '⭐⭐⭐'},
  { title: '⭐⭐⭐⭐'},
  { title: '⭐⭐⭐⭐⭐'},
];

export default FormSecondaryDetails;