import { BASE_API } from '../utils/constants';

export async function loginApi(formData) {
	try {
		const url = `${BASE_API}/autenticacion/login/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		};

		const response = await fetch(url, params);

		if (response.status !== 200) {
			throw new Error('Usuario o contraseña incorrectos');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getMeApi(token) {
	try {
		const url = `${BASE_API}/autenticacion/mis-datos/`;
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

export async function signupUserApi(data) {
	try {
		const url = `${BASE_API}/auth/users/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(url, params);

		const result = await response.json();

		if (response.status !== 201) {
			throw new Error(JSON.stringify(result));
		}
		return result;
	} catch (error) {
		throw error;
	}
}

export async function resetUserPasswordApi(data) {
	try {
		const url = `${BASE_API}/auth/users/reset_password/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(url, params);

		if (response.status !== 204) {
			throw new Error('El correo ingresado no existe');
		}
		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function resetUserPasswordConfirmApi(data) {
	try {
		const url = `${BASE_API}/auth/users/reset_password_confirm/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};
		const response = await fetch(url, params);

		if (response.status !== 204) {
			throw new Error('El link ha expirado. Intentelo nuevamente');
		}
		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function activateAccountApi(data) {
	try {
		const url = `${BASE_API}/auth/users/activation/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};
		const response = await fetch(url, params);

		switch (response.status) {
			case 403:
				throw new Error('Su cuenta ya ha sido activada.');
			case 400:
				throw new Error('El token de activación ha expirado');
		}
	} catch (error) {
		throw error;
	}
}

export async function getUsersApi(token) {
	try {
		const url = `${BASE_API}/usuarios/`;
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

export async function addUserApi(data, token) {
	try {
		const url = `${BASE_API}/usuarios/`;
		const params = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function updateUserApi(id, data, token) {
	try {
		const url = `${BASE_API}/usuarios/${id}/`;
		const params = {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function deleteUserApi(id, token) {
	try {
		const url = `${BASE_API}/usuarios/${id}/`;
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
