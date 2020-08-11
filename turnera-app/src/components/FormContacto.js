import React , { useState, useEffect, } from 'react';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useDispatch } from 'react-redux';
import { setUserValues } from './features/contacto/userSlice';
import $, { param } from "jquery"
import service from './features/contacto/service.png';

const validation = Yup.object({
	dni: Yup.string('Ingrese dni')
		.min(8, "Debe contener 8 caracteres o más")
		.required("requerido"),
	nombre: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.required("requerido"),
	apellido: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.required("requerido"),
	email: Yup.string()
		.email("Coloque un email válido")
		.required("requerido"),
	confirmarEmail: Yup.string()
		.oneOf([Yup.ref('email'), null], 'Debe coincidir con el email ingresado')
		.email("Coloque un email válido")
        .required("requerido"),
	codArea: Yup.string()
		.min(2, "Debe contener 2 caracteres o mas")
		.max(4, "Debe contener 4 caracteres o menos")
		.required("requerido"),
	telefono: Yup.string()
		.min(5, "Debe contener 5 caracteres o mas")
		.max(8, "Debe contener 8 caracteres o menos")
		.required("requerido"),
	cuentaContrato: Yup.string()
		.max(12, "Debe contener 12 caracteres o menos")
		.notRequired(),
	titularCuenta: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.notRequired(),
	
});

const FormContacto = () => {

	const dispatch = useDispatch();
	const [error,setError]= useState(''); 
	const [toggle, setToggle]= useState(false);
	const [habilitado, setHabilitado]= useState(false);
	const formik = useFormik({
		initialValues: {
			dni: '',
			nombre: '',
			apellido: '',
			email: '',
			confirmarEmail: '',
			codArea: '',
			telefono: '',
			cuentaContrato: '',
			titularCuenta: ''
		},
		validationSchema: validation,
		onSubmit: values => {
			dispatch(setUserValues(values));
			dispatch(deshabilitar());
		},
	});

	const disablePaste = id => $(id).bind("paste", function(){return false;});

	const handleToggle = () => {
		setToggle(!toggle);
	}

	const deshabilitar = () => {
		setHabilitado(!habilitado);
	}

	const show = () => {
		document.getElementById('titular').style.display  = 'block';
		formik.values.titularCuenta = document.getElementById('titularCuenta').value;
	}

	const hide = () => {
		document.getElementById('titular').style.display  = 'none';
		formik.values.titularCuenta = "";
	}	

	useEffect(() => { 
		try{ disablePaste("#confirmarEmail"); }
		 catch(err){ setError(err); } }, []);
		 
	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl>
				<Grid container>
					<Grid item xs>
						<TextField
							label="Nro Documento"
							id="dni"
							name="dni"
							type="number"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.dni}
							helperText={formik.errors.dni || "*Campo requerido"}
							error={formik.errors.dni}
						/>
					</Grid>
					<Grid item xs>
						<TextField 
							placeholder="Nombre" 
							label="Nombre"
							id="nombre"
							name="nombre"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.nombre} 
							helperText={formik.errors.nombre || "*Campo requerido"}
							error={formik.errors.nombre}
						/>
					</Grid>
					<Grid item xs>
						<TextField 
							placeholder="Apellido" 
							label="Apellido"
							id="apellido"
							name="apellido"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.apellido}  
							helperText={formik.errors.apellido || "*Campo requerido"}
							error={formik.errors.apellido}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid >
						<TextField 
							placeholder="Email" 
							label="Email"
							id="email"
							name="email"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.email} 
							helperText={formik.errors.email || "*Campo requerido"}
							error={formik.errors.email}
						/>
					</Grid>
					<Grid >
						<TextField 
							placeholder="confirmar Email" 
							label="Confirmar Email"
							id="confirmarEmail"
							name="confirmarEmail"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.confirmarEmail} 
							helperText={formik.errors.confirmarEmail || "*Campo requerido"}
							error={formik.errors.confirmarEmail}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid>
						<TextField 
							type="codArea"
							placeholder="codArea" 
							label="Cod. área"
							id="codArea"
							name="codArea"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.codArea}  
							helperText={formik.errors.codArea || "*Ingrese Cod. Area sin el 0"}
							error={formik.errors.codArea} 
						/>
					</Grid>
					<Grid>
						<TextField
							value="rigth"
							type="number"
							placeholder="Telefono" 
							label="Telefono"
							id="telefono"
							name="telefono"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.telefono}  
							helperText={formik.errors.telefono || "*Ingrese el numero sin el 15"}
							error={formik.errors.telefono}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid >
						<TextField 
							placeholder="Cuenta Contrato" 
							label="Cuenta de Servicios"
							id="cuentaContrato"
							name="cuentaContrato"
							disabled={habilitado}
							onChange={formik.handleChange}
							value={formik.values.cuentaContrato} 
							helperText={formik.errors.cuentaContrato}
							error={formik.errors.cuentaContrato} 
						/>
						<td>
							<Button  
								onClick={handleToggle}
								style={{fontSize: '10px', color: "blue"}}>
								¿Donde lo encuentro?
							</Button>
						</td>
						<Zoom in={toggle}>
							<Paper elevation={4}>
								{toggle && <img id="service" style={{width: 350, height: 150}} src={service}></img>}
							</Paper>
						</Zoom>
					</Grid>
					<Grid >
						<div id="titular">
							<TextField 
								placeholder="Titular de la Cuenta" 
								label="Titular de la Cuenta"
								id="titularCuenta"
								name="titularCuenta"
								disabled={habilitado}
								onChange={formik.handleChange}
								value={formik.values.titularCuenta} 
								helperText={formik.errors.titularCuenta}
								error={formik.errors.titularCuenta} 
							/>
						</div>
					</Grid>
						<RadioGroup row aria-label="position" name="position" defaultValue="top" >
						<FormControlLabel
						value="Si"
						disabled={habilitado}
						control={<Radio color="primary" onChange={hide}/>}
						label="Si"
						labelPlacement="Si"
						/>
						<FormControlLabel
						value="No"
						disabled={habilitado}
						control={<Radio color="primary" onChange={show}/>}
						label="No"
						labelPlacement="No"
						/>
						</RadioGroup>
				</Grid>
				<Button 
					style={{width:'30%' , marginTop: '15px'}}
					disabled={habilitado}
					type="submit" 
					variant="contained" 
					color="secondary">
						Confirmar Datos
				</Button>
		</FormControl>
	</form>
	);
};

export default FormContacto;