import React, { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { getSucursales } from "./../api";
import Header from "./Header";

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
  const [oficina, setOficina] = useState(false);
  const [openFecha, setOpenFecha] = useState(false);
  const [openTipoTramite, setOpenTipoTramite] = useState(false);
  const [open, setOpen] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setOficina(event.target.value);
  };

  const handleOpen = (value) => {
    if (value === "oficina") {
      setOpen(!open);
    } else if (value === "fecha") {
      setOpenFecha(!openFecha);
    } else if (value === "tipoTramite") {
      setOpenTipoTramite(!openTipoTramite);
    }
  };

  async function getSucursalesFunc() {
    const res = await getSucursales();
    setSucursales(res.data);
  }

  useEffect(() => {
    try {
      getSucursalesFunc();
    } catch (err) {
      setError(err);
    }
  }, []);

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
                name="oficinaId"
                onChange={handleChange}
                value={oficina}
              >
                {sucursales &&
                  sucursales.map((sucursal) => (
                    <MenuItem
                      key={`sucursal_${sucursal.id}`}
                      value={sucursal.id}
                    >
                      {sucursal.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Tipo Tramite
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="TramiteId"
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
