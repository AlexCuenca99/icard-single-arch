import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import {
	AddEditFoodForm,
	HeaderPage,
	TableFoods,
} from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useFood } from '../../hooks';

export function FoodAdmin() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(null);
	const [contentModal, setContentModal] = useState(null);
	const [refetch, setRefetch] = useState(false);

	const { loading, foods, getFoods, deleteFood } = useFood();

	useEffect(() => {
		getFoods();
	}, [refetch]);

	const openCloseModal = () => setShowModal((prev) => !prev);
	const onRefetch = () => setRefetch((prev) => !prev);

	const addFood = () => {
		setTitleModal('Nuevo alimento');
		setContentModal(
			<AddEditFoodForm onClose={openCloseModal} onRefetch={onRefetch} />
		);
		openCloseModal();
	};

	const updateFood = (data) => {
		setTitleModal('Actualizar alimento');
		setContentModal(
			<AddEditFoodForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
				food={data}
			/>
		);
		openCloseModal();
	};

	const onDeleteFood = async (data) => {
		const result = window.confirm(`¿Eliminar alimento ${data.name}?`);

		if (result) {
			await deleteFood(data.id);
			onRefetch();
		}
	};
	return (
		<>
			<HeaderPage
				title="Alimentos"
				btnTitle="Nuevo alimento"
				btnClick={addFood}
			/>
			{loading ? (
				<Loader active inline="centered">
					Cargando...
				</Loader>
			) : (
				<TableFoods
					foods={foods}
					updateFood={updateFood}
					onDeleteFood={onDeleteFood}
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
