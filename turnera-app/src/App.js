import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepContent, CardContent, Typography } from "@material-ui/core";
import { MenuItem, Select, FormControl, InputLabel, Button, Paper, Card} from "@material-ui/core";
import FormContacto from './components/FormContacto';
import FormTurnos from './components/FormTurnos';
import { getTipoCaja } from './api';
import { useSelector, useDispatch } from 'react-redux';
import { setCajaValues } from './components/features/contacto/cajaSlice';

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
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  cardContainer: {
    maxWidth: 500
  }
}));

function getSteps() {
  return ["Tipo de tramite", "Sucursal", "Datos de contacto", "Confirmar turno"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectTipo />;
    case 1:
      return <FormTurnos />;
    case 2:
      return <FormContacto />;
    case 3:
      return 'Presentar información del turno';
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

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card className={classes.cardContainer} style={{ marginTop:'30px' }}>
      <div className={classes.root}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
            alt="aysa logo"
          />
        </div>

        <CardContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>{getStepContent(index)}</div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Volver
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1
                          ? "Finish"
                          : "Siguiente"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>

        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              Todos los pasos completados, este es tu turno
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Card>
    </div>
    
  );
}
