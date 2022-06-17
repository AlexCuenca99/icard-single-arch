import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import { Label, Button, Icon, Checkbox } from 'semantic-ui-react';
import { ReactComponent as IconTable } from '../../../../assets/table.svg';
import { usePayment } from '../../../../hooks';
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
				<Label circular color="orange">
					{size(orders)}
				</Label>
			) : null}

			{pendingPayment && (
				<Label circular color="orange">
					Cuenta
				</Label>
			)}
			<IconTable
				className={classnames({
					pending: size(orders) > 0,
					occupied: tableOccupied,
					'pending-payment': pendingPayment,
				})}
			/>
			<p>Mesa {table.number}</p>
		</Link>
	);
}
