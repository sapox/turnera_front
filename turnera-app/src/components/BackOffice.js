import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import img from "./features/contacto/img.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Header from "./Header";
import BuscarTurno from "./BuscarTurno";
import SingleLogInForm from "./SingleLogInForm";
export const BackOffice = (props) => {
  const Style = {
    turno: {
      color: "#b7b7b7",
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
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const title = null;
  const welcome = null;
  const button = null;

  function getLogin() {}

  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button={button} />
        </div>

        <Grid container spacing={6}>
          <Grid item xs style={{ marginTop: "5%", marginLeft: "3%" }}>
            <Paper className={classes.paper}>
              <div className={classes.root}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Paper style={Style.turno}>
                    <Typography variant="h2" style={{ fontSize: "17pt" ,textTransform: "none"}}>
                         Turnos
                        </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: '1%'}}>
                  <Grid item xs>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="light"
                      >
                        <Typography variant="p" style={{ fontSize: "16pt",textTransform: "none" }}>
                          Nuevo Turno
                        </Typography>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="light"
                        
                      >
                       <Typography variant="p" style={{ fontSize: "16pt" ,textTransform: "none"}}>
                         Buscar Turno
                        </Typography>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Grid item xs style={{ marginTop: "5%" }}>
            <SingleLogInForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BackOffice;
