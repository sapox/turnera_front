import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, TextField, Button } from "@material-ui/core";

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
	telefono: Yup.number()
		.max(10, "Debe contener 10 caracteres o menos")
		.required("requerido"),
	cuenta: Yup.string()
		.max(20, "Debe contener 20 caracteres o menos")
		.notRequired()
});

const FormContacto = () => {
	
	const formik = useFormik({
		initialValues: {
			dni: '',
			nombre: '',
			apellido: '',
			email: '',
			telefono: '',
			cuenta: '',
		},
		validationSchema: validation,
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
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
					placeholder="Cuenta" 
					label="Cuenta"
					id="cuenta"
					name="cuenta"
					onChange={formik.handleChange}
					value={formik.values.cuenta} 
					helperText={formik.errors.cuenta}
					error={formik.errors.cuenta} 
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