import React from 'react';
import { useFormik } from 'formik';
import { MenuItem, Select, FormControl, InputLabel, TextField, Button } from "@material-ui/core";

const FormContacto = () => {
	
	const formik = useFormik({
		initialValues: {
			tipoDni: '',
			dni: '',
			nombre: '',
			apellido: '',
			email: '',
			telefono: '',
			cuenta: '',
		},
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
					helperText="Ingrese el nro sin puntos"
					onChange={formik.handleChange}
					value={formik.values.dni}
				/>
				<TextField 
					placeholder="Nombre" 
					label="Nombre"
					id="nombre"
					name="nombre"
					onChange={formik.handleChange}
					value={formik.values.nombre} 
				/>
				<TextField 
					placeholder="Apellido" 
					label="Apellido"
					id="apellido"
					name="apellido"
					onChange={formik.handleChange}
					value={formik.values.apellido}  
				/>
				<TextField 
					placeholder="Email" 
					label="Email"
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email} 
				/>
				<TextField 
					type="number"
					placeholder="Telefono" 
					label="Telefono"
					id="telefono"
					name="telefono"
					onChange={formik.handleChange}
					value={formik.values.telefono}  
				/>
				<TextField 
					placeholder="Cuenta" 
					label="Cuenta"
					id="cuenta"
					name="cuenta"
					onChange={formik.handleChange}
					value={formik.values.cuenta}  
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