import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFood } from '../../hooks';
import { ListFoods } from '../../components/Client';

export function Foods() {
	const { tableNumber, idCategory } = useParams();
	const { loading, foods, getFoodsByCategory } = useFood();

	useEffect(() => {
		getFoodsByCategory(idCategory);
	}, [idCategory]);

	console.log(foods);

	return (
		<div>
			<Link to={`/cliente/${tableNumber}`}>Volver a categorías</Link>
			{loading ? <p>loading</p> : <ListFoods foods={foods} />}
		</div>
	);
}
