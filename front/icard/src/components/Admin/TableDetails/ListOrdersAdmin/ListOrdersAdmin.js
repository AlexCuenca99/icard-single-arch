import React from 'react';
import { map } from 'lodash';
import { OrderItemsAdmin } from '../';
import './ListOrdersAdmin.scss';

export function ListOrdersAdmin(props) {
	const { orders, onRefetchOrders } = props;

	return (
		<div className="list-orders-admin">
			{map(orders, (order) => (
				<OrderItemsAdmin
					key={order.id}
					order={order}
					onRefetchOrders={onRefetchOrders}
				/>
			))}
		</div>
	);
}
