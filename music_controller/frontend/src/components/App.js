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
      <div className="center">
        {/* is gonna use the center class in the index.css file*/}
        <HomePage />
      </div>
    );
  }
}

// const cars = [<h1>Ford</h1>, <h1>BMW</h1>,<h1>Audi</h1>] -> you can render lists: render(cars) works! Use cars.map((ele)=>{do stuff with ele})

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(<App />);
