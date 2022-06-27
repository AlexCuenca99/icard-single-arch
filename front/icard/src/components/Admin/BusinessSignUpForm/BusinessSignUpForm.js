import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';
// Peticiones
import { useBusiness } from '../../../hooks';
// Assets
import './BusinessSignUpForm.scss';

export function BusinessSignUpForm() {
	const navigate = useNavigate();
	const [previewImage, setPreviewImage] = useState(null);

	const { addBusiness } = useBusiness();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				await addBusiness(formValue);
				navigate('/admin');
			} catch (error) {
				toast.error(error.message);
			}
		},
	});

	const onDrop = useCallback(async (acceptedFile) => {
		const file = acceptedFile[0];
		await formik.setFieldValue('logo', file);
		setPreviewImage(URL.createObjectURL(file));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/png',
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	return (
		<Form className="signup-form-admin" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="name"
				placeholder="Nombre de su negocio"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.errors.name}
			/>
			<Button
				type="button"
				fluid
				{...getRootProps()}
				color={formik.errors.logo && 'red'}
			>
				Subir logo de mi negocio
			</Button>
			<input {...getInputProps()} />
			<Image src={previewImage} fluid />
			<Button type="submit" content="Enviar" primary fluid />
		</Form>
	);
}

function initialValues() {
	return {
		name: '',
		logo: '',
	};
}

function validationSchema() {
	return {
		name: Yup.string().required(true),
		logo: Yup.string().required(true),
	};
}
