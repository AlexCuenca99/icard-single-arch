import React from 'react';
import styled from 'styled-components';

export function Button({ title, action, border }) {
	return (
		<Wrapper
			className="animate pointer radius8"
			onClick={action ? () => action() : null}
			border={border}
		>
			{title}
		</Wrapper>
	);
}

const Wrapper = styled.button`
	border: 1px solid ${(props) => (props.border ? '#707070' : '#F2A71E')};
	background-color: ${(props) => (props.border ? 'transparent' : '#F2A71E')};
	width: 100%;
	padding: 15px;
	outline: none;
	color: ${(props) => (props.border ? '#707070' : '#fff')};
	font-family: 'Lato';
	:hover {
		background-color: ${(props) =>
			props.border ? 'transparent' : '#F2791D'};
		border: 1px solid #f2a71e;
		color: ${(props) => (props.border ? '#F2A71E' : '#fff')};
	}
`;
