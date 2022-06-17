import { AdminLayout, BasicLayout, CommonLayout } from '../layouts';
import {
	OrdersAdmin,
	UsersAdmin,
	CategoriesAdmin,
	FoodAdmin,
	TableAdmin,
	TableDetailsAdmin,
	PaymentsHistory,

	// Auth
	SignUpAdmin,
	ResetPasswordAdmin,
	ResetPasswordConfirmAdmin,
	ActivateAdmin,
} from '../pages/Admin';
import { Home } from '../pages/Common';

const routesAdmin = [
	{
		path: '/',
		layout: BasicLayout,
		component: Home,
	},
	{
		path: '/signup',
		layout: AdminLayout,
		component: OrdersAdmin,
	},
	{
		path: '/reset-password',
		layout: AdminLayout,
		component: OrdersAdmin,
	},
	{
		path: '/password/reset/confirm/:uid/:token',
		layout: AdminLayout,
		component: OrdersAdmin,
	},
	{
		path: '/activate/:uid/:token',
		layout: AdminLayout,
		component: OrdersAdmin,
	},
	{
		path: '/admin',
		layout: AdminLayout,
		component: OrdersAdmin,
	},
	{
		path: '/admin/usuarios',
		layout: AdminLayout,
		component: UsersAdmin,
	},
	{
		path: '/admin/categorias',
		layout: AdminLayout,
		component: CategoriesAdmin,
	},
	{
		path: '/admin/alimentos',
		layout: AdminLayout,
		component: FoodAdmin,
	},
	{
		path: '/admin/mesas',
		layout: AdminLayout,
		component: TableAdmin,
	},
	{
		path: '/admin/mesa/:id',
		layout: AdminLayout,
		component: TableDetailsAdmin,
	},
	{
		path: '/admin/historico-pagos',
		layout: AdminLayout,
		component: PaymentsHistory,
	},
];

export default routesAdmin;
