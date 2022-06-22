import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
// Componentes
import { SignUpForm, CheckoutForm } from '../../../components/Admin';
// Assets
import './SignUpAdmin.scss';
import LogoImg from '../../../assets/img/logos/my-icard.png';

export function SignUpAdmin() {
	return (
		<div className="signup-admin">
			<div className="signup-admin__quarter-circle"></div>

			<div className="signup-admin__content">
				<Link to={'/'}>
					<Image src={LogoImg} size="tiny" centered />
				</Link>

				<h1>¡Bienvenido!</h1>
				<h2>Ingrese sus datos para crear una cuenta</h2>
				<SignUpForm />
				{/* <CheckoutForm /> */}
				<div>
					Volver a<Link to={'/admin'}> Iniciar sesión</Link>
				</div>
			</div>
		</div>
	);
}
