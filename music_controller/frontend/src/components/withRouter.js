import React, { Component } from "react";

//this is a hotfix to solve
//TypeError: Cannot read properties of underfined (reading 'push') at eval (CreateRoomPage.js)
//useNavigate hook replaces useHistory

//OTHERWISE
//one can use { withRouter } from 'react-router-dom'; and wrap a component with it like withRouter(comp).
//comp then has access to this.props.history (if it did not before)
//inside comp. we then can redirect, hence the name withRouter

import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />; //three dots is spread notations
  };

  return Wrapper;
};
