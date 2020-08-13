import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component, useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CardContent,
} from "@material-ui/core";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Card,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import FormContactoH from "./FormContactoH";
import FormTurnos from "./FormTurnos";
import TurnoConfirmado from "./TurnoConfirmado";
import Disclaimer from "./Disclaimer";
import { getTipoCaja } from "../api";
import { setCajaValues } from "./features/contacto/cajaSlice";
import { resetUserValues, setUserValues } from "./features/contacto/userSlice";
import { resetTurnoValues } from "./features/contacto/turnoSlice";
import { resetTurnoConfirmadoValues } from "./features/contacto/turnoConfirmadoSlice";
import { resetCajaValues } from "./features/contacto/cajaSlice";
import { resetDisclaimer } from "./features/contacto/disclaimerSlice";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Datos de contacto",
    "Tipo de tramite",
    "Confirmar Terminos",
    "Oficina Comercial",
  ];
}

function getStepContent(step, disclaimer, userStep) {
  switch (step) {
    case 0:
      return <FormContactoH />;
    case 1:
      return (userStep && <SelectTipo />) || "Complete información de contacto";
    case 2:
      return (userStep && <Disclaimer />) || "Complete el paso anterior";
    case 3:
      return (disclaimer && <FormTurnos />) || "Confirme los términos";
    case 4:
      return <TurnoConfirmado />;
    default:
      return "Unknown step";
  }
}
const SelectTipo = () => {
  const [tipo, setTipo] = React.useState("");
  const [tipoDecajas, setTipoDecajas] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setTipo(event.target.value);
    dispatch(setCajaValues(event.target.value));
  };

  async function getTipoCajaFunc() {
    const res = await getTipoCaja();
    setTipoDecajas(res.data);
  }

  useEffect(() => {
    try {
      getTipoCajaFunc();
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <FormControl>
      <InputLabel>Seleccionar</InputLabel>
      <Select value={tipo} onChange={handleChange} style={{ minWidth: 150 }}>
        {tipoDecajas &&
          tipoDecajas.map((tipo) => (
            <MenuItem key={`tipo_${tipo.id}`} value={tipo.id}>
              {tipo.nombre}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default function FrontHorizontal() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleCancel = () => {
    swal({
      title: "Cancelar Operacion",
      text: "¿Esta seguro que desea salir de esta operacion?",
      icon: "warning",
      buttons: ["No", "Si"],
      dangerMode: true,
    }).then((isCanceled) => {
      if (isCanceled) {
        handleReset();
        window.location.reload();
      }
    });
  };
  const disclaimerStep = useSelector((state) => state.disclaimer.isConfirmed);
  const userStep = useSelector((state) => state.user.submitted);
  const tipoCajaStep = useSelector((state) => state.caja.submitted);
  const turnoConfirmado = useSelector(
    (state) => state.turnoConfirmado.submitted
  );
  const checkStep = (step) => {
    if (step === 0 && !userStep) {
      return true;
    } else if (step === 1 && !tipoCajaStep) {
      return true;
    } else if (step === 2 && !disclaimerStep) {
      return true;
    } else if (step === 3 && !turnoConfirmado) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
    <Container fixed>
      <div className={classes.root}>
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <img
            src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
            alt="aysa logo"
          />
        </div>
        <Divider />
        <h1>Reservá tu turno para ir al Centro de Atención</h1>
        <Divider />
        <Stepper
          activeStep={activeStep}
          orientation="horinzal"
          style={{ marginTop: "2%", marginBottom: "2%", width: "100%" }}
        >
          {steps.map((label, index) => (
              <div>
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              </Step>  
              <Divider />
                <div>{getStepContent(index,disclaimerStep, userStep)}</div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleCancel}
                      className={classes.button}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      disabled={checkStep(activeStep)}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
                </div>
            
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TurnoConfirmado />
            </div>
            <p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleReset}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Solicitar nuevo turno
                </Button>
              </div>
            </p>
          </Paper>
        )}
      </div>
    </Container>
  </div>
  );
}
