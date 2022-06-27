import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Label, Icon } from 'semantic-ui-react';
import { ORDER_STATUS } from '../../../../utils/constants';
// Peticiones
import { getOrdersByTableApi } from '../../../../api/orders';
import { usePayment } from '../../../../hooks';
// Assets
import { ReactComponent as IconTable } from '../../../../assets/table.svg';
import { ReactComponent as IconTable2 } from '../../../../assets/svg/table-2.svg';
import './TableAdmin.scss';

export function TableAdmin(props) {
	const { table, refetch } = props;

	const [orders, setOrders] = useState([]);
	const [tableOccupied, setTableOccupied] = useState(false);
	const [pendingPayment, setPendingPayment] = useState(false);

	const { getPaymentByTable } = usePayment();

	// Traer todas las órdenes que se hallan en una mesa
	useEffect(() => {
		(async () => {
			const response = await getOrdersByTableApi(
				table.id,
				ORDER_STATUS.PENDING
			);
			setOrders(response);
		})();
	}, [refetch]);

	// Extraer el pago de una mesa que ha pedido la cuenta
	useEffect(() => {
		(async () => {
			const response = await getPaymentByTable(table.id);

			if (size(response) > 0) setPendingPayment(true);
			else setPendingPayment(false);
		})();
	}, [refetch]);

	// Traer mesas que han sido atendidas pero que aún no se levantan
	useEffect(() => {
		(async () => {
			const response = await getOrdersByTableApi(
				table.id,
				ORDER_STATUS.DELIVERED
			);
			if (size(response) > 0) setTableOccupied(response);
			else setTableOccupied(false);
		})();
	}, [refetch]);

	return (
		<Link className="table-admin" to={`/admin/mesa/${table.id}`}>
			{size(orders) > 0 ? (
				<Label basic pointing="below">
					<Icon name="utensils" />
					<Label.Detail>{size(orders)}</Label.Detail>
				</Label>
			) : null}

			{pendingPayment && (
				<Label basic pointing="below">
					<Icon name="dollar sign" />
					<Label.Detail>Cuenta</Label.Detail>
				</Label>
			)}

			<p>Mesa {table.number}</p>
			<IconTable
				className={classnames({
					pending: size(orders) > 0,
					occupied: tableOccupied,
					'pending-payment': pendingPayment,
				})}
			/>
			<p
				className={classnames({
					pending: size(orders) > 0,
					occupied: tableOccupied,
					'pending-payment': pendingPayment,
				})}
			>
				{size(orders) > 0
					? 'Órden Pendiente'
					: pendingPayment
					? 'Cuenta Pendiente'
					: tableOccupied
					? 'Ocupada'
					: 'Disponible'}
			</p>
		</Link>
	);
}
