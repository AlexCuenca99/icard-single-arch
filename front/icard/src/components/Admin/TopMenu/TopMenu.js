import React from 'react';
import { Image, Icon, Menu, Popup } from 'semantic-ui-react';
// Componentes
import { useAuth } from '../../../hooks';
// Assets
import './TopMenu.scss';
import LogoImg from '../../../assets/img/logos/my-icard.png';
import ClienteImg from '../../../assets/img/contact-1.png';

export function TopMenu() {
	const { auth, logout } = useAuth();

	// Verificar si tiene nombre para mostrarlo en el menu
	const renderName = () => {
		if (auth.me?.first_name && auth.me?.last_name) {
			return `${auth.me.first_name} ${auth.me.last_name}`;
		}

		return auth.me?.email;
	};
	return (
		<Menu fixed="top" className="top-menu-admin">
			<Menu.Item className="top-menu-admin__logo">
				<Image src={LogoImg} size="tiny" />
				<p>Administradores</p>
			</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item>
					<Image src={ClienteImg} avatar />
					<div className="top-menu-admin__logo__auth">
						<h5>{renderName()}</h5>
						<br />
						<span>
							{auth.me?.is_staff ? 'Administrador' : 'Usuario'}
						</span>
					</div>
				</Menu.Item>

				<Popup
					trigger={
						<Menu.Item onClick={logout}>
							<Icon name="sign-out" color="red" circular />
						</Menu.Item>
					}
					content="Cerrar sesión"
					position="bottom left"
				/>
			</Menu.Menu>
		</Menu>
	);
}
