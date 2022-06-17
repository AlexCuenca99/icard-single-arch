import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es-us';
import { ORDER_STATUS } from '../../../../utils/constants';
import { useOrder } from '../../../../hooks';
import './OrderItemsAdmin.scss';

export function OrderItemsAdmin(props) {
	const { order, onRefetchOrders } = props;
	const { name, image } = order.food_data;
	const { checkDeliveredOrder } = useOrder();

	const onCheckDeliveredOrder = async () => {
		await checkDeliveredOrder(order.id);
		onRefetchOrders();
	};
	return (
		<div
			className={classNames('order-item-admin', {
				[order.status === '0' ? 'pending' : 'delivered']: true,
			})}
		>
			<div className="order-item-admin__time">
				<span>{moment(order.created).format('HH:mm')}</span> {' - '}
				<span>
					{moment(order.created).startOf('seconds').fromNow()}
				</span>
			</div>
			<div className="order-item-admin__food">
				<Image src={image} />
				<p>{name}</p>
			</div>
			{order.status === ORDER_STATUS.PENDING && (
				<Button primary onClick={onCheckDeliveredOrder}>
					Marcar entregado
				</Button>
			)}
		</div>
	);
}
