import React, { useState } from 'react';
import { map } from 'lodash';
import QRCode from 'qrcode.react';
import { Table, Button, Icon } from 'semantic-ui-react';
// Componentes
import { ModalBasic } from '../../../../components/Common';
// Assets
import './TableTables.scss';

export function TableTables(props) {
	const { tables, updateTable, onDeleteTable } = props;

	const [showModal, setShowModal] = useState(false);
	const [contentModal, setContentModal] = useState(null);

	const openCloseModal = () => setShowModal((prev) => !prev);
	const showQR = (table) => {
		const tableURL = `${window.location.origin}/cliente/${table.number}`;
		setContentModal(
			<div style={{ textAlign: 'center' }}>
				<QRCode value={tableURL} />
			</div>
		);
		openCloseModal();
	};
	return (
		<>
			<Table className="table-table-admin">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Número de mesa</Table.HeaderCell>
						<Table.HeaderCell>Disponibilidad</Table.HeaderCell>
						<Table.HeaderCell></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{map(tables, (table, index) => (
						<Table.Row key={index}>
							<Table.Cell width={2}>{table.number}</Table.Cell>
							<Table.Cell className="status">
								{table.is_available ? (
									<Icon name="check" />
								) : (
									<Icon name="close" />
								)}
							</Table.Cell>
							<Actions
								table={table}
								updateTable={updateTable}
								onDeleteTable={onDeleteTable}
								showQR={showQR}
							/>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={'Código QR'}
				size="mini"
				children={contentModal}
			/>
		</>
	);
}

function Actions(props) {
	const { table, updateTable, onDeleteTable, showQR } = props;

	return (
		<Table.Cell textAlign="right">
			<Button icon onClick={() => showQR(table)}>
				<Icon name="qrcode" />z
			</Button>
			<Button icon onClick={() => updateTable(table)}>
				<Icon name="pencil" />
			</Button>
			<Button icon negative onClick={() => onDeleteTable(table)}>
				<Icon name="cancel" />
			</Button>
		</Table.Cell>
	);
}
