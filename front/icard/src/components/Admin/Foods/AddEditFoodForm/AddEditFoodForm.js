import React, { useState, useEffect, useCallback } from 'react';
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { useCategory, useFood } from '../../../../hooks';
import { map } from 'lodash';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddEditFoodForm.scss';

export function AddEditFoodForm(props) {
	const { onClose, onRefetch, food } = props;
	const [categoriesFormat, setCategoriesFormat] = useState([]);
	const { categories, getCategories } = useCategory();
	const [previewImage, setPreviewImage] = useState(food?.image || null);
	const { addFood, updateFood } = useFood();

	// useEffect para hacer la petición de las categorías
	useEffect(() => {
		getCategories();
	}, []);

	// useEffect para usar las categorías como opciones del dropdown
	useEffect(() => {
		setCategoriesFormat(formatDropdownData(categories));
	}, [categories]);

	// Instancia de Formik para validación del form
	const formik = useFormik({
		initialValues: initialValues(food),
		validationSchema: Yup.object(
			food ? updateValidationSchema() : newValidationSchema()
		),
		validateOnChange: false,
		onSubmit: async (formValue) => {
			if (food) await updateFood(food.id, formValue);
			else await addFood(formValue);
			onRefetch();
			onClose();
		},
	});
	const onDrop = useCallback(async (acceptedFile) => {
		const file = acceptedFile[0];
		await formik.setFieldValue('image', file);
		setPreviewImage(URL.createObjectURL(file));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	return (
		<Form className="add-edit-food-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="name"
				placeholder="Nombre del alimento"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.errors.name}
			/>
			<Form.Input
				type="number"
				name="price"
				placeholder="Precio"
				value={formik.values.price}
				onChange={formik.handleChange}
				error={formik.errors.price}
			/>
			<Form.TextArea
				name="description"
				placeholder="Descripción"
				value={formik.values.description}
				onChange={formik.handleChange}
				error={formik.errors.description}
			/>
			<Dropdown
				placeholder="Categoria"
				fluid
				selection
				search
				options={categoriesFormat}
				value={formik.values.category}
				error={formik.errors.category}
				onChange={(_, data) =>
					formik.setFieldValue('category', data.value)
				}
			/>
			<div className="add-edit-food-form__active">
				<Checkbox
					toggle
					checked={formik.values.is_active}
					onChange={(_, data) =>
						formik.setFieldValue('is_active', data.checked)
					}
				/>
				Alimento activo
			</div>

			<Button
				type="button"
				fluid
				{...getRootProps()}
				color={formik.errors.image && 'red'}
			>
				{previewImage ? 'Cambiar imagen' : 'Subir imagen'}
			</Button>
			<input {...getInputProps} />
			<Image src={previewImage} />
			<Button
				type="submit"
				primary
				fluid
				content={food ? 'Actualizar' : 'Crear'}
			/>
		</Form>
	);
}

// Función para extraer los datos necesarios para las opciones del dropdown
function formatDropdownData(categories) {
	return map(categories, (category) => ({
		key: category.id,
		text: category.name,
		value: category.id,
	}));
}

// Función para establecer los valores iniciales del form
function initialValues(food) {
	return {
		name: food?.name || '',
		price: food?.price || '',
		category: food?.category || '',
		description: food?.description || '',
		is_active: food?.is_active ? true : false,
		image: '',
	};
}

// Función para validar los datos cuando se crea un alimento
function newValidationSchema() {
	return {
		name: Yup.string().required(true),
		price: Yup.string().required(true),
		category: Yup.number().required(true),
		description: Yup.string().required(true),
		is_active: Yup.boolean().required(true),
		image: Yup.string().required(true),
	};
}

// Función para validar los datos cuando se actualiza un alimento
function updateValidationSchema() {
	return {
		name: Yup.string().required(true),
		price: Yup.string().required(true),
		category: Yup.number().required(true),
		description: Yup.string().required(true),
		is_active: Yup.boolean().required(true),
		image: Yup.string(),
	};
}
