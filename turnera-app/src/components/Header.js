import React from "react";
import { withRouter } from "react-router-dom";
import img from "./features/contacto/img.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
function Header(props) {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const Style = {
    h1: {
      color: "white",
      backgroundColor: "#009bdb",
      padding: "10px",
      marginTop: "10px",
    },
  };

  const title = null;
  const welcome = null;
  const apiLogOut = null;
  const button = null;
  return (
    <Container fixed>
      <Grid container style={{ marginTop: "1%" }}>
        <Grid item xs>
          <div>
            <img
              src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
              alt="aysa logo"
            />
          </div>
        </Grid>
        <Grid item xs>
          <div style={{marginTop: theme.spacing(1) , display: "flex" , flexDirection:'column'}}>
            <div style={{alignSelf:'flex-end'}}>
              <Typography variant="p">{props.welcome || welcome}</Typography>
            </div >
            <div style={{alignSelf:'flex-end'}}> {props.button || button}</div>
          </div>
        </Grid>
      </Grid>
      <div style={Style.h1}>
        <Grid container spacing={6}>
          <Grid item xs>
            <Typography variant="h5" style={{ marginLeft: "10%" }}>
              BackOffice Turno
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" align='right' style={{marginRight:'10%'}} >
              {props.title || title}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div>
        <img style={{ width: "100%" }} src={img} alt="foto" />
      </div>
    </Container>
  );
}
export default withRouter(Header);
