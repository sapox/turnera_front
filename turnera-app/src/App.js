import React from "react";
import FormContacto from './components/FormContacto';
import FormTurnos from './components/FormTurnos';
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import { Card, TextField } from "@material-ui/core";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

function getType() {
  return ["Tipo A", "Tipo B"];
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

const FormSucursal = () => {
  const [tipoDni, setTipoDni] = React.useState("");

  const handleChange = event => {
    setTipoDni(event.target.value);
  };

  return (
    <FormControl>
      <FormControl style={{ maxWidth: 200 }}>
        <InputLabel>Tipo de Dni</InputLabel>
        <Select value={tipoDni} onChange={handleChange}>
          <MenuItem value="LE">LE</MenuItem>
          <MenuItem value="DNI">DNI</MenuItem>
        </Select>
        <TextField
          label="Nro Documento"
          type="number"
          helperText="Ingrese el nro sin puntos"
        />
      </FormControl>
      <TextField placeholder="Nombre" label="Nombre" />
      <TextField placeholder="Apellido" label="Apellido" />
    </FormControl>
  );
};

const SelectTipo = () => {
  const [tipo, setTipo] = React.useState("");
  const tipos = getType();

  const handleChange = event => {
    setTipo(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Seleccionar</InputLabel>
      <Select value={tipo} onChange={handleChange} style={{ minWidth: 150 }}>
        {tipos.map(tipo => (
          <MenuItem key={`tipo_${tipo}`} value={tipo}>{tipo}</MenuItem>
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
