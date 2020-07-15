import axios from 'axios';

const urlBase = 'http://localhost:8080/api/v1/'

export const getSucursales = async () => {
	const url = `${urlBase}sucursales/findAll`
	return await axios.get(url)
}

export const getFeriados = async () => {
	const url = `${urlBase}feriados/findAll`
	return await axios.get(url)
}

export const getTipoCaja = async () => {
	const url = `${urlBase}tiposCaja/findAll`
	return await axios.get(url)
}

export const getTurnosDisponibles = async (fecha, sucursalId, tipoCajaId) => {
	const url = `${urlBase}turnos/disponibles?fecha=${fecha}&sucursalId=${sucursalId}&tipoCajaId=${tipoCajaId}`
	return await axios.get(url)
}

export const getCajaById = async (cajaId) => {
	const url = `${urlBase}cajas/${cajaId}`
	return await axios.get(url)
}