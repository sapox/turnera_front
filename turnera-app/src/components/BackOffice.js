import React from "react";
import { TextField, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Header from "./Header";
import SingleLogInForm from "./SingleLogInForm";

const BackOffice = (props) => {
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
                    <Typography variant="h2" style={{ fontSize: "17pt" ,fontFamily: "Roboto",textTransform: "none"}}>
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
                        <Typography variant="p" style={{ fontSize: "16pt",fontFamily: "Roboto",textTransform: "none" }}>
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
                       <Typography variant="p" style={{ fontSize: "16pt" ,fontFamily: "Roboto",textTransform: "none"}}>
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
