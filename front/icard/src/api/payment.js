import { BASE_API, PAYMENT_STATUS } from '../utils/constants';

export async function createPaymentApi(paymentData) {
	try {
		const url = `${BASE_API}/pagos/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paymentData),
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function getPaymentByTableApi(idTable) {
	try {
		const tableFilter = `table=${idTable}`;
		const statusFilter = `payment_status=${PAYMENT_STATUS.PENDING}`;
		const url = `${BASE_API}/pagos/?${tableFilter}&${statusFilter}`;
		const params = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(url, params);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function closePaymentApi(idPayment) {
	try {
		const url = `${BASE_API}/pagos/${idPayment}/`;
		const params = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ payment_status: PAYMENT_STATUS.PAID }),
		};

		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function getPaymentsApi() {
	try {
		const paymentFilter = `payment_status=${PAYMENT_STATUS.PAID}`;
		const orderingFilter = 'ordering=created';
		const url = `${BASE_API}/pagos/?${paymentFilter}&${orderingFilter}`;

		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function saveStripeInfoApi(data) {
	try {
		const url = `${BASE_API}/stripe/save-stripe-info/`;

		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(url, params);

		console.log(response);
		if (response.status !== 200) {
			throw new Error('No se ha podido procesar el pago');
		}
	} catch (error) {
		throw error;
	}
}
