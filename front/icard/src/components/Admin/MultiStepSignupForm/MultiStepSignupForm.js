import React from 'react';
// Componentes
import { SignUpForm } from '../SignUpForm';
import { BusinessSignUpForm } from '../BusinessSignUpForm';
// Assets
import './MultiStepSignupForm.scss';

export function MultiStepSignupForm() {
	return (
		<>
			<SignUpForm />
			<BusinessSignUpForm />
		</>
	);
}
