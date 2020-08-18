
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";

import {
  FormControl,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch } from "react-redux";
import { setUserValues } from "./features/contacto/userSlice";
import $, { param } from "jquery";
import service from "./features/contacto/service.png";
import {
  createMuiTheme,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";


const Style = {
	c: {
	  fontFamily: "Roboto",
	  textTransform: "none",
	  color: "#0055a6",
	  fontSize: "8pt",
	  fontWeight: "bold",
	},
	d: {
	  fontFamily: "Roboto",
	  fontWeight: "bold",
	  textTransform: "none",
	  color: "#009bdb",
	  fontSize: "9pt",
	},
	button: {
	  color: "white",
	  background: "#0055a6",
	  "&:hover": {
		background: "#0055a6",
	  },
	},
  };

const validation = Yup.object({
  dni: Yup.string("Ingrese dni")
    .min(8, "Debe contener 8 caracteres o más")
    .required("requerido"),
  nombre: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
  apellido: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
  email: Yup.string()
	.email("Coloque un email válido")
	.required("requerido"),
  confirmarEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Debe coincidir con el email ingresado")
    .email("Coloque un email válido")
    .required("requerido"),
  codArea: Yup.string()
    .min(2, "Debe contener 2 caracteres o mas")
    .max(4, "Debe contener 4 caracteres o menos")
    .required("requerido"),
  telefono: Yup.string()
    .min(5, "Debe contener 5 caracteres o mas")
    .max(8, "Debe contener 8 caracteres o menos")
    .required("requerido"),
  cuentaContrato: Yup.string()
    .max(12, "Debe contener 12 caracteres o menos")
    .notRequired(),
  titularCuenta: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .notRequired(),
});

const FormContacto = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [habilitado, setHabilitado] = useState(false);
  const formik = useFormik({
    initialValues: {
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      confirmarEmail: "",
      codArea: "",
      telefono: "",
      cuentaContrato: "",
      titularCuenta: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      dispatch(setUserValues(values));
      dispatch(deshabilitar());
    },
  });

  const disablePaste = (id) =>
    $(id).bind("paste", function () {
      return false;
    });

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const deshabilitar = () => {
    setHabilitado(!habilitado);
  };

  const show = () => {
    setShowT(true);
  };

  const hide = () => {
    setShowT(false);
  };

  useEffect(() => {
    try {
      disablePaste("#confirmarEmail");
    } catch (err) {
      setError(err);
    }
  }, []);

  const [showT, setShowT] = React.useState(false);
  const Titular = () => {
    return (
      <div id="titular">
        <TextField
          placeholder="Titular de la Cuenta"
          label="Titular de la Cuenta"
          id="titularCuenta"
          name="titularCuenta"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.titularCuenta}
          helperText={formik.errors.titularCuenta}
          error={formik.errors.titularCuenta}
        />
      </div>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl style={{ width: "100%" }}>
        <Grid container>
          <Grid item xs>
            <TextField
			  placeholder= "Número"
              label="N° de Documento"
              id="dni"
              name="dni"
			  type="number"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.dni}
              helperText={
                formik.errors.dni || (
                  <Typography variant="p" style={Style.c}>
                    *Campo requerido
                  </Typography>
                )
              }
              error={formik.errors.dni}
            />
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Nombre/s"
              label="Nombre/s"
              id="nombre"
              name="nombre"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.nombre}
              helperText={
                formik.errors.nombre || (
                  <Typography variant="p" style={Style.c}>
                    *Campo requerido
                  </Typography>
                )
              }
              error={formik.errors.nombre}
            />
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Apellido/s"
              label="Apellido/s"
              id="apellido"
              name="apellido"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.apellido}
              helperText={
                formik.errors.apellido || (
                  <Typography variant="p" style={Style.c}>
                    *Campo requerido
                  </Typography>
                )
              }
              error={formik.errors.apellido}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <TextField
              placeholder="E-mail"
              label="E-mail"
              id="email"
              name="email"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={
                formik.errors.email || (
                  <Typography variant="p" style={Style.c}>
                    *Campo requerido
                  </Typography>
                )
              }
              error={formik.errors.email}
            />
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Confirmar e-mail"
              label="Confirmar e-mail"
              id="confirmarEmail"
              name="confirmarEmail"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.confirmarEmail}
              helperText={
                formik.errors.confirmarEmail || (
                  <Typography variant="p" style={Style.c}>
                    *Campo requerido
                  </Typography>
                )
              }
              error={formik.errors.confirmarEmail}
            />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <TextField
              type="codArea"
              placeholder="Ej: 11"
              label="Código de área"
              id="codArea"
              name="codArea"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.codArea}
              helperText={
                formik.errors.codArea || (
                  <Typography variant="p" style={Style.c}>
                    *Ingrese código de área sin el 0
                  </Typography>
                )
              }
              error={formik.errors.codArea}
            />
          </Grid>
          <Grid item xs>
            <TextField
              value="rigth"
              type="number"
              placeholder="Ej: 12345678"
              label="Teléfono"
              id="telefono"
              name="telefono"
              disabled={habilitado}
              onChange={formik.handleChange}
              value={formik.values.telefono}
              helperText={
                formik.errors.telefono || (
                  <Typography variant="p" style={Style.c}>
                    *Ingrese el número sin el 15
                  </Typography>
                )
              }
              error={formik.errors.telefono}
            />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container>
          	<Grid item xs >
                <TextField  
                  placeholder="0123456789"
                  label="Cuenta de Servicios"
                  id="cuentaContrato"
                  name="cuentaContrato"
                  disabled={habilitado}
                  onChange={formik.handleChange}
                  value={formik.values.cuentaContrato}
                  helperText={formik.errors.cuentaContrato}
                  error={formik.errors.cuentaContrato}
                />
                <div>
                  <Button
                    onClick={handleToggle}
                    style={{ height: "3px", marginTop: "0%" }}
                  >
                    <Typography variant="p" style={Style.d}>
                      ¿Dónde lo encuentro?
                    </Typography>
                  </Button>
                  <div>
                    <Zoom in={toggle}>
                      <Paper>
                        {toggle && (
                          <img
                            id="service"
                            style={{ width: 350, height: 150 }}
                            src={service}
                          ></img>
                        )}
                      </Paper>
                    </Zoom>
                  </div>
                </div>
            </Grid>
        <Grid item xs /*style={{width:'150%}}*/>
            <div style={{ marginTop: "4%", display: "flex" }}>
			<p style={{ alignSelf: "flex-end", fontSize: '12pt' }}><b>Titular de la cuenta</b></p>
              <RadioGroup
                style={{ marginTop: "0%", marginLeft: "3%" }}
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="Si"
                  disabled={habilitado}
                  control={<Radio color="primary" onChange={hide} />}
                  label="Si"
                  labelPlacement="Si"
                />
                <FormControlLabel
                  value="No"
                  disabled={habilitado}
                  control={<Radio color="primary" onChange={show} />}
                  label="No"
                  labelPlacement="No"
                />
              </RadioGroup>
            </div>
          </Grid>
          <Grid item xs>
            {showT ? <Titular /> : null}
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{ marginTop: "1%", alignSelf: "center", marginRight: "10%" }}
          >
            <Button
              disabled={habilitado}
              type="submit"
              variant="contained"
              style={Style.button}
            >
              Confirmar Datos
            </Button>
          </div>
        </div>
      </FormControl>
    </form>
  );
};

export default FormContacto;
