import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Paper, FormControlLabel, Checkbox, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { setUserLoginValues } from './features/contacto/userLoginSlice';

import Header from "./Header";
import BuscarTurno from "./BuscarTurno";

const validation = Yup.object({
  user: Yup.string()
    .min(5, "User must be at least 5 characters")
    .required("requerido"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("requerido"),
});

const apiLogIn = () => {};

const FormLogin = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: values => {
      dispatch(setUserLoginValues(values));
    },
  });

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
  const title = null ;
  const welcome = null;
  const button = null

  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button ={button}/>
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
                    <Link to="/">
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
                    <Link to="/buscarTurno">
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
          <Grid item xs>
            <Paper className={classes.paper}>
              <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="user"
                      label="User Name"
                      name="user"
                      autoComplete="user"
                      autoFocus
                      onChange={formik.handleChange}
                      value={formik.values.user}
                      helperText={formik.errors.user}
                      error={formik.errors.user}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      helperText={formik.errors.password}
                      error={formik.errors.password}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={apiLogIn}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
                <Box mt={8}></Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default withRouter(FormLogin);
