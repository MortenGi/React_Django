import React, { Component } from "react";
import { render } from "react-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<p>This is the homePage</p>}></Route>
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/Room/:roomCode" element={<Room />} />
          {/* By default, Router passes props to the component that tell us how we accessed it. Match() tells us how router matched the component with the URL we named  */}
        </Routes>
      </Router>
    );
  }
}
