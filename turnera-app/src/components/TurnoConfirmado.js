import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
   <div>
     <h1>Turno Confirmado</h1>
     <div>
      {turnoConfirmado.cliente && 
        <div>
          <p>{`${cliente.nombre} ${cliente.apellido}, con documento ${cliente.dni}`}</p>
          <p>{`Turno: ${fecha}, horario: ${hora}`}</p>
          Tipo de caja: {caja.tipo.nombre}
        </div>
         
      }
       
    </div>
   </div> 
  );
};

export default TurnoConfirmado;
