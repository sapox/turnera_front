import React from "react";
import { Button, Paper, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Header from "./Header";
export const BackOfficeLoguado = (props) => {
  const Style = {
    turno: {
      color: "gray",
    },
    h1: {
      color: "white",
      backgroundColor: "dodgerblue",
      padding: "10px",
    },
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const title = "Buscar Turno";
  const welcome = "Bienvenido !";
  const button = (
    <Link to="/backOffice" style={{ textDecoration: 'none' }}>
    <Button variant="contained" color="secondary" >
      Log Out
    </Button>
    </Link>
  );

  function getLogin (){
      
  }

  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button={button} />
        </div>

        <Grid container spacing={6}>
          <Grid item xs style={{ padding: "80px" }}>
            <Paper className={classes.paper}>
              <div className={classes.root}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Paper style={Style.turno}>
                      <h2>Turnos</h2>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="light"
                      >
                        Nuevo Turno
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Link to="/buscarTurno" style={{ textDecoration: 'none' }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="light"
                      >
                        Buscar Turno
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
};

export default BackOfficeLoguado;