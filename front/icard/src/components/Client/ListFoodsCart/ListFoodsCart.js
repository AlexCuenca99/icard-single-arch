import React, { useState, useEffect } from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder, useTable } from '../../../hooks';
import {
	removeFoodFromCartLocalStorage,
	clearFoodCartLocalStorage,
} from '../../../api/cart';
import './ListFoodsCart.scss';

export function ListFoodsCart(props) {
	const { foods, onReloadCart } = props;
	const [total, setTotal] = useState(0);
	const { addOrderToTable } = useOrder();
	const { getTableByNumberCreateOrder } = useTable();
	const { tableNumber } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		let totalTemp = 0;
		forEach(foods, (food) => {
			totalTemp += Number(food.price);
		});
		setTotal(totalTemp.toFixed(2));
	}, [foods]);

	const removeFoodFromCart = (index) => {
		removeFoodFromCartLocalStorage(index);
		onReloadCart();
	};

	const createOrder = async () => {
		const tableData = await getTableByNumberCreateOrder(tableNumber);
		const idTable = tableData[0].id;
		for await (const food of foods) {
			await addOrderToTable(idTable, food.id);
		}
		clearFoodCartLocalStorage();
		navigate(`/cliente/${tableNumber}/ordenes`);
	};
	return (
		<div className="list-foods-cart">
			{map(foods, (food, index) => (
				<div key={index} className="list-foods-cart__food">
					<div>
						<Image src={food.image} avatar />
						<span>{food.name}</span>
					</div>
					<span>$ {food.price}</span>
					<Icon
						name="close"
						onClick={() => removeFoodFromCart(index)}
					/>
				</div>
			))}

			<Button primary fluid onClick={createOrder}>
				Realizar pedido ($ {total})
			</Button>
		</div>
	);
}
