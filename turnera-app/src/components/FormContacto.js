import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  TextField,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch } from "react-redux";
import { setUserValues } from "./features/contacto/userSlice";
import $ from "jquery";
import service from "./features/contacto/service.png";
import {
  createMuiTheme,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";

const Style = {
  textField: {
    fontFamily: "Roboto",
    textTransform: "none",
    color: "#4a4a4a",
    fontSize: "16pt",
  },
  v: {
    fontFamily: "Roboto",
    textTransform: "none",
    color: "#0055a6",
    fontSize: "12pt",
  },
};
const validation = Yup.object({
  dni: Yup.string("Ingrese dni")
    .min(
      8,
      <Typography variant="p" style={Style.v}>
        Debe contener 8 caracteres o más
      </Typography>
    )
    .required(
      <Typography variant="p" style={Style.v}>
        requerido
      </Typography>
    ),
  nombre: Yup.string()
    .max(20, "Debe contener 20 caracteres o menos")
    .required("requerido"),
  apellido: Yup.string()
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
    document.getElementById("titular").style.display = "block";
    formik.values.titularCuenta = document.getElementById(
      "titularCuenta"
    ).value;
  };

  const hide = () => {
    document.getElementById("titular").style.display = "none";
    formik.values.titularCuenta = "";
  };

  useEffect(() => {
    try {
      disablePaste("#confirmarEmail");
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl style={{ fontFamily: "Roboto" }}>
        <TextField
          label={
            <Typography variant="p" style={Style.textField}>
              Nro Documento
            </Typography>
          }
          id="dni"
          name="dni"
          type="number"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.dni}
          helperText={formik.errors.dni || "*Campo requerido"}
          error={formik.errors.dni}
        />
        <TextField
          placeholder="Nombre"
          label={
            <Typography variant="p" style={Style.textField}>
              Nombre
            </Typography>
          }
          id="nombre"
          name="nombre"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.nombre}
          helperText={formik.errors.nombre || "*Campo requerido"}
          error={formik.errors.nombre}
        />
        <TextField
          placeholder="Apellido"
          label={
            <Typography variant="p" style={Style.textField}>
              Apellido
            </Typography>
          }
          id="apellido"
          name="apellido"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.apellido}
          helperText={formik.errors.apellido || "*Campo requerido"}
          error={formik.errors.apellido}
        />
        <TextField
          placeholder="Email"
          label={
            <Typography variant="p" style={Style.textField}>
              Email
            </Typography>
          }
          id="email"
          name="email"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.errors.email || "*Campo requerido"}
          error={formik.errors.email}
        />
        <TextField
          placeholder="confirmar Email"
          label={
            <Typography variant="p" style={Style.textField}>
              Confirmar Email
            </Typography>
          }
          id="confirmarEmail"
          name="confirmarEmail"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.confirmarEmail}
          helperText={formik.errors.confirmarEmail || "*Campo requerido"}
          error={formik.errors.confirmarEmail}
        />
        <tr>
          <TextField
            style={{ maxWidth: 75 }}
            type="codArea"
            placeholder="codArea"
            label={
              <Typography variant="p" style={Style.textField}>
                Cod.área
              </Typography>
            }
            id="codArea"
            name="codArea"
            disabled={habilitado}
            onChange={formik.handleChange}
            value={formik.values.codArea}
            helperText={formik.errors.codArea || "*Ingrese Cod. Area sin el 0"}
            error={formik.errors.codArea}
          />
          <TextField
            style={{ maxWidth: 130 }}
            type="number"
            placeholder="Telefono"
            label={
              <Typography variant="p" style={Style.textField}>
                Telefono
              </Typography>
            }
            id="telefono"
            name="telefono"
            disabled={habilitado}
            onChange={formik.handleChange}
            value={formik.values.telefono}
            helperText={
              formik.errors.telefono || "*Ingrese el numero sin el 15"
            }
            error={formik.errors.telefono}
          />
        </tr>
        <TextField
          placeholder="Cuenta Contrato"
          label={
            <Typography variant="p" style={Style.textField}>
              Cuenta De Servicios
            </Typography>
          }
          id="cuentaContrato"
          name="cuentaContrato"
          disabled={habilitado}
          onChange={formik.handleChange}
          value={formik.values.cuentaContrato}
          helperText={formik.errors.cuentaContrato}
          error={formik.errors.cuentaContrato}
        />
        <Button
          onClick={handleToggle}
          style={{ fontSize: "10px", color: "blue" }}
        >
          ¿Donde lo encuentro?
        </Button>
        <Zoom in={toggle}>
          <Paper elevation={4}>
            {toggle && (
              <img
                id="service"
                style={{ width: 350, height: 150 }}
                src={service}
                alt="factura ejemplo"
              ></img>
            )}
          </Paper>
        </Zoom>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="Si"
            disabled={habilitado}
            control={<Radio color="primary" onChange={hide} />}
            label={
              <Typography variant="p" style={Style.textField}>
                Sí
              </Typography>
            }
            labelPlacement="Si"
          />
          <FormControlLabel
            value="No"
            disabled={habilitado}
            control={<Radio color="primary" onChange={show} />}
            label={
              <Typography variant="p" style={Style.textField}>
                No
              </Typography>
            }
            labelPlacement="No"
          />
        </RadioGroup>
        <div id="titular">
          <TextField
            placeholder="Titular de la Cuenta"
            label={
              <Typography variant="p" style={Style.textField}>
                Titular de la cuenta
              </Typography>
            }
            id="titularCuenta"
            name="titularCuenta"
            disabled={habilitado}
            onChange={formik.handleChange}
            value={formik.values.titularCuenta}
            helperText={formik.errors.titularCuenta}
            error={formik.errors.titularCuenta}
          />
        </div>
        <Button
          style={{
            fontSize: "16pt",
            textTransform: "none",
            fontWeight: "bold",
            fontFamily: "Roboto",
            backgroundColor: "#b7b7b7",
          }}
          disabled={habilitado}
          type="submit"
          variant="contained"
        >
          Confirmar Datos
        </Button>
      </FormControl>
    </form>
  );
};

export default FormContacto;
