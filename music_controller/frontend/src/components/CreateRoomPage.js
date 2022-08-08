import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"; //is container which aligns things vertically or horizontally
import Typography from "@material-ui/core/Typography"; //is just a nice header
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl"; //best-practice to use this as a wrapper on own input components for accessibilty reasons
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel"; //wrapper used to give a label to a component which has none per default, like <Radio />
import { withRouter } from "./withRouter";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

class CreateRoomPage extends Component {
  static defaultProps = {
    voteToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };
  constructor(props) {
    super(props);
    //whenevere the state elements are changed, the component will be updated
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      successMsg: "",
    };
  }

  handleVotesChange = (e) => {
    this.setState({ votesToSkip: e.target.value });
  };
  handleGuestCanPause = (e) => {
    this.setState({ guestCanPause: e.target.value === "true" ? true : false }); //is called an Ternary Operation
  };

  handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };

    fetch("api/add", requestOptions)
      .then((_res) => _res.json())
      .then((data) => {
        this.props.navigate(`/room/${data.code}`);
      });
  };

  handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions).then((_res) => {
      if (_res.ok) {
        this.setState({
          successMsg: "Room updated successfully!",
        });
      } else {
        this.setState({
          errorMsg: "Error updating room...",
        });
      }
      this.props.updateCallback();
    });
  };

  renderCreateButtons = () => {
    return (
      <Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create a room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" href="/">
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room";
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={this.props.guestCanPause.toString()}
              onChange={this.handleGuestCanPause}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              ></FormControlLabel>
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          {" "}
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
            />
            <FormHelperText>
              <div align="center">Votes required to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>

        {this.props.update
          ? this.renderUpdateButtons()
          : this.renderCreateButtons()}
      </Grid>
    ); //spacing input multiplied by 8 equals space between items in pixels
  }
}
export default withRouter(CreateRoomPage);
