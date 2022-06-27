import React from 'react';
import { map, size } from 'lodash';
import { OrderItemsAdmin } from '../';
// Assets
import { ReactComponent as NoContentSVG } from '../../../../assets/svg/historico-de-pagos/dashboard.svg';
import './ListOrdersAdmin.scss';

export function ListOrdersAdmin(props) {
	const { orders, onRefetchOrders } = props;

	return (
		<div className="list-orders-admin">
			{size(orders) === 0 ? (
				<div className="list-orders-admin__no-content">
					<NoContentSVG
						style={{
							width: '500px',
							height: '400px',
							textAlign: 'center',
						}}
					/>
					<span>Sin contenido</span>
				</div>
			) : (
				map(orders, (order) => (
					<OrderItemsAdmin
						key={order.id}
						order={order}
						onRefetchOrders={onRefetchOrders}
					/>
				))
			)}
		</div>
	);
}
