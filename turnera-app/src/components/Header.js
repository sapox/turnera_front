import React from "react";
import { withRouter } from "react-router-dom";
import img from "./features/contacto/img.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";

function Header(props) {
  const Style = {
    turno: {
      color: "gray",
    },
    h1: {
      color: "white",
      backgroundColor: "dodgerblue",
      padding: "10px",
      marginTop: "10px",
      marginBottom: "10px",
    },
  };

  const title = null;
  const welcome = null;
  const apiLogOut = null;
  const button = null;
  return (
    <div>
      <Container fixed>
        <div style={{ marginTop: "10px" }}>
          <Grid container spacing={6}>
            <Grid item xs>
              <div>
                <img
                  src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
                  alt="aysa logo"
                />
              </div>
            </Grid>
            <Grid item xs>
              <div style={{ marginLeft: "70%" }}>
              <div><h4>{props.welcome || welcome}</h4></div>  
              <div> {props.button || button}</div>  
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={Style.h1}>
          <Grid container spacing={6}>
            <Grid item xs>
              <h2> BackOffice Turno </h2>
            </Grid>
            <Grid item xs>
              <h2 style={{ marginLeft: "70%" }}>{props.title || title}</h2>
            </Grid>
          </Grid>
        </div>
        <div>
          <img style={{ width: "100%" }} src={img} alt="foto" />
        </div>
      </Container>
    </div>
  );
}
export default withRouter(Header);
