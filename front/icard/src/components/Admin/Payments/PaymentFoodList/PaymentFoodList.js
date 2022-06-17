import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { useOrder } from '../../../../hooks';
import './PaymentFoodList.scss';

export function PaymentFoodList(props) {
	const { payment } = props;
	const [orders, setOrders] = useState([]);

	const { getOrdersByPayment } = useOrder();

	useEffect(() => {
		(async () => {
			const response = await getOrdersByPayment(payment.id);
			setOrders(response);
		})();
	}, []);

	return (
		<div className="payment-food-list">
			{map(orders, (order) => (
				<div className="payment-food-list__food" key={order.id}>
					<div>
						<Image src={order.food_data.image} avatar size="tiny" />
						<span>{order.food_data.name}</span>
					</div>
					<span>{order.food_data.price}</span>
				</div>
			))}
		</div>
	);
}
