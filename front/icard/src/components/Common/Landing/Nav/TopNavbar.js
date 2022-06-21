import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { Image } from 'semantic-ui-react';
// Components
import { Sidebar } from './Sidebar';
import { Backdrop } from '../Elements/Backdrop';
// Assets
import LogoIcon from '../../../../assets/img/logos/my-icard.png';
import BurgerIcon from '../../../../assets/svg/BurgerIcon';

export function TopNavbar() {
	const [y, setY] = useState(window.scrollY);
	const [sidebarOpen, toggleSidebar] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => setY(window.scrollY));
		return () => {
			window.removeEventListener('scroll', () => setY(window.scrollY));
		};
	}, [y]);
	return (
		<>
			<Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
			{sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
			<Wrapper
				className="flexCenter animate whiteBg"
				style={y > 100 ? { height: '60px' } : { height: '80px' }}
			>
				<NavInner className="container flexSpaceCenter">
					<Link
						className="pointer flexNullCenter"
						to="/"
						smooth={true}
					>
						<Image src={LogoIcon} size="tiny" />
						{/* <LogoIcon /> */}
						{/* <h1
							style={{ marginLeft: '15px' }}
							className="font20 extraBold"
						>
							My iCard
						</h1> */}
					</Link>
					<BurderWrapper
						className="pointer"
						onClick={() => toggleSidebar(!sidebarOpen)}
					>
						<BurgerIcon />
					</BurderWrapper>
					<UlWrapper className="flexNullCenter">
						<li className="semiBold font15 pointer">
							<Link
								activeClass="active"
								style={{ padding: '10px 15px' }}
								to="home"
								spy={true}
								smooth={true}
								offset={-80}
							>
								Inicio
							</Link>
						</li>
						<li className="semiBold font15 pointer">
							<Link
								activeClass="active"
								style={{ padding: '10px 15px' }}
								to="services"
								spy={true}
								smooth={true}
								offset={-80}
							>
								Servicios
							</Link>
						</li>
						<li className="semiBold font15 pointer">
							<Link
								activeClass="active"
								style={{ padding: '10px 15px' }}
								to="blog"
								spy={true}
								smooth={true}
								offset={-80}
							>
								Blog
							</Link>
						</li>
						<li className="semiBold font15 pointer">
							<Link
								activeClass="active"
								style={{ padding: '10px 15px' }}
								to="pricing"
								spy={true}
								smooth={true}
								offset={-80}
							>
								Precios
							</Link>
						</li>
						<li className="semiBold font15 pointer">
							<Link
								activeClass="active"
								style={{ padding: '10px 15px' }}
								to="contact"
								spy={true}
								smooth={true}
								offset={-80}
							>
								Contacto
							</Link>
						</li>
					</UlWrapper>
					<UlWrapperRight className="flexNullCenter">
						<li className="semiBold font15 pointer">
							<a
								href="/admin"
								style={{ padding: '10px 30px 10px 0' }}
							>
								Ir al administrador
							</a>
						</li>
						<li className="semiBold font15 pointer flexCenter">
							<a
								href="/signup"
								className="radius8 lightBg"
								style={{ padding: '10px 15px' }}
							>
								Registrarse
							</a>
						</li>
					</UlWrapperRight>
				</NavInner>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.nav`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
`;
const NavInner = styled.div`
	position: relative;
	height: 100%;
`;
const BurderWrapper = styled.button`
	outline: none;
	border: 0px;
	background-color: transparent;
	height: 100%;
	padding: 0 15px;
	display: none;
	@media (max-width: 760px) {
		display: block;
	}
`;
const UlWrapper = styled.ul`
	display: flex;
	@media (max-width: 760px) {
		display: none;
	}
`;
const UlWrapperRight = styled.ul`
	@media (max-width: 760px) {
		display: none;
	}
`;
