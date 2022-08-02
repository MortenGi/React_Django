import React, { Component } from "react";

//this is a hotfix to solve
//TypeError: Cannot read properties of underfined (reading 'push') at eval (CreateRoomPage.js)
//TODO look this up

import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
