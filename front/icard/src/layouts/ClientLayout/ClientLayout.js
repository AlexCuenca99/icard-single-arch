import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { ORDER_STATUS } from '../../utils/constants';
import { Container, Button, Icon, Image } from 'semantic-ui-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// Requests
import { useTable, usePayment } from '../../hooks';
import { getOrdersByTableApi } from '../../api/orders';
import { getBusinessDataApi } from '../../api/business';
import {
	getTableOcuppied,
	removeTableOcuppied,
	setTableOcuppied,
} from '../../api/token';
// Assets
import './ClientLayout.scss';

export function ClientLayout(props) {
	const { children } = props;
	const { tableNumber } = useParams();
	const { getPaymentByTable } = usePayment();
	const { getTableByNumber, getTableIDByNumber } = useTable();

	const navigate = useNavigate();
	const [businessData, setBusinessData] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getBusinessDataApi();
			setBusinessData(response);
		})();
	}, [getBusinessDataApi]);

	useEffect(() => {
		(async () => {
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

				console.log('Var de LS: ', getTableOcuppied());
				console.log(
					'No se puede usar la mesa: ',
					!(
						size(tableOccupied) === 0 &&
						size(tableWithPendingOrders) === 0 &&
						size(pendingPayment) === 0
					)
				);
				console.log(
					'Es la var de LS distinta del # de mesa: ',
					getTableOcuppied() !== tableNumber
				);
				if (
					!(
						size(tableOccupied) === 0 &&
						size(tableWithPendingOrders) === 0 &&
						size(pendingPayment) === 0
					) &&
					getTableOcuppied() !== tableNumber
				) {
					console.log('Se cierra la mesa');
					closeTable();
				} else {
					setTableOcuppied(tableNumber);
					console.log('Se mantiene abierta');
				}
			} else {
				closeTable();
				console.log('Ejecución de else de 1er if');
			}
		})();
	}, [tableNumber]);

	const closeTable = () => {
		removeTableOcuppied();
		navigate('/cliente');
	};

	const goToCart = () => {
		navigate(`/cliente/${tableNumber}/carrito`);
	};

	const goToOrders = () => {
		navigate(`/cliente/${tableNumber}/ordenes`);
	};

	return (
		<div className="client-layout-bg">
			<Container className="client-layout">
				<div className="client-layout__nav">
					<Link to={`/cliente/${tableNumber}`}>
						<div className="client-layout__nav__logo">
							<Image src={businessData.logo} />
							<h1>{businessData.name}</h1>
						</div>
					</Link>

					<span>Mesa {tableNumber}</span>
					<div>
						<Button icon onClick={goToCart}>
							<Icon name="shop" />
						</Button>
						<Button icon onClick={goToOrders}>
							<Icon name="list" />
						</Button>
						<Button icon onClick={closeTable}>
							<Icon name="sign-out" />
						</Button>
					</div>
				</div>
				<div className="client-layout__content">{children}</div>
			</Container>
		</div>
	);
}
