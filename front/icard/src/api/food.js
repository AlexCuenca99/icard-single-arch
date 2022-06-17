import { BASE_API } from '../utils/constants';

export async function getFoodsApi() {
	try {
		const url = `${BASE_API}/alimentos/`;

		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function addFoodApi(data, token) {
	try {
		// Formdata para el envío de la imágenes
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('price', data.price);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('is_active', data.is_active);
		formData.append('image', data.image);

		const url = `${BASE_API}/alimentos/`;
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

export async function updateFoodApi(id, data, token) {
	try {
		// Formdata para el envío de la imágenes
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('price', data.price);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('is_active', data.is_active);
		if (data.image) formData.append('image', data.image);

		const url = `${BASE_API}/alimentos/${id}/`;
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

export async function deleteFoodApi(id, token) {
	try {
		const url = `${BASE_API}/alimentos/${id}/`;
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

export async function getFoodByIdApi(id) {
	try {
		const url = `${BASE_API}/alimentos/${id}/`;
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function getFoodsByCategoryApi(id) {
	try {
		const categoryFilter = `category=${id}`;
		const url = `${BASE_API}/alimentos/?${categoryFilter}`;
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}
