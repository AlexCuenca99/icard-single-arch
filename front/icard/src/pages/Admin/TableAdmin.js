import React, { useState, useEffect } from 'react';
import { Loader, Modal } from 'semantic-ui-react';
import {
	HeaderPage,
	TableTables,
	AddEditTableForm,
} from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useTable } from '../../hooks/useTable';

export function TableAdmin() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(null);
	const [contentModal, setContentModal] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const { loading, tables, getTables, deleteTable } = useTable();

	useEffect(() => {
		getTables();
	}, [refetch]);

	const openCloseModal = () => setShowModal((prev) => !prev);

	const onRefetch = () => setRefetch((prev) => !prev);

	// Añadir una nueva mesa
	const addTable = () => {
		setTitleModal('Nueva mesa');
		setContentModal(
			<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
		);
		openCloseModal();
	};

	// Actualizar mesa
	const updateTable = (data) => {
		setTitleModal('Editar mesa');
		setContentModal(
			<AddEditTableForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
				table={data}
			/>
		);
		openCloseModal();
	};

	// Eliminar mesa
	const onDeleteTable = async (data) => {
		const result = window.confirm(`¿Eliminar mesa ${data.name}?`);

		if (result) {
			await deleteTable(data.id);
			onRefetch();
		}
	};
	return (
		<>
			<HeaderPage
				title="Mesas"
				btnTitle="Crear nueva mesa"
				btnClick={addTable}
			/>
			{loading ? (
				<Loader active inline="centered">
					Cargando...
				</Loader>
			) : (
				<TableTables
					tables={tables}
					updateTable={updateTable}
					onDeleteTable={onDeleteTable}
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
