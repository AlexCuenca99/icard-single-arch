import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { usePayment, useOrder } from '../../../../hooks';
import './PaymentDetails.scss';

export function PaymentDetails(props) {
	const { payment, orders, openCloseModal, onRefetchOrders } = props;

	const { closePayment } = usePayment();
	const { closeOrder } = useOrder();

	const getIconPayment = (key) => {
		if (key === '1') return 'credit card outline';
		if (key === '0') return 'money bill alternate outline';
		return null;
	};

	const onCloseTable = async () => {
		const result = window.confirm(
			'Desea continuar con el cierre de la mesa?'
		);

		if (result) {
			await closePayment(payment.id);

			for await (const order of orders) {
				await closeOrder(order.id);
			}
			onRefetchOrders();
			openCloseModal();
		}
	};

	return (
		<div className="payment-details">
			<Table striped>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Mesa:</Table.Cell>
						<Table.Cell>{payment.table_data.number}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Total:</Table.Cell>
						<Table.Cell>$ {payment.amount}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Forma de pago:</Table.Cell>
						<Table.Cell>
							<Icon name={getIconPayment(payment.payment_type)} />
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<Button primary fluid onClick={() => onCloseTable()}>
				Marcar como pagado y cerrar mesa
			</Button>
		</div>
	);
}
