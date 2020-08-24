import React from "react";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import SingleLogInForm from "./SingleLogInForm";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";

const FormLogin = (props) => {
  
  const title = null;
  const welcome = null;
  const button = null;

  const loginButton = (
    <Link to="/buscarTurno" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" >
        <Typography
            variant="p"
            style={{
              fontSize: "16pt",
              textTransform: "none",
              fontFamily: "Roboto",
            }}
          >
            Sign in
          </Typography>
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