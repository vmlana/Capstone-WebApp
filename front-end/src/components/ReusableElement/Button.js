import React from "react";
import styled from "styled-components";
import { PresignedPost } from "aws-sdk/clients/s3";
import { device } from '../StyleComponent/responsiveDevice';

const Button = ({ text, onClick, type, size, isActive, style }) =>
	type === "modal" ? (
		<ButtonElement onClick={(e) => { e.preventDefault(); onClick(e) }} style={{ ...style }}>
			{text}
		</ButtonElement>
	) : (
		type === "add_lesson" ? (
			<ButtonElement size={size} onClick={(e) => { e.preventDefault(); onClick(e) }} disabled={!isActive} style={{ ...style }}>
				{text}
			</ButtonElement>
		) : (
			<ButtonElement
				size={size} onClick={(e) => { e.preventDefault(); onClick(e) }} style={{ ...style }}>
				{text}
			</ButtonElement>
		)
	);

const ButtonElement = styled.button`
	padding: ${({ size }) => (size === "med" ? "1rem 3rem" : ".5rem 1rem")};
	/* display: block; */
	background-color: #7662A5;
	color: white;
	border: none;
	border-radius: 5px;
	width: 250px;
	height: 70px;
	text-transform: capitalize;
	font-size: 20px;
	line-height: 24px;
	font-family: 'GothamRoundedNormal';

	@media ${device.mobileM} {
		width: 300px;
		height: 70px;
	}

	&:focus {
		outline: none;
		box-shadow: none;
	}

	&:disabled,
	&[disabled]{
		border: 1px solid #999999;
		background-color: #cccccc;
		color: #666666;
		cursor: not-allowed;
	}
`;

export default Button;
