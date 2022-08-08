import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { withRouter } from "./withRouter";

//thid is the main page of our application

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  async function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-rom", requestOptions).then((_res) => {
      props.leaveRoomCallBack();
      props.navigate("/");
    });
  }

  async function getRoomDetaills() {
    fetch("/api/get-room" + "?code=" + roomCode) //it is important to start the fetch with  "/" here, otherwise we end up at /Room/api which we have not set up
      .then((_res) => {
        if (!_res.ok) {
          props.leaveRoomCallBack();
          props.navigate("/");
        }
        return _res.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }
  useEffect(() => {
    getRoomDetaills();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(Room);
