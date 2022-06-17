import React from 'react';
import { Table, Button, Icon, Tab } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableTables.scss';

export function TableTables(props) {
	const { tables, updateTable, onDeleteTable } = props;
	return (
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
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { table, updateTable, onDeleteTable } = props;

	return (
		<Table.Cell textAlign="right">
			<Button icon onClick={() => updateTable(table)}>
				<Icon name="pencil" />
			</Button>
			<Button icon negative onClick={() => onDeleteTable(table)}>
				<Icon name="cancel" />
			</Button>
		</Table.Cell>
	);
}
