// Escenciales
import React from 'react';
import { Helmet } from 'react-helmet';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';

// Componentes
import { ToastContainer } from 'react-toastify';
import { Navigation } from './routes';
import { AuthProvider } from './context';

const stripePromise = loadStripe(
	'pk_test_51KF8BCGdOLNeSqEVaDjKhQgLRCOlGYEtyQOIEQHTMlJUSdniF2p0cA6bW8P9OBeqATerWCKeWfMlpnimQErSOibE00qOF7bs9N'
);

export default function App() {
	return (
		<>
			<Helmet>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
					rel="stylesheet"
				/>
			</Helmet>
			<Elements stripe={stripePromise}>
				<AuthProvider>
					<Navigation />
					<ToastContainer
						position="bottom-center"
						autoClose={5000}
						hideProgressBar
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover={false}
					/>
				</AuthProvider>
			</Elements>
		</>
	);
}
