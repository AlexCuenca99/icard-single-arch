import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm, CheckoutForm } from '../../../components/Admin';
import './SignUpAdmin.scss';

export function SignUpAdmin() {
	return (
		<div className="signup-admin">
			<div className="signup-admin__content">
				<h1>¡Bienvenido a My iCard!</h1>
				<h2>Ingrese sus datos para crear su cuenta</h2>
				<SignUpForm />
				<CheckoutForm />
				<div>
					Volver a<Link to={'/admin'}> Iniciar sesión</Link>
				</div>
			</div>
		</div>
	);
}
