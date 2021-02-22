import React from "react";
import styled from "styled-components";

const Button = ({ text, onClick, type }) =>
  type === "modal" ? (
    <ButtonElement onClick={onClick}>{text}</ButtonElement>
  ) : (
    <ButtonElement>{text}</ButtonElement>
  );

const ButtonElement = styled.button`
  padding: 0.5rem 3rem;
  display: block;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 3px;
  width: 40%;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export default Button;
