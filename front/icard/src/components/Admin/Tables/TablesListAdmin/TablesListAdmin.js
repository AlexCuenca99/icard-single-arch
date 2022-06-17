import React, { useState, useEffect } from 'react';
import './TablesListAdmin.scss';
import { map, size } from 'lodash';
import { TableAdmin } from '../';
import { Button, Icon, Checkbox } from 'semantic-ui-react';

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
		<div className="tables-list-admin">
			<Button
				primary
				icon
				className="tables-list-admin__reload"
				onClick={onRefetch}
			>
				<Icon name="refresh" />
			</Button>

			<div className="tables-list-admin__reload-toggle">
				<span>Recarga automática</span>
				<Checkbox
					toggle
					checked={autoRefetch}
					onChange={(_, data) => onCheckAutoRefetch(data.checked)}
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
	);
}
