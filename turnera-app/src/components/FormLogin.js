import React, { useState } from "react";
import {  Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingleLogInForm from "./SingleLogInForm";

import Header from "./Header";

export const FormLogin = (props) => {
  
  const title = null;
  const welcome = null;
  const button = null;

  const loginButton = (
    <Link to="/buscarTurno" style={{ textDecoration: 'none' }}>
    <Button variant="contained" color="primary" >
      sign in
    </Button>
    </Link>
  );

  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button={button} />
        </div>
        <div>
        <SingleLogInForm loginButton={loginButton}/>
        </div>
        
      </Container>
    </div>
  );
};


export default FormLogin;
