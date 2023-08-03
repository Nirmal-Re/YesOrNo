import React, { Component } from "react";
import homeCSS from "./css/index.module.css";
import { Button } from "react-bootstrap";

class Index extends Component {
  state = {};
  render() {
    return (
      <div className={homeCSS.homeContainer}>
        <div className={homeCSS.welcomeCont}>
          <div className={homeCSS.textHome}>
            <span className={homeCSS.dare}>Dare</span>
            <span className={homeCSS.understand}>To</span>
            <span className={homeCSS.control}>Understand Yourself</span>
          </div>
        </div>
        <div className={homeCSS.buttonContainer}>
          <div className={homeCSS.loginContainer}>
            <Button variant="warning" size="lg">
              <a href="/login">LOG IN</a>
            </Button>
          </div>
          <div className={homeCSS.signupContainer}>
            <Button className={homeCSS.txt} variant="dark" size="lg">
              <a href="/signup">SIGN UP</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
