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
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Header from "./Header";

// no esta terminado 
function BuscarTurno(props) {
  const apiLogOut = () => {};
  const title = "Buscar Turno";
  const welcome = "Bienvenido !";
  const button = (
    <Button variant="contained" color="secondary" onClick={apiLogOut}>
      Log Out
    </Button>
  );

  const useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      width: "80%",
      marginLeft: "10%",
    },
  }));
  const classes = useStyles();
  const [oficina, setOficina] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setOficina(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
      
    setOpen(true);
  };

  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button={button} />
        </div>
        <div>
          <div style={{ marginTop: "70px" }}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Oficina Comercial
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="oficinaId"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={oficina}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Caballito</MenuItem>
                <MenuItem value={20}>Flotres</MenuItem>
                <MenuItem value={30}>Palermo</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Tipo Tramite
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="TramiteId"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={oficina}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>A</MenuItem>
                <MenuItem value={20}>B</MenuItem>
                <MenuItem value={30}>C</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Fecha
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="fechaId"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={oficina}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>A</MenuItem>
                <MenuItem value={20}>B</MenuItem>
                <MenuItem value={30}>C</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginTop: "30px", width: "30%", marginLeft: "35%" }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Buscar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default withRouter(BuscarTurno);
