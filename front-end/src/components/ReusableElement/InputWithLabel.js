import React from "react";
import styled from "styled-components";

const InputWithLabel = (props) => {
	return (
		<Label style={{ ...props.labelStyle }}>
			<LabelText style={{ ...props.labelTextStyle }}>{props.label}</LabelText>
			<InputElement
				style={{ ...props.inputStyle }}
				type={props.type}
				onChange={props.onChange}
				value={props.value}
				name={props.name}
				required={props.required ? true : false} />
		</Label>
	);
}

const InputElement = styled.input`
	border: solid 1px #ccc;
	border-radius: 5px;
	height: 30px;
	font-size: 16px;
	width: 100%;
	padding: 0.5rem;
	box-sizing: border-box;
	height: 36px;
	margin-bottom: 0.5rem;
`;

const Label = styled.label`
    margin: 0rem 0rem .25rem 0;
`;

const LabelText = styled.p`
    font-size: 1rem;
    margin: .5rem 0;
    text-align: left;
`;

export default InputWithLabel;
