import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import Lottie from 'react-lottie';
import { Button, Icon } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
// Peticiones
import { useFood } from '../../hooks';
import { getFoodsCart } from '../../api/cart';
// Componentes
import { ListFoodsCart } from '../../components/Client';
// Assets
import animationData from '../../assets/lotties/select-table/store-front';

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

	// Animación lottie
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div style={{ paddingBottom: '50px' }}>
			<h2 style={{ marginBottom: '10px' }}>Carrito</h2>
			{!foods ? (
				<p>Cargando...</p>
			) : size(foods) < 1 ? (
				<div style={{ textAlign: 'center' }}>
					<Lottie options={defaultOptions} height={200} width={200} />

					<p style={{ marginTop: '5px', marginBottom: '40px' }}>
						Aún no ha agregado alimentos
					</p>

					<Link to={`/cliente/${tableNumber}`}>
						<Button animated="fade" primary>
							<Button.Content visible>
								Agregar alimentos
							</Button.Content>
							<Button.Content hidden>
								<Icon name="shop" />
							</Button.Content>
						</Button>
					</Link>
				</div>
			) : (
				<ListFoodsCart foods={foods} onReloadCart={onReloadCart} />
			)}
		</div>
	);
}
