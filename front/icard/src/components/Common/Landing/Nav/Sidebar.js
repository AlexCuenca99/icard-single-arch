import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
// Assets
import CloseIcon from '../../../../assets/svg/CloseIcon';
import LogoIcon from '../../../../assets/img/logos/my-icard-dark.png';

export function Sidebar({ sidebarOpen, toggleSidebar }) {
	return (
		<Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
			<SidebarHeader className="flexSpaceCenter">
				<div className="flexNullCenter">
					<Image src={LogoIcon} size="tiny" />
					{/* <h1
						className="whiteColor font20"
						style={{ marginLeft: '15px' }}
					>
						fanatic
					</h1> */}
				</div>
				<CloseBtn
					onClick={() => toggleSidebar(!sidebarOpen)}
					className="animate pointer"
				>
					<CloseIcon />
				</CloseBtn>
			</SidebarHeader>

			<UlStyle className="flexNullCenter flexColumn">
				<li className="semiBold font15 pointer">
					<Link
						onClick={() => toggleSidebar(!sidebarOpen)}
						activeClass="active"
						className="whiteColor"
						style={{ padding: '10px 15px' }}
						to="home"
						spy={true}
						smooth={true}
						offset={-60}
					>
						Inicio
					</Link>
				</li>
				<li className="semiBold font15 pointer">
					<Link
						onClick={() => toggleSidebar(!sidebarOpen)}
						activeClass="active"
						className="whiteColor"
						style={{ padding: '10px 15px' }}
						to="services"
						spy={true}
						smooth={true}
						offset={-60}
					>
						Servicios
					</Link>
				</li>
				<li className="semiBold font15 pointer">
					<Link
						onClick={() => toggleSidebar(!sidebarOpen)}
						activeClass="active"
						className="whiteColor"
						style={{ padding: '10px 15px' }}
						to="blog"
						spy={true}
						smooth={true}
						offset={-60}
					>
						Blog
					</Link>
				</li>
				<li className="semiBold font15 pointer">
					<Link
						onClick={() => toggleSidebar(!sidebarOpen)}
						activeClass="active"
						className="whiteColor"
						style={{ padding: '10px 15px' }}
						to="pricing"
						spy={true}
						smooth={true}
						offset={-60}
					>
						Precios
					</Link>
				</li>
				<li className="semiBold font15 pointer">
					<Link
						onClick={() => toggleSidebar(!sidebarOpen)}
						activeClass="active"
						className="whiteColor"
						style={{ padding: '10px 15px' }}
						to="contact"
						spy={true}
						smooth={true}
						offset={-60}
					>
						Contacto
					</Link>
				</li>
			</UlStyle>
			<UlStyle className="flexSpaceCenter">
				<li className="semiBold font15 pointer">
					<a
						href="/admin"
						style={{ padding: '10px 30px 10px 0' }}
						className="whiteColor"
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
						Probar ahora
					</a>
				</li>
			</UlStyle>
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	width: 400px;
	height: 100vh;
	position: fixed;
	top: 0;
	padding: 0 30px;
	right: ${(props) => (props.sidebarOpen ? '0px' : '-400px')};
	z-index: 9999;
	@media (max-width: 400px) {
		width: 100%;
	}
`;
const SidebarHeader = styled.div`
	padding: 20px 0;
`;
const CloseBtn = styled.button`
	border: 0px;
	outline: none;
	background-color: transparent;
	padding: 10px;
`;
const UlStyle = styled.ul`
	padding: 40px;
	li {
		margin: 20px 0;
	}
`;
