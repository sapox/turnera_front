import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {TextField, Button, Input} from "@material-ui/core";
import img from "./features/contacto/img.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as authActions from "../redux/authActions";

export const FormLogin = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validation = Yup.object({
    email: Yup.string().email("Coloque un email válido").required(" requerido"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("requerido"),
  });

  const apiLogIn = () => {
    const body = {
      username,
      password
    };
    props.actions
        .postLogin(body)
        .then((response) => {
          props.history.push('/');
        })
        .catch((error) => {
          if (error.response) {
          }
        });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: apiLogIn,
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

  return (
    <div>
      <Container fixed>
        <div>
          <img
            src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
            alt="aysa logo"
          />
        </div>
        <div>
          <h2 style={Style.h1}> BackOffice Turno</h2>
        </div>
        <div>
          <img style={{ width: "100%" }} src={img} alt="foto" />
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="light"
                    >
                      Buscar Turno
                    </Button>
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      value={formik.values.email}
                      helperText={formik.errors.email}
                      error={formik.errors.email}
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
};

FormLogin.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({}))
  },
  dispatch: () => {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body))
    }
  };
};

export default connect(null, mapDispatchToProps)(FormLogin);
