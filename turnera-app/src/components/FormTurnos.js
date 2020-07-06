import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { MenuItem, Select, FormControl, InputLabel, Button } from "@material-ui/core";
import { getSucursales } from '../api';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const FormTurnos = () => {

	const [sucursales, setSucursales] = React.useState([]);
	const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

	const formik = useFormik({
		initialValues: {
			sucursal: '',
			dia: '',
			hora: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	async function getSucursalesFunc() {
    const res = await getSucursales();
    setSucursales(res.data);
  }

	useEffect(() => {
		getSucursalesFunc()
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
							<MenuItem key={`sucursal_${sucursal.id}`} value={sucursal.id}>{sucursal.nombre}</MenuItem>
						))}
					</Select>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						margin="normal"
						id="date-picker-dialog"
						label="Date picker dialog"
						format="MM-dd-yyyy"
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						label="Time picker"
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change time',
						}}
					/>
				</MuiPickersUtilsProvider>
				
			
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