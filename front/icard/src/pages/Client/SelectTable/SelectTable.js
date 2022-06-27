import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Image } from 'semantic-ui-react';
import { ORDER_STATUS } from '../../../utils/constants';
// Peticiones
import { useTable, usePayment } from '../../../hooks';
import { getOrdersByTableApi } from '../../../api/orders';
import { getBusinessDataApi } from '../../../api/business';
import { setTableOcuppied } from '../../../api/token';
// Assets
import './SelectTable.scss';
import animationData from '../../../assets/lotties/select-table/store-front';

export function SelectTable() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [tableNumber, setTableNumber] = useState(null);
	const [businessData, setBusinessData] = useState(false);
	const { getPaymentByTable } = usePayment();
	const { getTableByNumber, getTableIDByNumber } = useTable();

	useEffect(() => {
		(async () => {
			const response = await getBusinessDataApi();
			setBusinessData(response);
		})();
	}, [getBusinessDataApi]);

	const onSubmit = async () => {
		setError(null);
		if (!tableNumber) {
			setError('Por favor, introduzca un número de mesa.');
		} else {
			// Comprobar que la mesa exista
			const exists = await getTableByNumber(tableNumber);

			if (exists) {
				const tableID = await getTableIDByNumber(tableNumber);

				// Comprobar que la mesa tenga pedidos entregados pero aún no pide la cuenta
				const tableOccupied = await getOrdersByTableApi(
					tableID,
					ORDER_STATUS.DELIVERED
				);

				// Comprobar que la mesa tenga pedidos pendientes
				const tableWithPendingOrders = await getOrdersByTableApi(
					tableID,
					ORDER_STATUS.PENDING
				);

				// Comprobar que la mesa tenga un pago
				const pendingPayment = await getPaymentByTable(tableID);

				if (
					size(tableOccupied) === 0 &&
					size(tableWithPendingOrders) === 0 &&
					size(pendingPayment) === 0
				) {
					navigate(`/cliente/${tableNumber}`);
					setTableOcuppied(tableNumber);
				} else
					setError(
						'¡Lo sentimos! La mesa está siendo ocupada. Elija otra'
					);
			} else {
				setError('¡Lo sentimos! El número de mesa ingresado no existe');
			}
		}
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
		<div className="select-table">
			<div className="select-table__quarter-circle"></div>
			<div className="select-table__content">
				<Image src={businessData.logo} size="tiny" circular />
				<h1>Bienvenido a {businessData.name}</h1>
				<Lottie options={defaultOptions} height={200} width={200} />
				<h2>Ingrese su número de mesa</h2>

				<Form onSubmit={onSubmit}>
					<Form.Input
						placeholder="Ejemplo: 2, 12, 4"
						type="number"
						onChange={(_, data) => setTableNumber(data.value)}
					/>
					<Button primary fluid>
						Entrar
					</Button>
				</Form>

				<p className="select-table__content-error">{error}</p>
			</div>
		</div>
	);
}
