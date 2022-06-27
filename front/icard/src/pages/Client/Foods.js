import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
// Peticiones
import { useFood } from '../../hooks';
// Componentes
import { ListFoods } from '../../components/Client';

export function Foods() {
	const { tableNumber, idCategory } = useParams();
	const { loading, foods, getFoodsByCategory } = useFood();

	useEffect(() => {
		getFoodsByCategory(idCategory);
	}, [idCategory]);

	return (
		<div>
			<Link
				to={`/cliente/${tableNumber}`}
				style={{ fontSize: '14px', textDecoration: 'underline' }}
			>
				<Icon name="angle left" />
				Volver a categorías
			</Link>
			{loading ? <p>loading</p> : <ListFoods foods={foods} />}
		</div>
	);
}
