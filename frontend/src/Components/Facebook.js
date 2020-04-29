import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import {Link} from "react-router-dom";
import './Facebook.css';

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  async componentDidMount (){
    console.log(this.props)
  }
  componentClicked = () => console.log("clicked");

  render() {
    
    let fbContent;

    if (this.state.isLoggedIn) {
      
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>User logged in: {this.state.name}</h2>
          <div className = "edit">
          Email: {this.state.email}
          </div>
          <Link class="link" to={
                { 
                    pathname: "/form2",
                    users: this.props.location.users || [],
                }}><button class="button">Continue</button></Link>
          <Link class="link" to="/"><button class="button">Home</button></Link>
        </div>
      );
    } else {
      fbContent = (
        <div className="wrapper">
        {/* <div className="form-wrapper"> */}
        <div className = "edit">
        <FacebookLogin
          appId="221803959231445"
          autoLoad={true}
          icon="fa-facebook"
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
        </div>
        {/* </div> */}
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}