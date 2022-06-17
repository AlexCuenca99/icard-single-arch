import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import { useUser } from '../../../hooks';
import './ResetPasswordConfirmForm.scss';

export function ResetPasswordConfirmForm(props) {
	const { uid, token } = props;
	const { resetUserPasswordConfirm } = useUser();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: initialValues(uid, token),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				await resetUserPasswordConfirm(formValue);
				navigate('/admin');
			} catch (error) {
				toast.error(error.message);
			}
		},
	});
	return (
		<div className="reset-password-confirm-form">
			<Form
				className="reset-password-confirm-form"
				onSubmit={formik.handleSubmit}
			>
				<Form.Input
					name="new_password"
					type="password"
					placeholder="Contraseña"
					value={formik.values.new_password}
					onChange={formik.handleChange}
					error={formik.errors.new_password}
				/>
				<Form.Input
					name="re_new_password"
					type="password"
					placeholder="Vuelva a ingresar la contraseña"
					value={formik.values.re_new_password}
					onChange={formik.handleChange}
					error={formik.errors.re_new_password}
				/>
				<Button
					type="submit"
					content="Reestablecer mi contraseña"
					primary
					fluid
				/>
			</Form>
		</div>
	);
}

function initialValues(uid, token) {
	return {
		uid: uid || '',
		token: token || '',
		new_password: '',
		re_new_password: '',
	};
}

function validationSchema() {
	return {
		uid: Yup.string().required(true),
		token: Yup.string().required(true),
		new_password: Yup.string().required(true),
		re_new_password: Yup.string().required(true),
	};
}
