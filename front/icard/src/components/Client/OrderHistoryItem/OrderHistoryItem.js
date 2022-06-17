import React from 'react';
import { Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es-us';
import { ORDER_STATUS } from '../../../utils/constants';
import './OrderHistoryItem.scss';

export function OrderHistoryItem(props) {
	const { order } = props;
	const { name, image } = order.food_data;

	return (
		<div
			className={classNames('order-history-item', [
				order.status === '1' ? 'delivered' : 'pending',
			])}
		>
			<div className="order-history-item__time">
				<span>
					Pedido {moment(order.created).startOf('second').fromNow()}
				</span>
			</div>
			<div className="order-history-item__food">
				<Image src={image} />
				<p>{name}</p>
			</div>
			{order.status === ORDER_STATUS.PENDING ? (
				<span>En marcha</span>
			) : (
				<span>Entregado</span>
			)}
		</div>
	);
}
