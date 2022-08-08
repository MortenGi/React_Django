import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { withRouter } from "./withRouter";

function RoomJoinPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          props.navigate(`/Room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          Join a Room
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={false}
            label="Code"
            placeholder="Enter a Room Code"
            defaultValue={roomCode}
            helperText={error}
            variant="outlined"
            onChange={(inp) => {
              setRoomCode(inp.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" href="/">
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(RoomJoinPage);
