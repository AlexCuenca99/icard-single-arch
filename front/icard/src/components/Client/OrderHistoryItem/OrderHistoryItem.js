import React from 'react';
import { Image, Label, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es-us';
import { ORDER_STATUS } from '../../../utils/constants';
import './OrderHistoryItem.scss';

export function OrderHistoryItem(props) {
	const { order } = props;
	const { name, image } = order.food_data;

	return (
		<div className="order-history-item">
			<div className="order-history-item__time">
				<Label basic>
					<Icon name="clock outline" />
					Pedido {moment(order.created).startOf('second').fromNow()}
				</Label>
			</div>
			<div
				className={classNames('order-history-item__food', [
					order.status === '1' ? 'delivered' : 'pending',
				])}
			>
				<Image src={image} avatar />
			</div>

			<div className="order-history-item__details">
				<p>{name}</p>

				{order.status === ORDER_STATUS.PENDING ? (
					<span
						className={classNames({
							pending: order.status === '0',
							delivered: order.status === '1',
						})}
					>
						En marcha
					</span>
				) : (
					<span
						className={classNames({
							pending: order.status === '0',
							delivered: order.status === '1',
						})}
					>
						Entregado
					</span>
				)}
			</div>
		</div>
	);
}
