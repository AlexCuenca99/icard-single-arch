import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import './TableCategories.scss';

export function TableCategories(props) {
	const { categories, updateCategory, onDeleteCategory } = props;
	return (
		<Table className="table-category-admin">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Imagen</Table.HeaderCell>
					<Table.HeaderCell>Categoría</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body style={{ justifyContent: 'center' }}>
				{map(categories, (category, index) => (
					<Table.Row key={index}>
						<Table.Cell width={2}>
							<Image src={category.image} />
						</Table.Cell>
						<Table.Cell>{category.name}</Table.Cell>

						<Actions
							category={category}
							updateCategory={updateCategory}
							onDeleteCategory={onDeleteCategory}
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { category, updateCategory, onDeleteCategory } = props;

	return (
		<Table.Cell textAlign="right">
			<Button icon onClick={() => updateCategory(category)}>
				<Icon name="pencil" />
			</Button>
			<Button icon negative onClick={() => onDeleteCategory(category)}>
				<Icon name="cancel" />
			</Button>
		</Table.Cell>
	);
}
