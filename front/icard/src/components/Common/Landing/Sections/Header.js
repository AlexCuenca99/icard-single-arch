import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
// Components
import { Button as FullButton } from '../Buttons/Button';
// Assets
import HeaderImage from '../../../../assets/img/header-img.png';
import QuotesIcon from '../../../../assets/svg/Quotes';
import Dots from '../../../../assets/svg/Dots';
import animationData from '../../../../assets/lotties/header/featured_products';

export function Header() {
	const navigate = useNavigate();

	const goToSignUp = () => {
		navigate('/signup');
	};

	// Animación lottie
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<Wrapper id="home" className="container flexSpaceCenter">
			<LeftSide className="flexCenter">
				<div>
					<h1 className="extraBold font60">
						¿Pedido de mesas mediante QR?
					</h1>
					<HeaderP className="font13 semiBold">
						Sus clientes pueden hacer pedidos desde la comodidad de
						su mesa simplemente escaneando un código QR.
					</HeaderP>
					<BtnWrapper>
						<FullButton title="Probar ahora" action={goToSignUp} />
					</BtnWrapper>
				</div>
			</LeftSide>
			<RightSide>
				<ImageWrapper>
					{/* <Img
						className="radius8"
						src={HeaderImage}
						alt="office"
						style={{ zIndex: 9 }}
					/> */}
					<Lottie options={defaultOptions} height={607} width={426} />
					<QuoteWrapper className="flexCenter darkBg radius8">
						<QuotesWrapper>
							<QuotesIcon />
						</QuotesWrapper>
						<div>
							<p className="font15 whiteColor">
								<em>
									"Desde el principio, "construir una forma
									mejor" ha sido un valor fundamental. Cuando
									no hay una solución delante de ti, crea
									una".
								</em>
							</p>
							<p
								className="font13 orangeColor textRight"
								style={{ marginTop: '10px' }}
							>
								Ryan Holmes
							</p>
						</div>
					</QuoteWrapper>
					<DotsWrapper>
						<Dots />
					</DotsWrapper>
				</ImageWrapper>
				<GreyDiv className="lightBg"></GreyDiv>
			</RightSide>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	padding-top: 80px;
	width: 100%;
	min-height: 840px;
	@media (max-width: 960px) {
		flex-direction: column;
	}
`;
const LeftSide = styled.div`
	width: 50%;
	height: 100%;
	@media (max-width: 960px) {
		width: 100%;
		order: 2;
		margin: 50px 0;
		text-align: center;
	}
	@media (max-width: 560px) {
		margin: 80px 0 50px 0;
	}
`;
const RightSide = styled.div`
	width: 50%;
	height: 100%;
	@media (max-width: 960px) {
		width: 100%;
		order: 1;
		margin-top: 30px;
	}
`;
const HeaderP = styled.div`
	max-width: 470px;
	padding: 15px 0 50px 0;
	line-height: 1.5rem;
	@media (max-width: 960px) {
		padding: 15px 0 50px 0;
		text-align: center;
		max-width: 100%;
	}
`;
const BtnWrapper = styled.div`
	max-width: 190px;
	@media (max-width: 960px) {
		margin: 0 auto;
	}
`;
const GreyDiv = styled.div`
	width: 30%;
	height: 700px;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 0;
	@media (max-width: 960px) {
		display: none;
	}
`;
const ImageWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	position: relative;
	z-index: 9;
	@media (max-width: 960px) {
		width: 100%;
		justify-content: center;
	}
`;
const Img = styled.img`
	@media (max-width: 560px) {
		width: 80%;
		height: auto;
	}
`;
const QuoteWrapper = styled.div`
	position: absolute;
	left: 0;
	bottom: 50px;
	max-width: 330px;
	padding: 30px;
	z-index: 99;
	@media (max-width: 960px) {
		left: 20px;
	}
	@media (max-width: 560px) {
		bottom: -50px;
	}
`;
const QuotesWrapper = styled.div`
	position: absolute;
	left: -20px;
	top: -10px;
`;
const DotsWrapper = styled.div`
	position: absolute;
	right: -100px;
	bottom: 100px;
	z-index: 2;
	@media (max-width: 960px) {
		right: 100px;
	}
	@media (max-width: 560px) {
		display: none;
	}
`;
