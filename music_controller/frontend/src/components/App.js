import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ReactDOM from "react-dom/client";

//make it functinoal

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(<App />);
