import React from 'react';
import { Link } from 'react-router-dom';
import { ResetPasswordForm } from '../../../components/Admin';
import './ResetPasswordAdmin.scss';

export function ResetPasswordAdmin() {
	return (
		<div className="reset-password-admin">
			<div className="reset-password-admin__content">
				<h1>Reestablecer contraseña</h1>
				<ResetPasswordForm />
				<div>
					<Link to={'/admin'}>Volver a Iniciar Sesión</Link>
				</div>
			</div>
		</div>
	);
}
