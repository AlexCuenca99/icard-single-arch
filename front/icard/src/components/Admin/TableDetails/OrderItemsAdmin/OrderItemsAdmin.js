import React from 'react';
import { Button, Image, Label, Icon } from 'semantic-ui-react';
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
		<div className="order-item-admin">
			<div className="order-item-admin__time">
				<Label basic>
					<Icon name="clock outline" />
					{moment(order.created).format('HH:mm')}
					<Label.Detail style={{ fontWeight: 'normal' }}>
						{moment(order.created).startOf('seconds').fromNow()}
					</Label.Detail>
				</Label>
			</div>
			<div className="order-item-admin__food">
				<div
					className={classNames('order-item-admin__food', {
						[order.status === '0' ? 'pending' : 'delivered']: true,
					})}
				>
					<Image src={image} avatar />
				</div>
				<div className="order-item-admin__food__details">
					<p>{name}</p>
					<span
						className={classNames({
							pending: order.status === '0',
							delivered: order.status === '1',
						})}
					>
						{order.status === '0' ? 'Pendiente' : 'Entregado'}
					</span>
				</div>
			</div>
			{order.status === ORDER_STATUS.PENDING && (
				<Button primary onClick={onCheckDeliveredOrder}>
					Marcar entregado
				</Button>
			)}
		</div>
	);
}
