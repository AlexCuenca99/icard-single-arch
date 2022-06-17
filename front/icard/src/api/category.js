import { BASE_API } from '../utils/constants';

export async function getCategoriesApi() {
	try {
		const url = `${BASE_API}/categorias/`;

		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function addCategoryApi(data, token) {
	try {
		// Formdata para el envío de la imágenes
		const formData = new FormData();
		formData.append('image', data.image);
		formData.append('name', data.name);

		const url = `${BASE_API}/categorias/`;
		const params = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function updateCategoryApi(id, data, token) {
	try {
		// Formdata para el envío de la imágenes
		const formData = new FormData();
		if (data.image) formData.append('image', data.image);
		formData.append('name', data.name);

		const url = `${BASE_API}/categorias/${id}/`;
		const params = {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function deleteCategoryApi(id, token) {
	try {
		const url = `${BASE_API}/categorias/${id}/`;
		const params = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
