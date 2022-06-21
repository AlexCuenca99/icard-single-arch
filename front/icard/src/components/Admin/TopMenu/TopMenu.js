import React from 'react';

// Lógica
import { useAuth } from '../../../hooks';

import './TopMenu.scss';
import { Icon, Menu } from 'semantic-ui-react';

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
				<p>iCard Administradores</p>
			</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item>Bienvenido, {renderName()}</Menu.Item>
				<Menu.Item onClick={logout}>
					<Icon name="sign-out" />
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}
