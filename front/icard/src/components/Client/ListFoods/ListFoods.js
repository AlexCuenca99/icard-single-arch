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
						<span>{food.name}</span>
					</div>
					<Button primary icon onClick={() => addFoodToCart(food)}>
						<Icon name="add" />
					</Button>
				</div>
			))}
		</div>
	);
}
