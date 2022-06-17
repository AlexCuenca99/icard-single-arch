import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { map, size, forEach } from 'lodash';
import { OrderHistoryItem } from '../../components/Client';
import { ModalConfirm } from '../../components/Common';
import { useOrder, useTable, usePayment } from '../../hooks';
import { getPaymentsApi } from '../../api/payment';

export function OrdersHistory() {
	const [idTable, setIdTable] = useState(null);
	const [showTypePayment, setShowTypePayment] = useState(false);
	const [accountIsRequested, setAccountIsRequested] = useState(false);
	const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
	const { getTableByNumberCreateOrder } = useTable();
	const { tableNumber } = useParams();
	const { createPayment, getPaymentByTable } = usePayment();

	useEffect(() => {
		(async () => {
			const table = await getTableByNumberCreateOrder(tableNumber);
			const idTableTemp = table[0].id;
			setIdTable(idTableTemp);

			getOrdersByTable(idTableTemp, '', 'ordering=-status,-created');
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (idTable) {
				const response = await getPaymentByTable(idTable);
				setAccountIsRequested(response);
			}
		})();
	}, [idTable]);

	const onCreatePayment = async (paymentType) => {
		setShowTypePayment(false);

		let totalPayment = 0;
		forEach(orders, (order) => {
			totalPayment += Number(order.food_data.price);
		});

		const paymentData = {
			table: idTable,
			amount: totalPayment.toFixed(2),
			payment_type: paymentType,
			payment_status: '0',
		};

		const payment = await createPayment(paymentData);

		for await (const order of orders) {
			await addPaymentToOrder(order.id, payment.id);
		}
		window.location.reload();
	};
	return (
		<div>
			{loading ? (
				<p>Cargando...</p>
			) : (
				<>
					{size(orders) > 0 && (
						<Button
							primary
							fluid
							onClick={() =>
								size(accountIsRequested) === 0 &&
								setShowTypePayment(true)
							}
						>
							{size(accountIsRequested) > 0
								? 'La cuenta ya ha sido pedida'
								: 'Pedir la cuenta'}
						</Button>
					)}
					{map(orders, (order) => (
						<OrderHistoryItem key={order.id} order={order} />
					))}
				</>
			)}

			<ModalConfirm
				title="¿Pagar con tarjeta o efectivo?"
				show={showTypePayment}
				onCloseText="Efectivo"
				onClose={() => onCreatePayment('0')}
				onConfirmText="Tarjeta"
				onConfirm={() => onCreatePayment('1')}
			/>
		</div>
	);
}
