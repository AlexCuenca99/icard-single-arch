import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { signupUserApi } from '../../../api/user';
import { Button, Form } from 'semantic-ui-react';
import './SignUpForm.scss';

export function SignUpForm() {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				await signupUserApi(formValue);
				navigate('/admin');
			} catch (error) {
				toast.error(error.message);
			}
		},
	});
	return (
		<Form className="signup-form-admin" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="business_name"
				placeholder="Nombre de su negocio"
				value={formik.values.business_name}
				onChange={formik.handleChange}
				error={formik.errors.business_name}
			/>
			<Form.Input
				name="email"
				placeholder="Correo electrónico"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email}
			/>
			<Form.Input
				name="username"
				placeholder="Nombre de usuario"
				value={formik.values.username}
				onChange={formik.handleChange}
				error={formik.errors.username}
			/>
			<Form.Input
				name="password"
				type="password"
				placeholder="Contraseña"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password}
			/>
			<Form.Input
				name="re_password"
				type="password"
				placeholder="Vuelva a ingresar la contraseña"
				value={formik.values.re_password}
				onChange={formik.handleChange}
				error={formik.errors.re_password}
			/>
			<Button type="submit" content="Crear cuenta" primary fluid />
		</Form>
	);
}

function initialValues() {
	return {
		business_name: '',
		email: '',
		username: '',
		password: '',
		re_password: '',
	};
}

function validationSchema() {
	return {
		business_name: Yup.string().required(true),
		email: Yup.string().email(true).required(true),
		username: Yup.string().required(true),
		password: Yup.string().required(true),
		re_password: Yup.string().required(true),
	};
}
