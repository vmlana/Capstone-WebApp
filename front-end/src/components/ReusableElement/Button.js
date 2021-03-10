import React from "react";
import styled from "styled-components";

const Button = ({ text, onClick, type, size, isActive }) =>
	type === "modal" ? (
		<ButtonElement onClick={onClick}>
			{text}
		</ButtonElement>
	) : (
			type === "add_lesson" ? (
				<ButtonElement size={size} onClick={onClick} disabled={!isActive}>
					{text}
				</ButtonElement>
			) : (
					<ButtonElement size={size} onClick={onClick}>
						{text}
					</ButtonElement>
				)
		);

const ButtonElement = styled.button`
	padding: ${({ size }) => (size === "med" ? "1rem 3rem" : ".5rem 1rem")};
	display: block;
	background-color: grey;
	color: white;
	border: none;
	border-radius: 3px;
	width: 40%;
	/* text-transform: uppercase; */

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
