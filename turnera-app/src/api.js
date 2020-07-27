import axios from 'axios';

//const urlBase = 'http://localhost:8080/api/v1/'
export const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1/',
	headers: {
			'Content-Type': 'application/json'
	},
})

export const login = (user) => {
	return axios.post(`/api/v1/login`, {}, { auth: user });
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
	if (isLoggedIn) {
		axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
			username + ':' + password
		)}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};


export const getSucursales = async () => {
	const url = `sucursales/findAll`
	return await api.get(url)
}

export const getFeriados = async () => {
	const url = `feriados/findAll`
	return await api.get(url)
}

export const getTipoCaja = async () => {
	const url = `tiposCaja/findAll`
	return await api.get(url)
}

export const getTurnosDisponibles = async (fecha, sucursalId, tipoCajaId) => {
	const url = `turnos/disponibles?fecha=${fecha}&sucursalId=${sucursalId}&tipoCajaId=${tipoCajaId}`
	return await api.get(url)
}

export const createTurno = async (values) => {
	const url = `turnos/create`;
	const request = { 
										fecha: values.fecha,
										hora: values.hora,
										cajaId: values.cajaId,
										dni: values.dni,
										nombre: values.nombre,
										apellido: values.apellido,
										telefono: values.telefono,
										email: values.email,
										cuentaContrato: values.cuentaContrato,
										titularCuenta: values.titularCuenta,
									}
	return await api.post(url, request);
}

export const getTurnoConfirmado = async (dni, turnoId) => {
	const url = `turnos/consulta?dni=${dni}&turnoId=${turnoId}`;
	return await api.get(url);
}

export const getCajaById = async (cajaId) => {
	const url = `cajas/${cajaId}`
	return await api.get(url)
}