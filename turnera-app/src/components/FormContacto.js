import React , { useState, useEffect, } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, TextField, Button } from "@material-ui/core";
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
	cuenta: Yup.string()
		.max(13, "Debe contener 13 caracteres o menos")
		.notRequired("no requerido"),
	titularCuenta: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.notRequired(),
	
});

const FormContacto = () => {

	const dispatch = useDispatch();
	const [error,setError]= useState(''); 
	const [toggle, setToggle]= useState(false);
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
		},
	});

	const disablePaste = id => $(id).bind("paste", function(){return false;});

	const handleToggle = () => {
		setToggle(!toggle);
	}

	useEffect(() => { 
		try{ disablePaste("#confirmarEmail"); }
		 catch(err){ setError(err); } }, []);
		 
	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl>
				<TextField
					label="Nro Documento"
					id="dni"
					name="dni"
					type="number"
					onChange={formik.handleChange}
					value={formik.values.dni}
					helperText={formik.errors.dni || "*Campo requerido"}
					error={formik.errors.dni}
				/>
				<TextField 
					placeholder="Nombre" 
					label="Nombre"
					id="nombre"
					name="nombre"
					onChange={formik.handleChange}
					value={formik.values.nombre} 
					helperText={formik.errors.nombre || "*Campo requerido"}
					error={formik.errors.nombre}
				/>
				<TextField 
					placeholder="Apellido" 
					label="Apellido"
					id="apellido"
					name="apellido"
					onChange={formik.handleChange}
					value={formik.values.apellido}  
					helperText={formik.errors.apellido || "*Campo requerido"}
					error={formik.errors.apellido}
				/>
				<TextField 
					placeholder="Email" 
					label="Email"
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email} 
					helperText={formik.errors.email || "*Campo requerido"}
					error={formik.errors.email}
				/>
				<TextField 
					placeholder="confirmar Email" 
					label="Confirmar Email"
					id="confirmarEmail"
					name="confirmarEmail"
					onChange={formik.handleChange}
					value={formik.values.confirmarEmail} 
					helperText={formik.errors.confirmarEmail || "*Campo requerido"}
					error={formik.errors.confirmarEmail}
       			/>
				<tr>
					<TextField style={{width: 70}}
						type="codArea"
						placeholder="codArea" 
						label="Cod. área"
						id="codArea"
						name="codArea"
						onChange={formik.handleChange}
						value={formik.values.codArea}  
						helperText={formik.errors.codArea || "*Ingrese Cod. Area sin el 0"}
						error={formik.errors.codArea} 
					/>
					<TextField style={{width: 130}}
						value="rigth"
						type="number"
						placeholder="Telefono" 
						label="Telefono"
						id="telefono"
						name="telefono"
						onChange={formik.handleChange}
						value={formik.values.telefono}  
						helperText={formik.errors.telefono || "*Ingrese el numero sin el 15"}
						error={formik.errors.telefono}
					/>
				</tr>
				<TextField 
					placeholder="Cuenta Contrato" 
					label="Cuenta de Servicios"
					id="cuentaContrato"
					name="cuentaContrato"
					onChange={formik.handleChange}
					value={formik.values.cuentaContrato} 
					helperText={formik.errors.cuentaContrato}
					error={formik.errors.cuentaContrato} 
				/>
				<Button  
					onClick={handleToggle}
					style={{width: 0, height:18}}
					variant="contained" 
					color="primary">
					?
				</Button>
				{toggle && <img id="service" style={{width: 350, height: 250}} src={service}></img>}
				<TextField 
					placeholder="Titular de la Cuenta" 
					label="Titular de la Cuenta"
					id="titularCuenta"
					name="titularCuenta"
					onChange={formik.handleChange}
					value={formik.values.titularCuenta} 
					helperText={formik.errors.titularCuenta}
					error={formik.errors.titularCuenta} 
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

export default FormContacto;