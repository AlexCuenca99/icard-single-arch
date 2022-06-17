import React from 'react';
import './SideMenu.scss';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';

export function SideMenu(props) {
	const { children } = props;
	const { pathname } = useLocation();

	return (
		<div className="side-menu-admin">
			<MenuLeft pathname={pathname} />
			<div className="content">{children}</div>
		</div>
	);
}

function MenuLeft(props) {
	const { pathname } = props;
	const { auth } = useAuth();

	return (
		<Menu fixed="left" borderless className="side" vertical>
			<Menu.Item as={Link} to={'/admin'} active={pathname === '/admin'}>
				<Icon name="home" /> Pedidos
			</Menu.Item>
			<Menu.Item
				as={Link}
				to={'/admin/mesas'}
				active={pathname === '/admin/mesas'}
			>
				<Icon name="table" /> Mesas
			</Menu.Item>
			<Menu.Item
				as={Link}
				to={'/admin/historico-pagos'}
				active={pathname === '/admin/historico-pagos'}
			>
				<Icon name="history" /> Historico de Pagos
			</Menu.Item>
			<Menu.Item
				as={Link}
				to={'/admin/categorias'}
				active={pathname === '/admin/categorias'}
			>
				<Icon name="folder" /> Categorias
			</Menu.Item>
			<Menu.Item
				as={Link}
				to={'/admin/alimentos'}
				active={pathname === '/admin/alimentos'}
			>
				<Icon name="food" /> Alimentos
			</Menu.Item>

			{/* Quitar administración de usuarios a los no administradores */}
			{auth.me.data?.is_staff && (
				<Menu.Item
					as={Link}
					to={'/admin/usuarios'}
					active={pathname === '/admin/usuarios'}
				>
					<Icon name="users" /> Usuarios
				</Menu.Item>
			)}
		</Menu>
	);
}
