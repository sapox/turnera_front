import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button } from "@material-ui/core";
import { useReactToPrint } from 'react-to-print';
import ErrorIcon from '@material-ui/icons/Error';
import PrintIcon from '@material-ui/icons/Print';
import { QRCode } from "react-qr-svg";
import { Link } from 'react-router-dom';
import * as QueryString from "query-string";
import { getTurnoConfirmado } from './../api';

const TurnoConfirmado = () => {

  const [ turnoConfirmado, setTurnoConfirmado ] = useState([]);
  const [ error, setError ] = useState('');

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
    <Card style={{ maxWidth: '250px' }} ref={componentRef}>
      
      <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
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
              <h2>Turno Confirmado</h2>
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
                <p>{`${cliente.nombre} ${cliente.apellido}, con documento ${cliente.dni}`}</p>
                <p>{`Turno: ${fecha}, horario: ${hora}`}</p>
                Tipo de caja: {caja.tipo.nombre}
                <p>Oficina Comercial: {sucursal.direccion}</p>
                <div  style={{ display: 'flex', justifyContent: 'center'}}>
                  <Button 
                    variant="contained" 
                    color="primary"
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
