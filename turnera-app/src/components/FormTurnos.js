import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MenuItem, Select, FormControl, InputLabel, Button } from "@material-ui/core";
import { setHours, setMinutes, getDay, addDays, formatISO } from "date-fns";
//import CustomDatePicker from './DatePicker'
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { getSucursales, getFeriados } from '../api';

registerLocale("es", es);

const FormTurnos = () => {

	const [ sucursales, setSucursales ] = useState([]);
	const [ feriados, setFeriados ] = useState([]);
	const [ error, setError ] = useState("");
	
	const isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
	};
	
	const formik = useFormik({
		initialValues: {
			sucursal: '',
			dia: '',
			hora: '',
		},
		onSubmit: values => {
			const { sucursal, dia, hora } = values;
			const auxDia = formatISO(new Date(`${dia}`), {representation: 'date' });
			const auxHora = formatISO(new Date(`${hora}`), { representation: 'time' });
			console.log(sucursal, `${auxDia}`, `${auxHora.split('-')[0]}`);
		}
	});

	async function getSucursalesFunc() {
		const res = await getSucursales();
		setSucursales(res.data);
	}

	async function getFeriadosFunc() {
		const res = await getFeriados();
		setFeriados(res.data);
	}

	function getBreakTimesMinMax (sucursal, min, max) {
		const times = sucursales.find(x => x.id === sucursal);
		if(times !== undefined){
			const { horaDeApertura, horaDeCierre, horaDeFinDeBreak, horaDeInicioDeBreak } = times;
			const resultTimesArr = [];
			if(!min && !max){
				resultTimesArr.push(setHours(setMinutes(new Date(), horaDeInicioDeBreak.split(":")[1]), horaDeInicioDeBreak.split(":")[0]), setHours(setMinutes(new Date(), horaDeFinDeBreak.split(":")[1]), horaDeFinDeBreak.split(":")[0]));
				return resultTimesArr;
			} else if(min && !max){
				return setHours(setMinutes(new Date(), horaDeApertura.split(":")[1]), horaDeApertura.split(":")[0]);
			} else if(!min && max){
				return setHours(setMinutes(new Date(), horaDeCierre.split(":")[1]), horaDeCierre.split(":")[0]);
			}
		}
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
					<InputLabel>Sucursal</InputLabel>
					<Select 
						id="sucursal"
						name="sucursal"
						onChange={formik.handleChange}
						value={formik.values.sucursal}>
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
					id="dia"
					locale="es"
					selected={formik.values.dia}
					name="dia"
					onChange={date => formik.setFieldValue('dia', date)}
					dateFormat="MMMM d, yyyy"	 
					filterDate={isWeekday}
					minDate={setMinutes(addDays(new Date(), 1), 30)}
					showDisabledMonthNavigation
					inline
					excludeDates={populateFeriados(feriados)}
				/>		
				<DatePicker 
					id="hora"
					name="hora"
					timeCaption="Horario"
					selected={formik.values.hora}
					onChange={date => formik.setFieldValue('hora', date)}
					dateFormat="h:mm"
					interval={30}
					excludedTimes={getBreakTimesMinMax(formik.values.sucursal, false, false)}
					minTime={getBreakTimesMinMax(formik.values.sucursal, true, false)}
					maxTime={getBreakTimesMinMax(formik.values.sucursal, false, true)}		 
					showTimeSelect
					showTimeSelectOnly
				/>	
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