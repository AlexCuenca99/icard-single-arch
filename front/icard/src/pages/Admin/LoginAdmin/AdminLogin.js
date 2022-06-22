import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../../components/Admin';
import LogoImg from '../../../assets/img/logos/my-icard.png';
import './AdminLogin.scss';

export function AdminLogin() {
	return (
		<div className="login-admin">
			<div className="login-admin__quarter-circle"></div>
			<div className="login-admin__content">
				<Link to={'/'}>
					<Image src={LogoImg} size="tiny" centered />
				</Link>
				<h1>Inicie sesión</h1>
				<h2>Administre su negocio y observe su estado.</h2>
				<LoginForm />
				<div>
					<Link to={'/reset-password'}>¿Olvidó su contraseña?</Link>
					<div>
						¿Aún no tiene una cuenta?
						<Link to={'/signup'}> Créela ahora.</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
