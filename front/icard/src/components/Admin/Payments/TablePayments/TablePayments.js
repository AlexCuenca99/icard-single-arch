import React, { useState } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import moment from 'moment';
import { ModalBasic } from '../../../Common';
import { PaymentFoodList } from '../../../Admin';
import './TablePayments.scss';

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
							<Table.Cell>{payment.table_data.number}</Table.Cell>
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
									onClick={() => showPaymentDetails(payment)}
								>
									<Icon name="eye" />
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={titleModal}
				children={contentModal}
			/>
		</>
	);
}
