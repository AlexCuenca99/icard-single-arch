import React from 'react';
import { useNavigate } from 'react-router-dom';
import { activateAccountApi } from '../../../api/user';
import { ActivateForm } from '../../../components/Admin';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ActivateAdmin.scss';

export function ActivateAdmin() {
	const data = useParams();
	const navigate = useNavigate();

	const onActivateAccount = async (data) => {
		try {
			await activateAccountApi(data);
			navigate('/admin');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="activate-admin">
			<div className="activate-admin__content">
				<h1>Active su cuenta:</h1>
				<ActivateForm
					data={data}
					onActivateAccount={onActivateAccount}
				/>
			</div>
		</div>
	);
}
