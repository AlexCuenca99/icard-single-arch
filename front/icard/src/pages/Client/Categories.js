import React, { useEffect } from 'react';
import { ListCategories } from '../../components/Client';
import { useCategory } from '../../hooks';

export function Categories() {
	const { loading, categories, getCategories } = useCategory();

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<div>
			<h2>Categorías</h2>
			{loading ? (
				<p>Cargando</p>
			) : (
				<ListCategories categories={categories} />
			)}
		</div>
	);
}
