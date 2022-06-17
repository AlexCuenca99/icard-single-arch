import React from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react';
import { useTable } from '../../../../hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddEditTableForm.scss';

export function AddEditTableForm(props) {
	const { onClose, onRefetch, table } = props;
	const { addTable, updateTable } = useTable();

	// Instancia de Formik para validación del form
	const formik = useFormik({
		initialValues: initialValues(table),
		validationSchema: Yup.object(newValidationSchema()),
		validateOnChange: false,
		onSubmit: async (formValue) => {
			if (table) await updateTable(table.id, formValue);
			else await addTable(formValue);

			onRefetch();
			onClose();
		},
	});
	return (
		<Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="number"
				placeholder="Número de mesa"
				value={formik.values.number}
				onChange={formik.handleChange}
				error={formik.errors.number}
			/>
			<div className="add-edit-table-form__active">
				<Checkbox
					toggle
					checked={formik.values.is_available}
					onChange={(_, data) =>
						formik.setFieldValue('is_available', data.checked)
					}
				/>
				Mesa disponible
			</div>

			<Button
				type="submit"
				primary
				fluid
				content={table ? 'Actualizar' : 'Crear'}
			></Button>
		</Form>
	);
}

// Función para establecer los valores iniciales del form
function initialValues(table) {
	return {
		number: table?.number || '',
		is_available: table?.is_available ? true : false,
	};
}

// Función para validar los datos cuando se crea una mesa
function newValidationSchema() {
	return {
		number: Yup.number().required(true),
		is_available: Yup.boolean().required(true),
	};
}
