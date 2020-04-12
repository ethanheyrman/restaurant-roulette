import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Reservation() {
  const classes = useStyles();

  return (
    <div className="wrapper">
    <div className="form-wrapper">
    <h1>Hungry? Book Away!</h1>
    <form className={classes.container} noValidate>
      <div className = "edit">
      <TextField
        id="datetime-local"
        label="Reservation Day"
        type="date"
        defaultValue="2020-04-11"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="time"
        label="Reservation Time"
        type="time"
        defaultValue="08:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
      />
      <TextField
        id="user"
        label="Number of people(digit)"
        type="text"
        defaultValue="1"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
    </form>
    <Link class="sub_mit" to="/ack"><button class="sub_mit">Submit</button></Link>
    </div>
    </div>
  );
}
