import React from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import { toast } from 'react-toastify';
import { addFoodToCartLocalStorage } from '../../../api/cart';
import './ListFoods.scss';

export function ListFoods(props) {
	const { foods } = props;

	const addFoodToCart = (food) => {
		addFoodToCartLocalStorage(food.id);
		toast.success(`${food.name} añadido al carrito`);
	};

	return (
		<div className="list-foods-client">
			{map(foods, (food) => (
				<div key={food.id} className="list-foods-client__food">
					<div>
						<Image src={food.image} />
						<div>
							<span>{food.name}</span>
							<p className="list-foods-client__food__description">
								{food.description}
							</p>
							<p className="list-foods-client__food__price">
								Precio {food.price} $
							</p>
						</div>
					</div>

					<Button animated="fade" onClick={() => addFoodToCart(food)}>
						<Button.Content hidden>Añadir</Button.Content>
						<Button.Content visible>
							<Icon name="add" />
						</Button.Content>
					</Button>
				</div>
			))}
		</div>
	);
}
