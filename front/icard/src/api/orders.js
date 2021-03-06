import { BASE_API, ORDER_STATUS } from '../utils/constants';

export async function getOrdersByTableApi(idTable, status = '', ordering = '') {
	try {
		const tableFilter = `table=${idTable}`;
		const statusFilter = `status=${status}`;
		const closeFilter = `is_close=False`;

		const url = `${BASE_API}/ordenes/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;

		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function checkDeliveredOrderApi(id) {
	try {
		const url = `${BASE_API}/ordenes/${id}/`;

		const params = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: ORDER_STATUS.DELIVERED }),
		};

		const response = await fetch(url, params);
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function addOrderToTableApi(idTable, idFood) {
	try {
		const url = `${BASE_API}/ordenes/`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				status: ORDER_STATUS.PENDING,
				table: idTable,
				food: idFood,
			}),
		};
		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
	try {
		const url = `${BASE_API}/ordenes/${idOrder}/`;
		const params = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				payment: idPayment,
			}),
		};
		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function closeOrderApi(idOrder) {
	try {
		const url = `${BASE_API}/ordenes/${idOrder}/`;
		const params = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				is_close: true,
			}),
		};

		await fetch(url, params);
	} catch (error) {
		throw error;
	}
}

export async function getOrdersByPaymentApi(idPayment) {
	try {
		const paymentFilter = `payment=${idPayment}`;
		const url = `${BASE_API}/ordenes/?${paymentFilter}`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
