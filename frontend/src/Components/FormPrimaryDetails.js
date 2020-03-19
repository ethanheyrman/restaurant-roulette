import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

export class FormPrimaryDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
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
  //FOR DROPDOWN OPTION 2-----------
  // constructor(props) {
  //   super(props);
  //   this.state = { value: "default" };

  // } -----------------------


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
            <AppBar title="part 1" />
            <TextField
              placeholder="Enter Your Name"
              label="Name"
              onChange={handleChange('Name')}
              defaultValue={values.Name}
              margin="normal"
              fullWidth="true"
            />
            <br />
               <Autocomplete
                multiple
                options={cuisinePref}
                getOptionLabel={option => option.title}
                // defaultValue={[cuisinePref]}
                onChange={this.onTagsChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select your Cuisine Preference"
                    placeholder="Cuisines"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            {/* DROPDOWN OPTION 2-------- */}
            {/* <form>
              <label>
                Cuisine
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="italian">Italian</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                  <option value="mexican">Mexican</option>
                  <option value="greek">Greek</option>
                  <option value="american">American</option>
                  <option value="french">French</option>
                  <option value="asianFusion">Asian fusion</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="thai">Thai</option>
                </select>
              </label>
            </form> */}
            <br />
            <Autocomplete
                multiple
                options={pricePref}
                getOptionLabel={option => option.title}
                defaultValue={[pricePref[0]]}
                onChange={this.onTagsChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select your price Range"
                    placeholder="Price Range"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            {/* DROPDOWN OPTION 2-------- */}
            {/* <form >
              <label>
                Price Range
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="$">$</option>
                  <option value="$$">$$</option>
                  <option value="$$$">$$$</option>
                  <option value="$$$$">$$$$</option>
                </select>
              </label>
            </form> */}
            <br />
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
const pricePref = [
  { title: '$'},
  { title: '$$'},
  { title: '$$$'},
  { title: '$$$$'},
];

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

export default FormPrimaryDetails;