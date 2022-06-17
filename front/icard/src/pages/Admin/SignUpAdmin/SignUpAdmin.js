import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../../../components/Admin';
import './SignUpAdmin.scss';

export function SignUpAdmin() {
	return (
		<div className="signup-admin">
			<div className="signup-admin__content">
				<h1>Reestablezca su contraseña</h1>
				<SignUpForm />
				<div>
					Volver a<Link to={'/admin'}> Iniciar sesión</Link>
				</div>
			</div>
		</div>
	);
}
