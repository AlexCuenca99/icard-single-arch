import { useState } from 'react';
import {
	getMeApi,
	signupUserApi,
	getUsersApi,
	addUserApi,
	updateUserApi,
	deleteUserApi,
	resetUserPasswordApi,
	resetUserPasswordConfirmApi,
} from '../api/user';
import { useAuth } from '.';

export function useUser() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState(null);

	const { auth } = useAuth();

	const getMe = async (token) => {
		try {
			const response = await getMeApi(token);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const signupUser = async (data) => {
		try {
			await signupUserApi(data);
		} catch (error) {
			throw error;
		}
	};

	const resetUserPassword = async (data) => {
		try {
			await resetUserPasswordApi(data);
		} catch (error) {
			throw error;
		}
	};

	const resetUserPasswordConfirm = async (data) => {
		try {
			await resetUserPasswordConfirmApi(data);
		} catch (error) {
			throw error;
		}
	};

	const getUsers = async () => {
		try {
			setLoading(true);
			const response = await getUsersApi(auth.token);
			setLoading(false);

			setUsers(response);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	const addUser = async (data) => {
		try {
			setLoading(true);
			await addUserApi(data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	const updateUser = async (id, data) => {
		try {
			setLoading(true);
			await updateUserApi(id, data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	const deleteUser = async (id) => {
		try {
			setLoading(true);
			await deleteUserApi(id, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	return {
		loading,
		error,
		users,

		getMe,
		signupUser,
		getUsers,
		addUser,
		updateUser,
		deleteUser,
		resetUserPassword,
		resetUserPasswordConfirm,
	};
}
