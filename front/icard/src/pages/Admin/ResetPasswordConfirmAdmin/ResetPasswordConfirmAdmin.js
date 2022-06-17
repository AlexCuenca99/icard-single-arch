import React from 'react';
import { useParams } from 'react-router-dom';
import { ResetPasswordConfirmForm } from '../../../components/Admin';
import './ResetPasswordConfirmAdmin.scss';

export function ResetPasswordConfirmAdmin() {
	const { uid, token } = useParams();

	return (
		<div className="reset-password-confirm-admin">
			<div className="reset-password-confirm-admin__content">
				<h1>Ingrese una nueva contraseña</h1>
				<ResetPasswordConfirmForm uid={uid} token={token} />
			</div>
		</div>
	);
}
