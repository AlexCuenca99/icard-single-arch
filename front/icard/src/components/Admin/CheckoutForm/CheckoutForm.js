import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { saveStripeInfoApi } from '../../../api/payment';
import { toast } from 'react-toastify';
import './CheckoutForm.scss';

export function CheckoutForm() {
	const [error, setError] = useState(null);
	const [email, setEmail] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	// Handle real-time validation errors from the CardElement.
	const handleChange = (event) => {
		if (event.error) {
			setError(event.error.message);
		} else {
			setError(null);
		}
	};
	// Handle form submission.
	const handleSubmit = async (event) => {
		event.preventDefault();
		const card = elements.getElement(CardElement);

		// add these lines
		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: 'card',
			card: card,
		});

		const data = {
			email: email,
			payment_method_id: paymentMethod.id,
		};

		console.log(data);
		try {
			await saveStripeInfoApi(data);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="stripe-form">
			<div className="form-row">
				<label htmlFor="email">Correo electrónico</label>
				<input
					className="form-input"
					id="email"
					name="name"
					type="email"
					placeholder="jenny.rosen@example.com"
					required
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			</div>
			<div className="form-row">
				<label htmlFor="card-element">
					Tarjeta de crédito o débito
				</label>
				<CardElement id="card-element" onChange={handleChange} />
				<div className="card-errors" role="alert">
					{error}
				</div>
			</div>
			<button type="submit" className="submit-btn">
				Enviar pago
			</button>
		</form>
	);
}
