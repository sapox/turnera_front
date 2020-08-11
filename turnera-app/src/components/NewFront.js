import Typography from "@material-ui/core/Typography";

import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Card,
} from "@material-ui/core";
import FormContacto from "./FormContacto";
import FormTurnos from "./FormTurnos";
import TurnoConfirmado from "./TurnoConfirmado";
import Disclaimer from "./Disclaimer";
import {
  getSucursales,
  getTipoCaja,
  getFeriados,
  getTurnosByFecha_Caja_Sucursal,
} from "../api";
import { setCajaValues } from "./features/contacto/cajaSlice";
import Divider from "@material-ui/core/Divider";

import { resetUserValues, setUserValues } from "./features/contacto/userSlice";
import { resetTurnoValues } from "./features/contacto/turnoSlice";
import { resetTurnoConfirmadoValues } from "./features/contacto/turnoConfirmadoSlice";
import { resetCajaValues } from "./features/contacto/cajaSlice";
import { resetDisclaimer } from "./features/contacto/disclaimerSlice";
import swal from "sweetalert";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
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
      return <FormContacto />;
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

export default function NewFront() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch();
  const disclaimerStep = useSelector((state) => state.disclaimer.isConfirmed);
  const userStep = useSelector((state) => state.user.submitted);
  const tipoCajaStep = useSelector((state) => state.caja.submitted);
  const turnoConfirmado = useSelector(
    (state) => state.turnoConfirmado.submitted
  );

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetUserValues());
    dispatch(resetCajaValues());
    dispatch(resetDisclaimer());
    dispatch(resetTurnoValues());
    dispatch(resetTurnoConfirmadoValues());
  };

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
          style={{ marginTop: "2%", marginBottom: "2%", width: "100%" }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
              {getStepContent( disclaimerStep, userStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
