import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useUser } from '../../../hooks';
import { resetUserPasswordApi } from '../../../api/user';
import { Button, Form } from 'semantic-ui-react';
import './ResetPasswordForm.scss';

export function ResetPasswordForm() {
	const { resetUserPassword } = useUser();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				await resetUserPassword(formValue);
				navigate('/admin');
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		},
	});
	return (
		<Form className="reset-password-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="email"
				placeholder="Correo electrónico"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email}
			/>
			<Button type="submit" content="Enviar" primary fluid />
		</Form>
	);
}

function initialValues() {
	return {
		email: '',
	};
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
	};
}
