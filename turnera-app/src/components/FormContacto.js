import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";

import {
  FormControl,
  TextField,
  Button,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch } from "react-redux";
import { setUserValues } from "./features/contacto/userSlice";
import $ from "jquery";
import service from "./features/contacto/service.png";
import { Typography } from "@material-ui/core";

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
    fontFamily: "Roboto",
    background: "#0055a6",
    "&:hover": {
      background: "#0055a6",
    },
  },
};

const validation = Yup.object().shape({
  dni: Yup.string("Ingrese dni")
    .min(8, "Debe contener 8 caracteres o más")
    .required("requerido"),
  nombre: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
  apellido: Yup.string()
    //.typeError("the message")
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
  email: Yup.string().email("Coloque un email válido").required("requerido"),
  confirmarEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Debe coincidir con el email ingresado")
    .email("Coloque un email válido")
    .required("requerido"),
  codArea: Yup.string()
    .min(2, "Debe contener 2 caracteres o mas")
    .max(4, "Debe contener 4 caracteres o menos")
    .required("requerido"),

  telefono: Yup.string()
    .when("codArea", {
      is: (value) => value && value.length == 2,
      then: Yup.string().required("debe tener 8 dígitos numéricos")
      .min(8, "debe tener 8 dígitos numéricos")
      .max(8, "debe tener 8 dígitos numéricos"),
    })
    .when("codArea", {
      is: (value) => value && value.length == 3,
      then: Yup.string().required("debe tener 7 dígitos numéricos")
      .min(7, "debe tener 7 dígitos numéricos")
      .max(7, "debe tener 7 dígitos numéricos"),
    })
    .when("codArea", {
      is: (value) => value && value.length == 4,
      then: Yup.string().required("debe tener 6 dígitos numéricos")
      .min(6, "debe tener 6 dígitos numéricos")
      .max(6, "debe tener 6 dígitos numéricos"),
    })
    .when("codArea", {
      is: (value) => value && value.length > 4,
      then: Yup.string().required("codigo de área supera el máximo permitido"),
    })
    .required("requerido"),

  cuentaContrato: Yup.string()
    .max(12, "Debe contener 12 caracteres o menos")
    .notRequired(),
  titularCuenta: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
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
    document.getElementById("titular").style.display = "block";
    formik.values.titularCuenta = document.getElementById(
      "titularCuenta"
    ).value;
  };

  const hide = () => {
    document.getElementById("titular").style.display = "none";
    formik.values.titularCuenta = " ";
  };

  useEffect(() => {
    try {
      setClientWidth(document.documentElement.clientWidth);
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
  const [noCheckBox, setNoCheckBox] = React.useState(false);
  const [siCheckBox, setSiCheckBox] = React.useState(true);
  const [clientWidth , setClientWidth] = React.useState('');
  const marginTop = clientWidth> 400 ? '8%' : '5%' ;
  const checkOnchange = () => {
    setNoCheckBox(!noCheckBox);
    setSiCheckBox(!siCheckBox);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl style={{ width: "100%", marginLeft: "10%" }}>
        <Grid container>
          <Grid item xs>
            <TextField
              placeholder="Número"
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
          <Grid item xs>
            <div  style={{marginTop: marginTop , marginLeft: '2%',minWidth: '300px'}}>
            <form >
              Celular
              <input
              style={{marginLeft: '5%'}}
                type="checkbox"
                name="si"
                id="si"
                checked={siCheckBox}
                value="si"
                onChange={checkOnchange}
              />
              Sí
              <input
                type="checkbox"
                name="no"
                id="no"
                checked={noCheckBox}
                value="no"
                onChange={checkOnchange}
              />
              No
            </form>
            </div>
            
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
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
                style={{ height: "3px", marginTop: "0%", marginBottom: "2%" }}
              >
                <Typography variant="p" style={Style.d}>
                  ¿Dónde lo encuentro?
                </Typography>
              </Button>
              <div>
                <Zoom in={toggle}>
                  <div>
                    {toggle && (
                      <img
                        id="service"
                        style={{ width: "75%", height: "50%" }}
                        src={service}
                      ></img>
                    )}
                  </div>
                </Zoom>
              </div>
            </div>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                {" "}
                <div>
                  <p
                    style={{
                      minWidth: '300px',
                      fontWeight: "bold",
                      fontSize: "10pt",
                      fontFamily: "Roboto",
                      marginLeft: "3%",
                    }}
                  >
                    Titular de la cuenta
                  </p>
                </div>{" "}
                <RadioGroup
                  style={{ marginLeft: "3%", marginTop: "-2%", width: "150%" }}
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="Si"
                    disabled={habilitado}
                    control={<Radio color="primary" onChange={hide} />}
                    label="Sí"
                    labelPlacement="Si"
                  />
                  <FormControlLabel
                    value="No"
                    id="No"
                    disabled={habilitado}
                    control={<Radio color="primary" onChange={show} />}
                    label="No"
                    labelPlacement="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs>
                <div id="titular" style={{ display: "none" }}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginTop: "1%",
              alignSelf: "center",
              marginRight: "20%",
            }}
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
