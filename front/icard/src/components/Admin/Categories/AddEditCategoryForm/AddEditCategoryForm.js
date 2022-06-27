import React, { useState, useCallback } from 'react';
import { Form, Image, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCategory } from '../../../../hooks';
import './AddEditCategoryForm.scss';

export function AddEditCategoryForm(props) {
	const { onClose, onRefetch, category } = props;
	const [previewImage, setPreviewImage] = useState(category?.image || null);
	const { addCategory, updateCategory } = useCategory();

	const formik = useFormik({
		initialValues: initialValues(category),
		validationSchema: Yup.object(
			category ? updateValidationSchema() : newValidationSchema()
		),
		validateOnChange: false,
		onSubmit: async (formValue) => {
			try {
				if (category) await updateCategory(category.id, formValue);
				else await addCategory(formValue);

				onRefetch();
				onClose();
			} catch (error) {
				console.error(error);
			}
		},
	});

	const onDrop = useCallback(async (acceptedFile) => {
		const file = acceptedFile[0];
		setPreviewImage(URL.createObjectURL(file));
		await formik.setFieldValue('image', file);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	return (
		<Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="name"
				placeholder="Nombre de la categoría"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.errors.name}
			/>
			<Button
				type="button"
				fluid
				{...getRootProps()}
				color={formik.errors.image && 'red'}
			>
				{previewImage ? 'Cambiar imagen' : 'Subir imagen'}
			</Button>

			<input {...getInputProps()} />
			<Image src={previewImage} fluid />
			<Button
				type="submit"
				primary
				fluid
				content={category ? 'Actualizar' : 'Crear'}
			/>
		</Form>
	);
}

function initialValues(category) {
	return {
		name: category?.name || '',
		image: '',
	};
}

// Esquema de validación del formulario de creación de categoría
function newValidationSchema() {
	return {
		name: Yup.string().required(true),
		image: Yup.string().required(true),
	};
}

// Esquema de validación del formulario de actualización de categoría
function updateValidationSchema() {
	return {
		name: Yup.string().required(true),
		image: Yup.string(),
	};
}
