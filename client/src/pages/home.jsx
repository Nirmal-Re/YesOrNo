import React, { Component } from "react";
import homeCSS from "./css/home.module.css";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className={homeCSS.welcomeCont}>
        <div className={homeCSS.textHome}>
          <span className={homeCSS.dare}>Dare </span>
          <span className={homeCSS.understand}>To Understand </span>
          <span className={homeCSS.control}>What Controls You</span>
        </div>
      </div>
    );
  }
}

export default Home;
