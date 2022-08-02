import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"; //is container which aligns things vertically or horizontally
import Typography from "@material-ui/core/Typography"; //is just a nice header
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl"; //best-practice to use this as a wrapper on own input components for accessibilty reasons
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel"; //wrapper used to give a label to a component which has none per default, like <Radio />
import { withRouter } from "./withRouter";

class CreateRoomPage extends Component {
  defaul_vites = 2;
  constructor(props) {
    super(props);
    //whenevere the state elements are changed, the component will be updated
    this.state = { guestCanPause: true, votesToSkip: this.defaultVotes };
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
        this.props.navigate("/room/" + data.code);
      });
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
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
              defaultValue={this.defaultVotes}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
            />
            <FormHelperText>
              <div align="center">Votes required to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
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
    ); //spacing input multiplied by 8 equals space between items in pixels
  }
}
export default withRouter(CreateRoomPage);
