import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Box, Typography, Container, Paper, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";

const SingleLogInForm = (props) => {
  const validation = Yup.object({
    email: Yup.string()
      .email( <Typography
        variant="p"
        style={{ fontSize: "12pt", textTransform: "none" }}
      >
       Coloque un email válido
      </Typography>)
      .required(
        <Typography
          variant="p"
          style={{ fontSize: "12pt", textTransform: "none" }}
        >
          requerido
        </Typography>
      ),
    password: Yup.string()
      .min(6,  <Typography
        variant="p"
        style={{ fontSize: "12pt", textTransform: "none" }}
      >
       "La contraseña debe tener al menos 6 caracteres"
      </Typography>)
      .required(<Typography
        variant="p"
        style={{ fontSize: "12pt", textTransform: "none" }}
      >
        requerido
      </Typography>),
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
    <Link to="/backOfficeL" style={{ textDecoration: "none" }}>
      <Button size="small" variant="contained" color="primary">
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
        <Grid container spacing={6}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                  <Typography
                    variant="h2"
                    style={{
                      fontSize: "17pt",
                      fontFamily: "Roboto",
                      textTransform: "none",
                      color: "#b7b7b7",
                    }}
                  >
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
                      style={{fontFamily: "Roboto"}}
                      name="email"
                      autoComplete="nope"
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