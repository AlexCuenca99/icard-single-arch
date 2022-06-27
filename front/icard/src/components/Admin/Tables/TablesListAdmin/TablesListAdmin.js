import React, { useState, useEffect } from 'react';
import './TablesListAdmin.scss';
import { map } from 'lodash';
import { TableAdmin } from '../';
import { Button, Icon, Checkbox, Popup, Label, List } from 'semantic-ui-react';

export function TablesListAdmin(props) {
	const { tables } = props;

	const [refetch, setRefetch] = useState(false);
	const [autoRefetch, setAutoRefetch] = useState(false);

	const onRefetch = () => setRefetch((prev) => !prev);

	useEffect(() => {
		if (autoRefetch) {
			const autoRefetchAction = () => {
				onRefetch();
				setTimeout(() => {
					autoRefetchAction();
				}, 5000);
			};
			autoRefetchAction();
		}
	}, [autoRefetch]);

	const onCheckAutoRefetch = (check) => {
		if (check) {
			setAutoRefetch(check);
		} else {
			// Recargar la página
			window.location.reload();
		}
	};

	return (
		<>
			<div className="tables-list-legend">
				<List horizontal divided>
					<List.Item style={{ color: '#AD40BF' }}>
						<Label
							horizontal
							style={{ backgroundColor: '#E3B4EA' }}
						></Label>
						Ocupada
					</List.Item>
					<List.Item style={{ color: '#1778B0' }}>
						<Label
							horizontal
							style={{ backgroundColor: '#97D2F3' }}
						></Label>
						Órden Pendiente
					</List.Item>
					<List.Item style={{ color: '#2A915F' }}>
						<Label
							horizontal
							style={{ backgroundColor: '#AED6C3' }}
						></Label>
						Cuenta Pendiente
					</List.Item>
				</List>
			</div>

			<div className="tables-list-admin">
				<Popup
					trigger={
						<Button
							primary
							icon
							className="tables-list-admin__reload"
							onClick={onRefetch}
						>
							<Icon name="refresh" />
						</Button>
					}
					content="Actualizar mesas"
					position="bottom right"
				/>

				<div className="tables-list-admin__reload-toggle">
					<span>Recarga automática</span>
					<Popup
						trigger={
							<Checkbox
								toggle
								checked={autoRefetch}
								onChange={(_, data) =>
									onCheckAutoRefetch(data.checked)
								}
							/>
						}
						content="Actualizar mesas automáticamente"
						position="bottom right"
					/>
				</div>

				{map(tables, (table) => (
					<TableAdmin
						key={table.number}
						table={table}
						refetch={onRefetch}
					/>
				))}
			</div>
		</>
	);
}
