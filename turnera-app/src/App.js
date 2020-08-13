import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import { MenuItem, Select, FormControl, InputLabel, Button, Paper }  from "@material-ui/core"; 
import Divider from '@material-ui/core/Divider';
import Container from "@material-ui/core/Container";
import FormContacto from './components/FormContacto';
import FormTurnos from './components/FormTurnos';
import TurnoConfirmado from './components/TurnoConfirmado';
import Disclaimer from './components/Disclaimer';
import { getTipoCaja } from './api';
import { setCajaValues } from './components/features/contacto/cajaSlice';
import { resetUserValues, setUserValues } from './components/features/contacto/userSlice';
import { resetTurnoValues } from './components/features/contacto/turnoSlice';
import { resetTurnoConfirmadoValues } from './components/features/contacto/turnoConfirmadoSlice';
import { resetCajaValues } from './components/features/contacto/cajaSlice';
import { resetDisclaimer } from './components/features/contacto/disclaimerSlice';
import FormLogin from './components/FormLogin'
import swal from 'sweetalert2';
import Header from "./components/Header";
import BuscarTurno from "./components/BuscarTurno";
import BackOffice from "./components/BackOffice";
import SingleLogInForm from "./components/SingleLogInForm";
import BackOfficeLoguado from "./components/BackOfficeLogueado";
import TablaResultados from "./components/TablaResultados";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  button: { 
    marginTop: theme.spacing(1), 
  },
  nextButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    color: "white",
    background: '#009bdb',
    '&:hover': {
       background: '#009bdb',
    },
  },
  newTurnButton: {
    marginTop: theme.spacing(1),    
    color: "white",
    background: '#009bdb',
    '&:hover': {
       background: '#009bdb',
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  cardContainer: {
    maxWidth: 500,
  }
}));

function getSteps() {
  return ["Datos de contacto", "Tipo de tramite", "Confirmar Terminos", "Oficina Comercial"];
}

function getStepContent(step, disclaimer, userStep) {
  switch (step) {
    case 0:
      return <FormContacto />;
    case 1:
      return (userStep && <SelectTipo />) || "Complete información de contacto";
    case 2:
      return (userStep && <Disclaimer />)  || "Complete el paso anterior";
    case 3:
      return (disclaimer && <FormTurnos />)  || "Confirme los términos";
    case 4:
      return <TurnoConfirmado />;
    default:
      return "Unknown step";
  }
}

const SelectTipo = () => {
  const [ tipo, setTipo ] = React.useState("");
  const [ tipoDecajas, setTipoDecajas] = useState([]);
  const [ error, setError ] = useState('');
  
  const dispatch = useDispatch();
  const handleChange = event => {
    setTipo(event.target.value);
    dispatch(setCajaValues(event.target.value));
  };

  async function getTipoCajaFunc() {
    const res = await getTipoCaja();
    setTipoDecajas(res.data);
  }

  useEffect(() => {
		try{
			getTipoCajaFunc();
		} catch(err){
			setError(err);
		}
  }, []);

  return (
    <FormControl>
      <InputLabel>Seleccionar</InputLabel>
      <Select value={tipo} onChange={handleChange} style={{ minWidth: 150 }}>
        {tipoDecajas && tipoDecajas.map(tipo => (
          <MenuItem key={`tipo_${tipo.id}`} value={tipo.id}>{tipo.nombre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

function Home(){
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();

  const disclaimerStep = useSelector((state) => state.disclaimer.isConfirmed);
  const userStep = useSelector((state) => state.user.submitted);
  const tipoCajaStep = useSelector((state) => state.caja.submitted);
  const turnoConfirmado = useSelector((state) => state.turnoConfirmado.submitted);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleCancel = () => {
      swal.fire({
        title: "Cancelar Operacion",
        text: "¿Esta seguro que desea salir de esta operacion?",
        icon: "warning",
        confirmButtonColor: "#009bdb",
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#b7b7b7',
        animation: true
      }).then((result) => {
        if(result.value){
          handleReset();
          window.location.reload();
        }
      });
  }

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetUserValues());
    dispatch(resetCajaValues());
    dispatch(resetDisclaimer());
    dispatch(resetTurnoValues());
    dispatch(resetTurnoConfirmadoValues());
  };

  const checkStep = (step) => {
    if(step === 0 && !userStep){
      return true;
    } else if (step === 1 && !tipoCajaStep){
      return true;
    } else if (step === 2 && !disclaimerStep){
      return true;
    } else if (step === 3 && !turnoConfirmado){
      return true;
    }  else {
      return false;
    }
  }

  return (
    <div>
    <Container fixed>
      <div className={classes.root}>
        <div style={{ marginTop: "2%",marginBottom:'2%'}}>
          <img
            src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
            alt="aysa logo"
          />
        </div>
        <Divider />
        <h1 style={{fontFamily: "roboto"}}>
        Reservá tu turno para ir al Centro de Atención
        </h1>
        <Divider />
        <Stepper activeStep={activeStep} orientation="horinzal" style={{marginTop:'2%',marginBottom:'2%',width:'100%'}}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent style={{width:'100%', display: "flex", justifyContent: "center"}}>
                <div>{getStepContent(index, disclaimerStep, userStep)}</div>
                <div className={classes.actionsContainer}>
                  <div>
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
              </StepContent>
            </Step>
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
                  className={classes.newTurnButton}
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

class App extends Component {
  render() {
    return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}>
          <Home />
        </Route>
        <Route path="/turno_confirmado/" exact component={TurnoConfirmado}>
          <TurnoConfirmado />
        </Route>
        <Route path="/backOffice" exact component={BackOffice}>
          <BackOffice />
        </Route>
        <Route path="/buscarTurno" exact component={BuscarTurno}>
          <BuscarTurno />
        </Route>
        <Route path="/login" exact component={FormLogin}>
          <FormLogin />
        </Route>
        <Route path="/singleLoginForm" exact component={SingleLogInForm}>
          <SingleLogInForm />
        </Route>
        <Route path="/BackOfficeL" exact component={BackOfficeLoguado}>
          <BackOfficeLoguado />
        </Route>
        <Route path="/tabla" exact component={TablaResultados}>
          <TablaResultados />
        </Route>
      </Switch>
    </Router>
    );
  }
}

export default App;