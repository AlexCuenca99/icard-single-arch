import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../../components/Admin';
import './AdminLogin.scss';

export function AdminLogin() {
	return (
		<div className="login-admin">
			<div className="login-admin__content">
				<h1>Inicie sesión</h1>
				<LoginForm />

				<div>
					<Link to={'/reset-password'}>¿Olvidó su contraseña?</Link>
					<Link to={'/signup'}>
						¿Aún no tiene una cuenta? Créela ahora.
					</Link>
				</div>
			</div>
		</div>
	);
}
