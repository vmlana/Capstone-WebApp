import React from "react";
import styled from "styled-components";

function Button({ text }) {
  return <ButtonElement>{text}</ButtonElement>;
}

const ButtonElement = styled.button`
  padding: 0.5rem 3rem;
  display: block;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 3px;
  width: 40%;
  text-transform: uppercase;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export default Button;