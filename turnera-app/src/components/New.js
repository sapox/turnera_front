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
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import FormContacto from "./FormContacto";
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
import swal from "sweetalert2";
import {
  createMuiTheme,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    marginTop: theme.spacing(1),
    border: "1px solid",
    fontFamily: "Roboto",
  },
  nextButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    fontFamily: "Roboto",
    color: "white",
    background: "#009bdb",
    "&:hover": {
      background: "#009bdb",
    },
  },
  newTurnButton: {
    marginTop: theme.spacing(1),
    fontFamily: "Roboto",
    color: "white",
    background: "#009bdb",
    "&:hover": {
      background: "#009bdb",
    },
  },
  actionsContainer: {
    display: "flex", justifyContent: "center", flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return [
    "Datos de contacto",
    "Tipo de trámite",
    "Confirmar Términos",
    "Centro de Atención",
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
    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column'}}>
    <FormControl style={{marginTop: '3%',
    width: '30%',
    alignSelf: 'center'}}>
      <InputLabel>Tipo de Trámite</InputLabel>
      <Select value={tipo} onChange={handleChange} style={{ minWidth: 150 }}>
        {tipoDecajas &&
          tipoDecajas.map((tipo) => (
            <MenuItem key={`tipo_${tipo.id}`} value={tipo.id}>
              {tipo.nombre}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
    </div>
  );
};

export default function New() {
  const disclaimerStep = useSelector((state) => state.disclaimer.isConfirmed);
  const userStep = useSelector((state) => state.user.submitted);
  const tipoCajaStep = useSelector((state) => state.caja.submitted);
  const turnoConfirmado = useSelector(
    (state) => state.turnoConfirmado.submitted
  );

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const dispatch = useDispatch();

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetUserValues());
    dispatch(resetCajaValues());
    dispatch(resetDisclaimer());
    dispatch(resetTurnoValues());
    dispatch(resetTurnoConfirmadoValues());
  };
  const handleCancel = () => {
    swal
      .fire({
        title: "Cancelar Operación",
        text: "¿Esta seguro que desea salir de esta operación?",
        icon: "warning",
        confirmButtonColor: "#009bdb",
        confirmButtonText: "Sí",
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "#b7b7b7",
        animation: true,
      })
      .then((result) => {
        if (result.value) {
          handleReset();
          window.location.reload();
        }
      });
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
    <div className={classes.root}>
      <div style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "10%" }}>
        <img
          src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
          alt="aysa logo"
        />
      </div>
      <Divider />
      <h1 style={{ fontFamily: "Roboto", marginLeft: "10%" }}>
        Reservá tu turno para ir al Centro de Atención
      </h1>
      <Divider />
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      <div>
        {activeStep === steps.length ? (
          <div >
            <Paper square elevation={0} className={classes.resetContainer}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TurnoConfirmado />
              </div>
              <p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={handleReset}
                    className={classes.newTurnButton}
                    variant="contained"
                    color="primary"
                  >
                    Solicitar nuevo turno
                  </Button>
                </div>
              </p>
            </Paper>
          </div>
        ) : (
          <div >
            <div >{getStepContent(activeStep, disclaimerStep, userStep)}</div>
            <div className={classes.actionsContainer}>
              <div style={{marginTop:'1%',alignSelf: 'center'}}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  className={classes.button}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  className={classes.nextButton}
                  disabled={checkStep(activeStep)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}