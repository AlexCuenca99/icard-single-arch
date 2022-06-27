import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { Button, Icon } from 'semantic-ui-react';
import { map, size, forEach } from 'lodash';
import { useParams, Link } from 'react-router-dom';
// Peticiones
import { useOrder, useTable, usePayment } from '../../hooks';
// Componentes
import { ModalConfirm } from '../../components/Common';
import { OrderHistoryItem } from '../../components/Client';
// Assets
import animationData from '../../assets/lotties/select-table/store-front';

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

	// Animación lottie
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div style={{ paddingBottom: '50px' }}>
			<h2 style={{ marginBottom: '10px' }}>Historial de pedidos</h2>
			{loading ? (
				<p>Cargando...</p>
			) : size(orders) === 0 ? (
				<div style={{ textAlign: 'center' }}>
					<Lottie options={defaultOptions} height={200} width={200} />

					<p style={{ marginTop: '5px', marginBottom: '40px' }}>
						Aún no ha agregado pedidos
					</p>

					<Link to={`/cliente/${tableNumber}`}>
						<Button animated="fade" primary>
							<Button.Content visible>
								Agregar alimentos
							</Button.Content>
							<Button.Content hidden>
								<Icon name="shop" />
							</Button.Content>
						</Button>
					</Link>
				</div>
			) : (
				<>
					{size(orders) > 0 && (
						<Button
							animated="fade"
							primary
							fluid
							onClick={() =>
								size(accountIsRequested) === 0 &&
								setShowTypePayment(true)
							}
						>
							<Button.Content visible>
								{size(accountIsRequested) > 0
									? 'La cuenta ya ha sido pedida'
									: 'Pedir la cuenta'}
							</Button.Content>
							<Button.Content hidden>
								<Icon name="shop" />
							</Button.Content>
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
