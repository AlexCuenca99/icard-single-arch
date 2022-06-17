import React, { useState, useEffect } from 'react';
import {
	HeaderPage,
	TableCategories,
	AddEditCategoryForm,
} from '../../components/Admin';

import { useCategory } from '../../hooks';
import { Loader } from 'semantic-ui-react';
import { ModalBasic } from '../../components/Common';

export function CategoriesAdmin() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(null);
	const [contentModal, setContentModal] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const { loading, categories, getCategories, deleteCategory } =
		useCategory();

	useEffect(() => {
		getCategories();
	}, [refetch]);

	const openCloseModal = () => setShowModal((prev) => !prev);
	const onRefetch = () => setRefetch((prev) => !prev);

	const addCategory = () => {
		setTitleModal('Nueva categoría');
		setContentModal(
			<AddEditCategoryForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
			/>
		);
		openCloseModal();
	};

	const updateCategory = (data) => {
		setTitleModal('Actualizar categoría');
		setContentModal(
			<AddEditCategoryForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
				category={data}
			/>
		);
		openCloseModal();
	};

	const onDeleteCategory = async (data) => {
		const result = window.confirm(`¿Eliminar categoría ${data.name}?`);

		if (result) {
			try {
				await deleteCategory(data.id);
				onRefetch();
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<>
			<HeaderPage
				title="Categorias"
				btnTitle="Nueva categoría"
				btnClick={addCategory}
			/>
			{loading ? (
				<Loader active inline="centered">
					Cargando...
				</Loader>
			) : (
				<TableCategories
					categories={categories}
					updateCategory={updateCategory}
					onDeleteCategory={onDeleteCategory}
				/>
			)}

			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={titleModal}
				children={contentModal}
			/>
		</>
	);
}
