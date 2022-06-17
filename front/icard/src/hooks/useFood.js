import { useState } from 'react';
import {
	getFoodsApi,
	addFoodApi,
	updateFoodApi,
	deleteFoodApi,
	getFoodByIdApi,
	getFoodsByCategoryApi,
} from '../api/food';
import { useAuth } from '.';

export function useFood() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [foods, setFoods] = useState(null);

	const { auth } = useAuth();

	// Obtener todos los alimentos
	const getFoods = async () => {
		try {
			setLoading(true);
			const response = await getFoodsApi();
			setLoading(false);

			setFoods(response);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Añadir alimentos
	const addFood = async (data) => {
		try {
			setLoading(true);
			await addFoodApi(data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Actualizar alimentos
	const updateFood = async (id, data) => {
		try {
			setLoading(true);
			await updateFoodApi(id, data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Eliminar alimentos
	const deleteFood = async (id) => {
		try {
			setLoading(true);
			await deleteFoodApi(id, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	const getFoodById = async (id) => {
		try {
			const food = await getFoodByIdApi(id);
			return food;
		} catch (error) {
			setError(error);
		}
	};

	const getFoodsByCategory = async (id) => {
		try {
			setLoading(true);
			const response = await getFoodsByCategoryApi(id);
			setLoading(false);
			setFoods(response);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	return {
		loading,
		error,
		foods,

		getFoods,
		addFood,
		updateFood,
		deleteFood,
		getFoodById,
		getFoodsByCategory,
	};
}
