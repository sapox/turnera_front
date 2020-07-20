import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { setUserValues } from './features/contacto/userSlice';

const validation = Yup.object({
	dni: Yup.string('Ingrese dni')
		.max(9, "Debe contener 9 caracteres o menos")
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
	telefono: Yup.string()
		.max(10, "Debe contener 10 caracteres o menos")
		.required("requerido"),
	cuenta: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.notRequired(),
	titularCuenta: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.notRequired()	
});

const FormContacto = () => {

	const dispatch = useDispatch();
	
	const formik = useFormik({
		initialValues: {
			dni: '',
			nombre: '',
			apellido: '',
			email: '',
			telefono: '',
			cuentaContrato: '',
			titularCuenta: ''
		},
		validationSchema: validation,
		onSubmit: values => {
			dispatch(setUserValues(values));
		},
	});

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
					helperText={formik.errors.dni || "Ingrese el nro sin puntos"}
					error={formik.errors.dni}
				/>
				<TextField 
					placeholder="Nombre" 
					label="Nombre"
					id="nombre"
					name="nombre"
					onChange={formik.handleChange}
					value={formik.values.nombre} 
					helperText={formik.errors.nombre}
					error={formik.errors.nombre}
				/>
				<TextField 
					placeholder="Apellido" 
					label="Apellido"
					id="apellido"
					name="apellido"
					onChange={formik.handleChange}
					value={formik.values.apellido}  
					helperText={formik.errors.apellido}
					error={formik.errors.apellido}
				/>
				<TextField 
					placeholder="Email" 
					label="Email"
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email} 
					helperText={formik.errors.email}
					error={formik.errors.email}
				/>
				<TextField 
					type="number"
					placeholder="Telefono" 
					label="Telefono"
					id="telefono"
					name="telefono"
					onChange={formik.handleChange}
					value={formik.values.telefono}  
					helperText={formik.errors.telefono}
					error={formik.errors.telefono}
				/>
				<TextField 
					placeholder="Cuenta Contrato" 
					label="Cuenta Contrato"
					id="cuentaContrato"
					name="cuentaContrato"
					onChange={formik.handleChange}
					value={formik.values.cuentaContrato} 
					helperText={formik.errors.cuentaContrato}
					error={formik.errors.cuentaContrato} 
				/>
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