import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useTable } from '../../../hooks';
import './SelectTable.scss';

export function SelectTable(props) {
	const [tableNumber, setTableNumber] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const { getTableByNumber } = useTable();

	const onSubmit = async () => {
		setError(null);
		if (!tableNumber) {
			setError('Por favor, introduzca un número de mesa.');
		} else {
			const exists = await getTableByNumber(tableNumber);
			if (exists) navigate(`/cliente/${tableNumber}`);
			else
				setError('¡Lo sentimos! El número de mesa ingresado no existe');
		}
	};

	return (
		<div className="select-table">
			<div className="select-table__content">
				<h1>Bienvenido a My iCard</h1>
				<h2>Ingrese su número de mesa</h2>

				<Form onSubmit={onSubmit}>
					<Form.Input
						placeholder="Ejemplo: 2, 12, 4"
						type="number"
						onChange={(_, data) => setTableNumber(data.value)}
					/>
					<Button primary fluid>
						Entrar
					</Button>
				</Form>
				<p className="select-table__content-error">{error}</p>
			</div>
		</div>
	);
}
