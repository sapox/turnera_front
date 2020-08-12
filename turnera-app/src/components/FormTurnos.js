import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { MenuItem, Select, FormControl, InputLabel, Button, Paper, Zoom } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { getSucursales, getFeriados, getTurnosDisponibles, createTurno } from "../api";
import { setTurnoValues } from "./features/contacto/turnoSlice";
import { setTurnoConfirmado } from "./features/contacto/turnoConfirmadoSlice";

registerLocale("es", es);

const FormTurnos = () => {

	const [ sucursales, setSucursales ] = useState([]);
	const [ feriados, setFeriados ] = useState([]);
	const [ habilitado, setHabilitado ]= useState(false);
	const [ turnos, setTurnos ] = useState([]);
	const [ error, setError ] = useState("");
	//values from store
	const tipoCaja = useSelector((state) => state.caja.tipo);
	const dniUser = useSelector((state) => state.user.dni);
	const nombreUser = useSelector((state) => state.user.nombre);
	const apellidoUser = useSelector((state) => state.user.apellido);
	const telefonoUser = useSelector((state) => state.user.telefono);
	const emailUser = useSelector((state) => state.user.email);
	const cuentaUser = useSelector((state) => state.user.cuentaContrato);
	const titularUser = useSelector((state) => state.user.titularCuenta);
	const disclaimerStep = useSelector((state) => state.disclaimer.isConfirmed);
	const sucursalFecha = useSelector((state) => state.turno.fecha);
	const sucursalHora = useSelector((state) => state.turno.hora);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			sucursalId: '',
			direccion: '',
			fecha: '',
			hora: '',
		},
		onSubmit: values => {	
			const { hora, sucursalId, direccion, fecha } = values;
			const auxHora = hora.split('_')[0];
			const auxCaja = hora.split('_')[1];
			const fechaAux = formatISO(new Date(`${fecha}`), {representation: 'date' });
			const obj = { hora: auxHora, cajaId: auxCaja, sucursalId: sucursalId, direccion: direccion, fecha: fechaAux }; 
			const objTurno = 
				{ dni: dniUser, 
					nombre: nombreUser, 
					apellido: apellidoUser, 
					email: emailUser, 
					telefono: telefonoUser, 
					cuentaContrato: cuentaUser, 
					titularCuenta: titularUser,  
					...obj 
				};
			dispatch(setTurnoValues(obj));
			createTurnoFunc(objTurno);
			dispatch(deshabilitar());
		}	
	});

  async function createTurnoFunc(obj) {
    if (disclaimerStep) {
      try {
        const res = await createTurno(obj);
        const { id } = res.data;
        dispatch(setTurnoConfirmado(id));
      } catch (e) {
        console.log(e);
      }
    } else {
      return (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      );
    }
  }

	async function getTurnosDisponiblesFunc(fecha, sucursal, tipoCaja){
		fechaData(fecha)
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

  function populateFeriados(feriados) {
    const feriadoData = [];
    if (feriados) {
      for (let a = 0; a < feriados.length; a++) {
        const day = feriados[a].fecha.replace(/-/g, "/");
        feriadoData.push(new Date(day));
      }
    }
    return feriadoData;
  }

	const deshabilitar = () => {
		setHabilitado(!habilitado);
		document.getElementById('datePicker').style.display  = 'none';
	}

  function handleDateChange(date) {
    const { sucursalId } = formik.values;
    formik.setFieldValue("fecha", date);
    getTurnosDisponiblesFunc(date, sucursalId, tipoCaja);
  }


  useEffect(() => {
    try {
      getSucursalesFunc();
      getFeriadosFunc();
    } catch (err) {
      setError(err);
    }
  }, []);

	let sucursalLocalidad = null;
	let sucursalNombre = null;
	let sucursalDireccion= null;
	const sucursalData = value => {
		sucursales.map(sucursal => {
			if(sucursal.id === value){
				sucursalLocalidad = sucursal.distrito.localidad.nombre;
				sucursalNombre = sucursal.nombre;
				sucursalDireccion = sucursal.direccion;
			}
		})
	}

	let fechaTurno = null;
	function fechaData(value) {
		const fecha = formatISO(new Date(`${value}`), {representation: 'date' });
		fechaTurno = fecha;
	}

	let horaTurno = null;
	const horaData = value => {
		horaTurno = value.split(":00")[0];
		fechaTurno = formatISO(new Date(`${formik.values.fecha}`), {representation: 'date' });
	}
	
	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl>
				<FormControl style={{ maxWidth: 200 }}>
					<InputLabel>Oficina Comercial</InputLabel>
					<Select 
						id="sucursalId"
						name="sucursalId"
						disabled={habilitado}
						onChange={formik.handleChange}
						value={formik.values.sucursalId}>
						{sucursales && sucursales.map(sucursal => (
							<MenuItem
								key={`sucursal_${sucursal.id}`} 
								value={sucursal.id}
								onChange={sucursalData(formik.values.sucursalId)}>
									{sucursal.nombre} -    
									<p style={{ fontSize: 13 }}>{sucursal.direccion}</p> 
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<div id="datePicker">
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
						inline={formik.values.sucursalId !== ''}
						excludeDates={populateFeriados(feriados)}
					/>
				</div>
				{turnos.length > 0 &&
					<FormControl style={{ maxWidth: 200 }}>
						<InputLabel>Horario</InputLabel>
						<Select 
							id="hora"
							name="hora"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.hora}>
							{turnos.map(turno => (
								<MenuItem 
									key={`tur_${turno.idCaja}`} 
									value={`${turno.hora}_${turno.idCaja}`}
									onChange={horaData(formik.values.hora)}>
										{turno.hora}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				}
				<Zoom in={horaTurno}>
					<div  style={{ border: "ridge", textAlign: "justify", justifyContent: "center" }}>Ud. <b>{nombreUser} {apellidoUser}</b>, con DNI: <b>{dniUser}</b> esta a punto de sacar un turno 
					para la oficina comercial de <b>{sucursalNombre}({sucursalDireccion}),{sucursalLocalidad}</b>.  
				 	En la fecha <b>{fechaTurno}</b> a las <b>{horaTurno} hs</b>.</div>
				</Zoom>
			<Button
				disabled={habilitado}
				type="submit" 
				variant="contained" 
				color="secondary">
					Confirmar Turno
			</Button>
		</FormControl>
		</form>
	);
};

export default FormTurnos;