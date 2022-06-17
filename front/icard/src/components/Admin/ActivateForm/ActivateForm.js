import React from 'react';
import { Button } from 'semantic-ui-react';
import './ActivateForm.scss';

export function ActivateForm(props) {
	const { data, onActivateAccount } = props;

	return (
		<div className="activate-form">
			<Button primary onClick={() => onActivateAccount(data)}>
				Activar
			</Button>
		</div>
	);
}
