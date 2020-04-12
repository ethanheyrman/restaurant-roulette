import React from 'react';
import {Link} from "react-router-dom";

export default function Reservation() {

  return (
    <div className="wrapper">
    <div className="form-wrapper">
    <h1>Your reservation has been received!</h1>
    <Link class="sub_mit" to="/"><button class="sub_mit">Home</button></Link>
    </div>
    </div>
  );
}
