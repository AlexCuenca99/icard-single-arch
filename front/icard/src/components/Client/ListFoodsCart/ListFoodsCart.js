import React, { useState, useEffect } from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
// Peticiones
import { useOrder, useTable } from '../../../hooks';
import {
	removeFoodFromCartLocalStorage,
	clearFoodCartLocalStorage,
} from '../../../api/cart';
// Assets
import './ListFoodsCart.scss';

export function ListFoodsCart(props) {
	const { tableNumber } = useParams();
	const [total, setTotal] = useState(0);
	const { foods, onReloadCart } = props;

	const navigate = useNavigate();
	const { addOrderToTable } = useOrder();
	const { getTableByNumberCreateOrder } = useTable();

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
					<div className="list-foods-cart__food__resume">
						<div className="list-foods-cart__food__resume__image">
							<Image src={food.image} />
						</div>
						<div className="list-foods-cart__food__resume__data">
							<span>{food.name}</span>
							<p>Total: {food.price} $</p>
							<p>Detalles</p>
						</div>
					</div>
					<Button
						animated="fade"
						onClick={() => removeFoodFromCart(index)}
					>
						<Button.Content hidden>Quitar</Button.Content>
						<Button.Content visible>
							<Icon name="close" />
						</Button.Content>
					</Button>
				</div>
			))}

			<Button animated="fade" primary fluid onClick={createOrder}>
				<Button.Content hidden>Enviar pedido</Button.Content>
				<Button.Content visible>Total: $ {total}</Button.Content>
			</Button>
		</div>
	);
}
