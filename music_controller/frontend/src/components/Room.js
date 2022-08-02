import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

//thid is the main page of our application

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  const getRoomDetaills = () => {
    fetch("/api/get-room" + "?code=" + roomCode) //it is important to start the fetch with  "/" here, otherwise we end up at /Room/api which we have not set up
      .then((_res) => _res.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };
  getRoomDetaills();
  return (
    <div>
      <h1>ANYTHING</h1>
      <h3>{roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {String(guestCanPause)}</p>
      <p>Host: {String(isHost)}</p>
    </div>
  );
}

export default Room;
