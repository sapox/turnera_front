import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Box, Typography, Container, Paper, FormControlLabel, Checkbox } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import BuscarTurno from "./BuscarTurno";

export const SingleLogInForm = (props) => {
  const validation = Yup.object({
    email: Yup.string().email("Coloque un email válido").required(" requerido"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("requerido"),
  });

  const apiLogIn = () => {
    const body = {
      username,
      password,
    };
    props.actions
      .postLogin(body)
      .then((response) => {
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const title = null;
  const welcome = null;
  const button = null;

  const loginButton = (
    <Link to="/backOfficeL" style={{ textDecoration: 'none' }}>
    <Button variant="contained" color="primary" >
      Sign in 
    </Button>
    </Link>
  );
  return (
    <div>
      <Container fixed>
        <Grid container spacing={6}>
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
                      onChange={formik.handleChange}
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
                    <div>{props.loginButton || loginButton}</div>
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
SingleLogInForm.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => {},
};


export default SingleLogInForm;
