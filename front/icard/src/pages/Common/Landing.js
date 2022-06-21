import React from 'react';
// Sections
import { TopNavbar } from '../../components/Common/Landing/Nav/TopNavbar';
import { Header } from '../../components/Common/Landing/Sections/Header';
import { Services } from '../../components/Common/Landing/Sections/Services';
import { Blog } from '../../components/Common/Landing/Sections/Blog';
import { Pricing } from '../../components/Common/Landing/Sections/Pricing';
import { Contact } from '../../components/Common/Landing/Sections/Contact';
import { Footer } from '../../components/Common/Landing/Sections/Footer';

export function Landing() {
	return (
		<>
			<TopNavbar />
			<Header />
			<Services />
			<Blog />
			<Pricing />
			<Contact />
			<Footer />
		</>
	);
}
