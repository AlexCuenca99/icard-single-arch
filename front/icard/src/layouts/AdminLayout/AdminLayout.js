import React from 'react';
import { useAuth } from '../../hooks';
import './AdminLayout.scss';
import { TopMenu, SideMenu } from '../../components/Admin';
import {
	AdminLogin,
	SignUpAdmin,
	ResetPasswordAdmin,
	ResetPasswordConfirmAdmin,
	ActivateAdmin,
} from '../../pages/Admin';
import { useLocation, matchPath } from 'react-router-dom';
import routesAdmin from '../../routes/routes.admin';

export function AdminLayout(props) {
	const { children } = props;
	const { auth } = useAuth();
	const { pathname } = useLocation();

	// Hallar el path de la ruta actual
	const currentRoute = routesAdmin.find((routeAdmin) =>
		matchPath(routeAdmin.path, pathname)
	);

	// Devolver a pantalla de login
	if (!auth) {
		switch (currentRoute.path) {
			case '/admin':
				return <AdminLogin />;
			case '/admin/usuarios':
				return <AdminLogin />;
			case '/signup':
				return <SignUpAdmin />;
			case '/reset-password':
				return <ResetPasswordAdmin />;
			case '/password/reset/confirm/:uid/:token':
				return <ResetPasswordConfirmAdmin />;
			case '/activate/:uid/:token':
				return <ActivateAdmin />;
		}
	}

	return (
		<div className="admin-layout">
			<div className="admin-layout__menu">
				<TopMenu />
			</div>

			<div className="admin-layout__main-content">
				<SideMenu>{children}</SideMenu>
			</div>
		</div>
	);
}
