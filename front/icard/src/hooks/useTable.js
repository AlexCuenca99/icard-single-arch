import { useState } from 'react';
import { size } from 'lodash';
import {
	getTablesApi,
	addTableApi,
	updateTablepi,
	deleteTableApi,
	getTableApi,
	getTableByNumberApi,
} from '../api/table';
import { useAuth } from '.';

export function useTable() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [tables, setTables] = useState(null);
	const [table, setTable] = useState(null);

	const { auth } = useAuth();

	// Obtener todos las mesas
	const getTables = async () => {
		try {
			setLoading(true);
			const response = await getTablesApi(auth.token);
			setLoading(false);

			setTables(response);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Añadir mesas
	const addTable = async (data) => {
		try {
			setLoading(true);
			await addTableApi(data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Hook para manejar la actualización de mesas
	const updateTable = async (id, data) => {
		try {
			setLoading(true);
			await updateTablepi(id, data, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Hook para manejar la eliminación de mesas
	const deleteTable = async (id) => {
		try {
			setLoading(true);
			await deleteTableApi(id, auth.token);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Hook para manejar la obtneción de una mesa
	const getTable = async (id) => {
		try {
			setLoading(true);
			const response = await getTableApi(id);

			setLoading(false);
			setTable(response);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Función para comprobar la existencia de una mesa para validar las URL¿s
	const getTableByNumber = async (tableNumer) => {
		try {
			const response = await getTableByNumberApi(tableNumer);

			if (size(response) === 0) throw Error();

			return true;
		} catch (error) {
			setError(error);
		}
	};

	// Función para determinar el ID de una mesa cuando se crea una nueva orden
	const getTableByNumberCreateOrder = async (tableNumer) => {
		try {
			const response = await getTableByNumberApi(tableNumer);
			return response;
		} catch (error) {
			setError(error);
		}
	};

	// Función para determinar el ID de una mesa por su número
	const getTableIDByNumber = async (tableNumber) => {
		try {
			const response = await getTableByNumberApi(tableNumber);
			if (size(response) === 0) throw Error();

			return response[0].id;
		} catch (error) {
			setError(error);
		}
	};
	return {
		loading,
		error,
		tables,
		table,

		getTables,
		addTable,
		updateTable,
		deleteTable,
		getTable,
		getTableByNumber,
		getTableByNumberCreateOrder,
		getTableIDByNumber,
	};
}
