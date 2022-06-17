import { BASE_API } from '../utils/constants';

// Petición para traer todas las mesas
export async function getTablesApi(token) {
	try {
		const url = `${BASE_API}/mesas/`;
		const params = {
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

// Petición para crear una mesa
export async function addTableApi(data, token) {
	try {
		// Formdata para el envío de una mesa
		const formData = new FormData();
		formData.append('number', data.number);
		formData.append('is_available', data.is_available);

		const url = `${BASE_API}/mesas/`;
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

// Petición para actualizar una mesa
export async function updateTablepi(id, data, token) {
	try {
		// Formdata para el envío de una mesa
		const formData = new FormData();
		formData.append('number', data.number);
		formData.append('is_available', data.is_available);

		const url = `${BASE_API}/mesas/${id}/`;
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

// Petición para eliminar una mesa
export async function deleteTableApi(id, token) {
	try {
		const url = `${BASE_API}/mesas/${id}/`;
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

// Petición para obtener una mesa
export async function getTableApi(id) {
	try {
		const url = `${BASE_API}/mesas/${id}/`;
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function getTableByNumberApi(numberTable) {
	try {
		const tableFilter = `number=${numberTable}`;

		const url = `${BASE_API}/mesas/?${tableFilter}`;
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}
