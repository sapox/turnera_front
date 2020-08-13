import React, { Fragment, useState, useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { Card, CardContent, Button } from "@material-ui/core";
import { useReactToPrint } from 'react-to-print';
import ErrorIcon from '@material-ui/icons/Error';
import PrintIcon from '@material-ui/icons/Print';
import { QRCode } from "react-qr-svg";
import { Link } from 'react-router-dom';
import * as QueryString from "query-string";
import { getTurnoConfirmado } from './../api';

const useStyles = makeStyles(theme => ({
  printButton: {
    marginTop: theme.spacing(1),
    color: "white",
    background: '#009bdb',
    '&:hover': {
       background: '#009bdb',
    },
  },
}));

const TurnoConfirmado = () => {

  const [ turnoConfirmado, setTurnoConfirmado ] = useState([]);
  const [ error, setError ] = useState('');

  const classes = useStyles();
  const baseUrl = window.location.host;
  const userDni = useSelector((state) => state.user.dni);
  const turnoId = useSelector((state) => state.turnoConfirmado.idTurno);

  async function getTurnoConfirmadoFunc(userDni, turnoId) {
    try{
      const res = await getTurnoConfirmado(userDni, turnoId);
      setTurnoConfirmado(res.data);
    } catch(e){
      setError(e);
    }
     
  }
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: () => "@page { size: A4 portrait;} @page {margin-left: 256;}",
    content: () => componentRef.current,
  });

  useEffect(() => {
    const params = QueryString.parse(window.location.search);
    const { userDni: userDniParams, turnoId: turnoIdParams } = params;
    if(JSON.stringify(params) === "{}"){
      getTurnoConfirmadoFunc(userDni, turnoId);
    } else {
      getTurnoConfirmadoFunc(userDniParams, turnoIdParams);
    }
    
  }, [userDni, turnoId]);

  const { cliente, caja, fecha, hora, sucursal } = turnoConfirmado;
  
  return (
    <Card style={{maxWidth: '250px', justifyContent: "center"}} ref={componentRef}>
      
      <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column'}}>
        <div style={{ alignSelf: 'center'}}>
          <img
            src="https://www.aysa.com.ar/assets/Menu/img/logo.png"
            alt="aysa logo"
          
          />
        </div>
        <Card >
        <CardContent >
          {turnoConfirmado ? (
            <Fragment>
              <h2 style={{fontFamily: "Roboto"}}>Turno Confirmado</h2>
              {cliente &&
              <p style={{fontFamily: "Roboto"}}>{`Se ha enviado la confirmación del turno a su correo electrónico ${cliente.email}`}.</p>
              }
              <Link to={`/turno_confirmado?turnoId=${turnoId}&userDni=${userDni}`}>
                <QRCode 
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ maxWidth: 256 }}
                  value={`${baseUrl}/turno_confirmado?turnoId=${turnoId}&userDni=${userDni}`}
                />
              </Link>
              {cliente && 
                <Fragment>
                <p style={{fontFamily: "Roboto"}}><b>Nombre: </b>{`${cliente.nombre} ${cliente.apellido}`}</p>
                <p style={{fontFamily: "Roboto"}}><b>DNI: </b> {`${cliente.dni}`}</p>
                <p style={{fontFamily: "Roboto"}}><b>Fecha: </b> {`${fecha}`}</p>
                <p style={{fontFamily: "Roboto"}}><b>Hora: </b> {`${hora}`}</p>
                <p style={{fontFamily: "Roboto"}}><b>Tipo de tramite:</b> {caja.tipo.nombre}</p>
                <p style={{fontFamily: "Roboto"}}><b>Centro de Atención:</b> {sucursal.nombre} - {sucursal.direccion}, {sucursal.distrito.localidad.nombre}</p>
                <p style={{textAlign: 'justify', fontFamily: "Roboto"}}><b>Importante: </b>No olvides traer tu DNI y recordá que este comprobante te servirá para circular en la calle desde tu domicilio hasta la oficina comercial, así como para ser atendido.</p>
                <div  style={{ display: 'flex', justifyContent: 'center'}}>
                  <Button 
                    variant="contained" 
                    className={classes.printButton}
                    onClick={handlePrint}
                    startIcon={<PrintIcon />}
                    >
                      Imprimir turno
                  </Button>
                </div>
              </Fragment> 
              }
              
            </Fragment>
          ) : (
            <Fragment>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ErrorIcon fontSize="large" />
                <h2>No pudimos obtener tu turno</h2>
              </div>
            </Fragment>
          )}
       
          
        </CardContent>
      </Card>
      </div>
      
    </Card>
  );
};

export default TurnoConfirmado;
