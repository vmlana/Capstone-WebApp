import React from "react";
import styled from "styled-components";

import { colors } from '../StyleComponent/colors';

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
        required={props.required ? true : false}
        placeholder={props.placeholder}
      />
    </Label>
  );
};

const InputElement = styled.input`
  border: solid 1px #ccc;
  border-radius: 5px;
  height: 36px;
  font-size: 16px;
  width: 100%;
  padding: 0.75rem 0.5rem;
  box-sizing: border-box;
  height: 46px;
  margin-bottom: 0.5rem;
  color: ${colors.darkGrey};
  color: #333333;
	padding: 20px;

  :focus {
    outline: #7662a5 auto 1px;
  }
`;

const Label = styled.label`
  margin: 0rem 0rem 0.25rem 0;
  font-size: 18px;
	line-height: 30px;
	color: #707070;
`;

const LabelText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  text-align: left;
`;

export default InputWithLabel;
