import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { forEach, size } from 'lodash';
import { HeaderPage, AddOrderForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import {
	ListOrdersAdmin,
	PaymentDetails,
} from '../../components/Admin/TableDetails';
import { useOrder, useTable, usePayment } from '../../hooks';

export function TableDetailsAdmin() {
	const [refetchOrders, setRefetchOrders] = useState(false);
	const [paymentData, setPaymentData] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { id } = useParams();

	const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
	const { table, getTable } = useTable();
	const { createPayment, getPaymentByTable } = usePayment();

	useEffect(() => {
		getOrdersByTable(id, '', 'ordering=status,created');
	}, [id, refetchOrders]);

	useEffect(() => {
		getTable(id);
	}, [id]);

	useEffect(() => {
		(async () => {
			const response = await getPaymentByTable(id);
			if (size(response) > 0) setPaymentData(response[0]);
		})();
	}, [refetchOrders]);

	const onRefetchOrders = () => setRefetchOrders((prev) => !prev);
	const openCloseModal = () => setShowModal((prev) => !prev);
	const onCreatePayment = async () => {
		const result = window.confirm(
			'¿Desea continuar con la generación de la cuenta de la mesa?'
		);
		if (result) {
			// En el modelo del back, 0 es igual a EFECTIVO y 1 igual a TARJETA CRÉDITO/DÉBITO
			const paymentType = '0';

			// En el modelo del back, 0 es igual a PENDIENTE y 1 igual a PAGADO
			const paymentStatus = '0';
			let totalPayment = 0;

			forEach(orders, (order) => {
				totalPayment += Number(order.food_data.price);
			});

			const resultPaymentType = window.confirm(
				'Pago con tarjeta pulse Confirmar. Pago con efectivo pulse Cancelar.'
			);

			const paymentData = {
				table: id,
				amount: totalPayment.toFixed(2),
				payment_type: resultPaymentType ? '1' : '0',
				payment_status: paymentStatus,
			};

			const payment = await createPayment(paymentData);

			for await (const order of orders) {
				await addPaymentToOrder(order.id, payment.id);
			}

			onRefetchOrders();
		}
	};

	return (
		<>
			<HeaderPage
				title={`Mesa ° ${table?.number || ''}`}
				btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
				btnClick={openCloseModal}
				btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
				btnClickTwo={onCreatePayment}
			/>
			{loading ? (
				<Loader active inline="centered">
					Cargando...
				</Loader>
			) : (
				<ListOrdersAdmin
					orders={orders}
					onRefetchOrders={onRefetchOrders}
				/>
			)}
			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title="Añadir pedido"
			>
				{paymentData ? (
					<PaymentDetails
						payment={paymentData}
						orders={orders}
						openCloseModal={openCloseModal}
						onRefetchOrders={onRefetchOrders}
					/>
				) : (
					<AddOrderForm
						idTable={id}
						openCloseModal={openCloseModal}
						onRefetchOrders={onRefetchOrders}
					/>
				)}
			</ModalBasic>
		</>
	);
}
