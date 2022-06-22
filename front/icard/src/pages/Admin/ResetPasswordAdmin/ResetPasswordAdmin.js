import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
// Componentes
import { ResetPasswordForm } from '../../../components/Admin';
// Assets
import LogoImg from '../../../assets/img/logos/my-icard.png';
import './ResetPasswordAdmin.scss';

export function ResetPasswordAdmin() {
	return (
		<div className="reset-password-admin">
			<div className="reset-password-admin__quarter-circle"></div>

			<div className="reset-password-admin__content">
				<Link to={'/'}>
					<Image src={LogoImg} size="tiny" centered />
				</Link>

				<h1>Reestablezca su contraseña</h1>
				<h2>
					Por favor ingrese su correo electrónico para recibir un link
					de reestablecimiento.
				</h2>

				<ResetPasswordForm />
				<div>
					<Link to={'/admin'}>Volver a Iniciar Sesión</Link>
				</div>
			</div>
		</div>
	);
}
