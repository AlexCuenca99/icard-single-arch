import React, { useEffect } from 'react';
import { Container, Button, Icon } from 'semantic-ui-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTable } from '../../hooks';
import './ClientLayout.scss';

export function ClientLayout(props) {
	const { children } = props;
	const { getTableByNumber } = useTable();
	const { tableNumber } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const exists = await getTableByNumber(tableNumber);
			if (!exists) closeTable();
		})();
	}, [tableNumber]);

	const closeTable = () => {
		navigate('/cliente');
	};

	const goToCart = () => {
		navigate(`/cliente/${tableNumber}/carrito`);
	};

	const goToOrders = () => {
		navigate(`/cliente/${tableNumber}/ordenes`);
	};

	return (
		<div className="client-layout-bg">
			<Container className="client-layout">
				<div className="client-layout__header">
					<Link to={`/cliente/${tableNumber}`}>
						<h1>My iCard</h1>
					</Link>
					<span>Mesa {tableNumber}</span>
					<div>
						<Button icon onClick={goToCart}>
							<Icon name="shop" />
						</Button>
						<Button icon onClick={goToOrders}>
							<Icon name="list" />
						</Button>
						<Button icon onClick={closeTable}>
							<Icon name="sign-out" />
						</Button>
					</div>
				</div>
				<div className="client-layout__content">{children}</div>
			</Container>
		</div>
	);
}
