import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MenuItem, Select, FormControl, InputLabel, Button } from "@material-ui/core";
import { setHours, setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useSelector, useDispatch } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { getSucursales, getFeriados, getTurnosDisponibles, createTurno } from '../api';
import { setTurnoValues } from './features/contacto/turnoSlice';
import { setTurnoConfirmado } from './features/contacto/turnoConfirmadoSlice';

registerLocale("es", es);

const FormTurnos = () => {

	const [ sucursales, setSucursales ] = useState([]);
	const [ feriados, setFeriados ] = useState([]);
	const [ turnos, setTurnos ] = useState([]);
	const [ resultadoTurno, setResultadoTurno ] = useState([]);
	const [ error, setError ] = useState("");
	const tipoCaja = useSelector((state) => state.caja.tipo);
	const dniUser = useSelector((state) => state.user.dni);
	const nombreUser = useSelector((state) => state.user.nombre);
	const apellidoUser = useSelector((state) => state.user.apellido);
	const telefonoUser = useSelector((state) => state.user.telefono);
	const emailUser = useSelector((state) => state.user.email);
	const cuentaUser = useSelector((state) => state.user.cuentaContrato);
	
	const isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
	};

	const dispatch = useDispatch();
	
	const formik = useFormik({
		initialValues: {
			sucursalId: '',
			fecha: '',
			hora: '',
		},
		onSubmit: values => {	
			const { hora, sucursalId, fecha } = values;
			const auxHora = hora.split('_')[0];
			const auxCaja = hora.split('_')[1];
			const fechaAux = formatISO(new Date(`${fecha}`), {representation: 'date' });
			const obj = { hora: auxHora, cajaId: auxCaja, sucursalId: sucursalId, fecha: fechaAux }; 
			const objTurno = { dni: dniUser, nombre: nombreUser, apellido: apellidoUser, email: emailUser, telefono: telefonoUser, cuentaContrato: cuentaUser, ...obj };
			dispatch(setTurnoValues(obj));
			createTurnoFunc(objTurno);
		}	
	});

	async function createTurnoFunc(obj){
		const res = await createTurno(obj);
		setResultadoTurno(res.data);
		const { id } = res.data;
		dispatch(setTurnoConfirmado(id));
	}

	async function getTurnosDisponiblesFunc(fecha, sucursal, tipoCaja){
		const auxFecha = formatISO(new Date(`${fecha}`), {representation: 'date' });
		const res = await getTurnosDisponibles(auxFecha, sucursal, tipoCaja);
		setTurnos(res.data);
	}

	async function getSucursalesFunc() {
		const res = await getSucursales();
		setSucursales(res.data);
	}

	async function getFeriadosFunc() {
		const res = await getFeriados();
		setFeriados(res.data);
	}

	function populateFeriados(feriados){
		const feriadoData = [];
		if(feriados){
			for(let a=0; a < feriados.length; a++){
				const day = (feriados[a].fecha).replace(/-/g,'/');
				feriadoData.push(new Date(day));
			}
		}	
		return feriadoData;
	}

	function handleDateChange(date){
		const { sucursalId } = formik.values;
		formik.setFieldValue('fecha', date);
		getTurnosDisponiblesFunc(date, sucursalId, tipoCaja);
	}

	useEffect(() => {
		try{
			getSucursalesFunc();
			getFeriadosFunc();
		} catch(err){
			setError(err);
		}
	}, []);

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl>
				<FormControl style={{ maxWidth: 200 }}>
					<InputLabel>Oficina Comercial</InputLabel>
					<Select 
						id="sucursalId"
						name="sucursalId"
						onChange={formik.handleChange}
						value={formik.values.sucursalId}>
						{sucursales && sucursales.map(sucursal => (
							<MenuItem 
								key={`sucursal_${sucursal.id}`} 
								value={sucursal.id}>
									{sucursal.nombre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<DatePicker 
					id="fecha"
					locale="es"
					selected={formik.values.fecha}
					name="fecha"
					onChange={date => handleDateChange(date)}
					dateFormat="MMMM d, yyyy"	 
					filterDate={isWeekday}
					minDate={setMinutes(addDays(new Date(), 1), 30)}
					showDisabledMonthNavigation
					inline
					excludeDates={populateFeriados(feriados)}
				/>
				{turnos.length > 0 &&
					<FormControl style={{ maxWidth: 200 }}>
						<InputLabel>Horario</InputLabel>
						<Select 
							id="hora"
							name="hora"
							onChange={formik.handleChange}
							value={formik.values.hora}>
							{turnos.map(turno => (
								<MenuItem 
									key={`tur_${turno.idCaja}`} 
									value={`${turno.hora}_${turno.idCaja}`}>
										{turno.hora}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				}			
			<Button 
				type="submit" 
				variant="contained" 
				color="secondary">
					Confirmar Datos
			</Button>
		</FormControl>
		</form>
	);
};

export default FormTurnos;