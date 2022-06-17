import React from 'react';
import { useAuth } from '../hooks';
import './AdminLayout/AdminLayout.scss';
import { TopMenu, SideMenu } from '../components/Admin';
import { SignUpAdmin } from '../pages/Admin';

export function CommonLayout(props) {
	const { children } = props;
	const { auth } = useAuth();

	// Si no está logueado, devolver SignUp
	if (!auth) return <SignUpAdmin />;

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
