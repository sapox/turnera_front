import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { withRouter, Link } from "react-router-dom";
import Header from "./Header";
import TablaResultados from "./TablaResultados";
import {
  getSucursales,
  getTipoCaja,
  getFeriados,
  getTurnosByFecha_Caja_Sucursal,
} from "../api";
import {createMuiTheme ,responsiveFontSizes, ThemeProvider, Typography} from "@material-ui/core";
function BuscarTurno(props) {

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  const apiLogOut = () => {};
  const title = "Buscar Turno";
  const welcome = "Bienvenido !";
  const button = (
    <Link to="/backOffice" style={{ textDecoration: "none" }}>
      <Button variant="contained" color="secondary">
        Log Out
      </Button>
    </Link>
  );

  const useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      width: "50%",
      marginLeft: "10%",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 480,
    },
  }));
  const classes = useStyles();
  const [oficina, setOficina] = useState(false);
  const [openFecha, setOpenFecha] = useState(false);
  const [openTipoTramite, setOpenTipoTramite] = useState(false);
  const [open, setOpen] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [error, setError] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [tipoDecajas, setTipoDecajas] = useState([]);

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

  async function getTurnosFunc(fecha, sucursal, tipoCaja) {
    //const auxFecha = formatISO(new Date(`${fecha}`), {representation: 'date' });
    const res = await getTurnosByFecha_Caja_Sucursal(fecha, sucursal, tipoCaja);
    setTurnos(res.data);
  }

  async function getTipoCajaFunc() {
    const res = await getTipoCaja();
    setTipoDecajas(res.data);
  }

  async function getSucursalesFunc() {
    const res = await getSucursales();
    setSucursales(res.data);
  }

  useEffect(() => {
    try {
      getFeriadosFunc();
      getTipoCajaFunc();
      getSucursalesFunc();
      getTurnosFunc();
    } catch (err) {
      setError(err);
    }
  }, []);

  const validation = Yup.object({
    sucursalId: Yup.string("Ingrese dni").required("requerido"),
    fecha: Yup.string().required("requerido"),
  });

  const formik = useFormik({
    initialValues: {
      sucursalId: "",
      fecha: "",
      tramiteId: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      const { sucursalId, fecha, tramiteId } = values;

      //getTurnosFunc(sucursalId, fecha ,tramiteId);
    },
  });

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => {
    setShowResults(true);
    setShowButton(!showButton);
  };

  const [feriados, setFeriados] = useState([]);

  async function getFeriadosFunc() {
    const res = await getFeriados();
    setFeriados(res.data);
  }

  function populateFeriados(feriados) {
    const feriadoData = [];
    if (feriados) {
      for (let a = 0; a < feriados.length; a++) {
        const day = feriados[a].fecha.replace(/-/g, "/");
        feriadoData.push(new Date(day));
      }
    }
    return feriadoData;
  }
  const [showButton, setShowButton] = useState(true);
  return (
    <div>
      <Container fixed>
        <div>
          <Header title={title} welcome={welcome} button={button} />
        </div>

        <div>
          <div style={{ marginTop: "70px", marginLeft: "20%" }}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo Tramite ( opcional)</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="tramiteId"
                  name="tramiteId"
                  value={formik.values.tramiteId}
                  onChange={formik.handleChange}
                >
                  {tipoDecajas &&
                    tipoDecajas.map((tipo) => (
                      <MenuItem key={`tipo_${tipo.id}`} value={tipo.id}>
                        {tipo.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Oficina comercial (obligatorio)</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="sucursalId"
                  name="sucursalId"
                  value={formik.values.sucursalId}
                  onChange={formik.handleChange}
                  helperText={formik.errors.sucursalId || "*Campo requerido"}
                  error={formik.errors.sucursalId}
                >
                  {sucursales &&
                    sucursales.map((sucursal) => (
                      <MenuItem
                        key={`sucursal_${sucursal.id}`}
                        value={sucursal.id}
                      >
                        {sucursal.nombre}  -
                  <p style={{ fontSize: 13 }}>{sucursal.direccion}</p>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <div
                style={{ marginTop: "30px", width: "100%", marginLeft: "10%" }}
              >
                <InputLabel>fecha (obligatorio)</InputLabel>
                <FormControl>
                  <TextField
                    className={classes.textField}
                    id="fecha"
                    type="date"
                    value={formik.values.fecha}
                    selected={formik.values.fecha}
                    onChange={formik.handleChange}
                    helperText={formik.errors.fecha}
                    error={formik.errors.fecha}
                    excludeDates={populateFeriados(feriados)}
                  />
                </FormControl>
              </div>
              {showButton && (
                <div>
                  <Button
                    style={{
                      marginTop: "30px",
                      width: "30%",
                      marginLeft: "20%",
                      marginBottom: "30px",
                    }}
                    id="buttom"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                  >
                    Buscar
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div
          style={{
            marginBottom: "80px",
          }}
        >
          <Container
            fixed
            style={{
              marginTop: "80px",
            }}
          >
            {showResults ? <TablaResultados params={formik.values} /> : null}
          </Container>
        </div>
      </Container>
    </div>
  );
}
export default withRouter(BuscarTurno);
