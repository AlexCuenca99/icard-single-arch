import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
// Requests
import { signupUserApi } from '../../../api/user';
// Assets
import './SignUpForm.scss';

export function SignUpForm(props) {
	const navigate = useNavigate();
	const { nextStep } = props;
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				nextStep();
				console.log(nextStep);
				await signupUserApi(formValue);
				//navigate('/admin');
			} catch (error) {
				toast.error(error.message);
			}
		},
	});

	return (
		<>
			<Form className="signup-form-admin" onSubmit={formik.handleSubmit}>
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

				{/* <Button type="submit" content="Crear cuenta" primary fluid /> */}
				<Button type="submit" content="Siguiente" primary fluid />
			</Form>
		</>
	);
}

function initialValues() {
	return {
		email: '',
		username: '',
		password: '',
		re_password: '',
	};
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
		username: Yup.string().required(true),
		password: Yup.string().required(true),
		re_password: Yup.string().required(true),
	};
}
