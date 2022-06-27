import { BASE_API } from '../utils/constants';

export async function addBusinessApi(data) {
	try {
		// Formdata para el envío de la imágenes
		const formData = new FormData();
		formData.append('logo', data.logo);
		formData.append('name', data.name);

		const url = `${BASE_API}/negocio/`;
		const params = {
			method: 'POST',
			body: formData,
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getBusinessDataApi() {
	try {
		const url = `${BASE_API}/negocio/1/`;

		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
