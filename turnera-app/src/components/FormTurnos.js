import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MenuItem, Select, FormControl, InputLabel, Button } from "@material-ui/core";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import CustomDatePicker from './DatePicker'
import { getSucursales } from '../api';


const FormTurnos = () => {

	const [sucursales, setSucursales] = useState([]);
	const [ error, setError] = useState("");
	
	const formik = useFormik({
		initialValues: {
			sucursal: '',
			dia: '',
			hora: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		}
	});

	async function getSucursalesFunc() {
		const res = await getSucursales();
		setSucursales(res.data);
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

	useEffect(() => {
		try{
			getSucursalesFunc()
		} catch(err){
			setError(err)
		}
	}, [])

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
				<CustomDatePicker 
					interval={30}
					excludedTimes={getBreakTimesMinMax(formik.values.sucursal, false, false)}
					minTime={getBreakTimesMinMax(formik.values.sucursal, true, false)}
					maxTime={getBreakTimesMinMax(formik.values.sucursal, false, true)}
					dateFormat="MMMM d, yyyy h:mm aa"	 
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