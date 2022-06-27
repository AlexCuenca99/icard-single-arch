import { useState } from 'react';
// Peticiones
import { addBusinessApi, getBusinessDataApi } from '../api/business';

export function useBusiness() {
	const [error, setError] = useState(false);

	const addBusiness = async (data) => {
		try {
			await addBusinessApi(data);
		} catch (error) {
			setError(error);
		}
	};

	const getBusinessData = async () => {
		try {
			const response = await getBusinessDataApi();
			return response;
		} catch (error) {
			throw error;
		}
	};

	return {
		error,

		addBusiness,
		getBusinessData,
	};
}
