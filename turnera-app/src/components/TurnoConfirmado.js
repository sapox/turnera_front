import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from "@material-ui/core";
import { QRCode } from "react-qr-svg";
import { getTurnoConfirmado } from './../api';

const TurnoConfirmado = () => {

  const [ turnoConfirmado, setTurnoConfirmado ] = useState([]);
  const [ error, setError ] = useState('');

  const userDni = useSelector((state) => state.user.dni);
  const turnoId = useSelector((state) => state.turnoConfirmado.idTurno);
  
  async function getTurnoConfirmadoFunc(dni, turnoId) {
    const res = await getTurnoConfirmado(dni, turnoId);
    setTurnoConfirmado(res.data);
  }

  useEffect(() => {
		try{
			getTurnoConfirmadoFunc(userDni, turnoId);
		} catch(err){
			setError(err);
		}
  }, []);

  const { cliente, caja, fecha, hora } = turnoConfirmado;

  return (
    <Card>
      <CardContent>
      <h2>Turno Confirmado</h2>
        <QRCode 
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ maxWidth: 256 }}
          value="https://aysa.com.ar/"
        />
      {turnoConfirmado.cliente && 
          <Fragment>
            <p>{`${cliente.nombre} ${cliente.apellido}, con documento ${cliente.dni}`}</p>
            <p>{`Turno: ${fecha}, horario: ${hora}`}</p>
            Tipo de caja: {caja.tipo.nombre}
          </Fragment>   
      }
      </CardContent>
    </Card>
  );
};

export default TurnoConfirmado;
