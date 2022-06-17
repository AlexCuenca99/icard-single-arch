import { ClientLayout, BasicLayout } from '../layouts';
import {
	SelectTable,
	Categories,
	Foods,
	Cart,
	OrdersHistory,
} from '../pages/Client';

const routesClient = [
	{
		path: '/cliente',
		layout: BasicLayout,
		component: SelectTable,
	},
	{
		path: '/cliente/:tableNumber',
		layout: ClientLayout,
		component: Categories,
	},
	{
		path: '/cliente/:tableNumber/carrito',
		layout: ClientLayout,
		component: Cart,
	},
	{
		path: '/cliente/:tableNumber/ordenes',
		layout: ClientLayout,
		component: OrdersHistory,
	},
	{
		path: '/cliente/:tableNumber/:idCategory',
		layout: ClientLayout,
		component: Foods,
	},
];

export default routesClient;
