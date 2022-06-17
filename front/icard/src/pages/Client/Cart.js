import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { size } from 'lodash';
import { useFood } from '../../hooks';
import { getFoodsCart } from '../../api/cart';
import { ListFoodsCart } from '../../components/Client';

export function Cart() {
	const [foods, setFoods] = useState(null);
	const [reloadCart, setReloadCart] = useState(false);
	const { getFoodById } = useFood();
	const { tableNumber } = useParams();

	useEffect(() => {
		(async () => {
			const idFoodsCart = getFoodsCart();
			const foodsArray = [];
			for await (const idFood of idFoodsCart) {
				const response = await getFoodById(idFood);
				foodsArray.push(response);
			}
			setFoods(foodsArray);
		})();
	}, [reloadCart]);

	const onReloadCart = () => setReloadCart((prev) => !prev);

	return (
		<div>
			<h2>Carrito</h2>
			{!foods ? (
				<p>Cargando...</p>
			) : size(foods) < 1 ? (
				<div style={{ textAlign: 'center' }}>
					<p>Aún no ha agregado productos</p>
					<Link to={`/cliente/${tableNumber}/orders`}>
						<Button primary>Ver pedidos</Button>
					</Link>
				</div>
			) : (
				<ListFoodsCart foods={foods} onReloadCart={onReloadCart} />
			)}
		</div>
	);
}
