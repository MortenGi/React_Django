import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function RenderHomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" href="/join">
            Join a Room
          </Button>
          <Button color="secondary" href="/create">
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  async function componentDidMount() {
    fetch("/api/user-in-room")
      .then((_res) => _res.json())
      .then((data) => {
        setRoomCode(data.code);
        console.log("Happend");
      });
  }

  /*https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks*/
  useEffect(() => {
    componentDidMount();
  }, [roomCode]);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            roomCode ? (
              <Navigate to={`/room/${roomCode}`} replace />
            ) : (
              <RenderHomePage />
            )
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
        {/* By default, Router passes props to the component that tell us how we accessed it. Match() tells us how router matched the component with the URL we named  */}
      </Routes>
    </Router>
  );
}
export default HomePage;
