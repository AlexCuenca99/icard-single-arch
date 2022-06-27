import React, { useState } from 'react';
import moment from 'moment';
import { map, size } from 'lodash';
import { Table, Button, Icon } from 'semantic-ui-react';
// Componentes
import { ModalBasic } from '../../../Common';
import { PaymentFoodList } from '../../../Admin';
// Assets
import './TablePayments.scss';
import { ReactComponent as NoContentSVG } from '../../../../assets/svg/historico-de-pagos/dashboard.svg';

export function TablePayments(props) {
	const { payments } = props;

	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(null);
	const [contentModal, setContentModal] = useState(null);

	const getIconPaymentName = (key) => {
		if (key === '1') return 'credit card outline';
		if (key === '0') return 'money bill alternate outline';

		return null;
	};

	const openCloseModal = () => setShowModal((prev) => !prev);

	const showPaymentDetails = (payment) => {
		setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`);
		setContentModal(<PaymentFoodList payment={payment} />);
		openCloseModal();
	};

	return (
		<>
			{size(payments) === 0 ? (
				<div className="table-payments-no-content">
					<NoContentSVG
						style={{
							width: '500px',
							height: '400px',
							textAlign: 'center',
						}}
					/>
					<span>Sin contenido</span>
				</div>
			) : (
				<Table className="table-payments-admin">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>Mesa</Table.HeaderCell>
							<Table.HeaderCell>Total</Table.HeaderCell>
							<Table.HeaderCell>Tipo de pago</Table.HeaderCell>
							<Table.HeaderCell>Fecha</Table.HeaderCell>
							<Table.HeaderCell></Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{map(payments, (payment, index) => (
							<Table.Row key={index}>
								<Table.Cell>{payment.id}</Table.Cell>
								<Table.Cell>
									{payment.table_data.number}
								</Table.Cell>
								<Table.Cell>$ {payment.amount}</Table.Cell>
								<Table.Cell>
									<Icon
										name={getIconPaymentName(
											payment.payment_type
										)}
									/>
								</Table.Cell>
								<Table.Cell>
									{moment(payment.created).format(
										'DD/MM/YYYY - HH:MM:SS'
									)}
								</Table.Cell>
								<Table.Cell text-align="right">
									<Button
										icon
										onClick={() =>
											showPaymentDetails(payment)
										}
									>
										<Icon name="eye" />
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			)}
			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={titleModal}
				children={contentModal}
			/>
		</>
	);
}
