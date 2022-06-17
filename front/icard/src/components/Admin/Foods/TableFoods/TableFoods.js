import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableFoods.scss';

export function TableFoods(props) {
	const { foods, updateFood, onDeleteFood } = props;

	return (
		<Table className="table-food-admin">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Imagen</Table.HeaderCell>
					<Table.HeaderCell>Nombre</Table.HeaderCell>
					<Table.HeaderCell>Precio</Table.HeaderCell>
					<Table.HeaderCell>Categoría</Table.HeaderCell>
					<Table.HeaderCell>Descripción</Table.HeaderCell>
					<Table.HeaderCell>Activo</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{map(foods, (food, index) => (
					<Table.Row key={index}>
						<Table.Cell width={2}>
							<Image src={food.image} />
						</Table.Cell>
						<Table.Cell>{food.name}</Table.Cell>
						<Table.Cell>$ {food.price}</Table.Cell>
						<Table.Cell>{food.category_data.name}</Table.Cell>
						<Table.Cell>{food.description}</Table.Cell>
						<Table.Cell className="status">
							{food.is_active ? (
								<Icon name="check" />
							) : (
								<Icon name="close" />
							)}
						</Table.Cell>
						<Actions
							food={food}
							updateFood={updateFood}
							onDeleteFood={onDeleteFood}
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

// Componente para acciones de eliminar, editar alimento
function Actions(props) {
	const { food, updateFood, onDeleteFood } = props;

	return (
		<Table.Cell textAlign="right">
			<Button icon onClick={() => updateFood(food)}>
				<Icon name="pencil" />
			</Button>
			<Button icon negative onClick={() => onDeleteFood(food)}>
				<Icon name="cancel" />
			</Button>
		</Table.Cell>
	);
}
