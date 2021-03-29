import React from "react";
import styled from "styled-components";
import { PresignedPost } from "aws-sdk/clients/s3";
import { device } from "../StyleComponent/responsiveDevice";

const Button = ({ text, onClick, type, size, isActive, style, purpose }) =>
  type === "modal" ? (
    <ButtonElement
      onClick={(e) => {
        onClick(e);
      }}
      style={{ ...style }}
      type={type}
    >
      {text}
    </ButtonElement>
  ) : type === "add_lesson" ? (
    <ButtonElement
      size={size}
      onClick={(e) => {
        onClick(e);
      }}
      disabled={!isActive}
      style={{ ...style }}
      type={type}
    >
      {text}
    </ButtonElement>
  ) : (
    <ButtonElement
      size={size}
      onClick={(e) => {
        onClick(e);
      }}
      style={{ ...style }}
      type={type}
      purpose={purpose}
    >
      {text}
    </ButtonElement>
  );

const ButtonElement = styled.button`
  padding: ${({ size }) => (size === "med" ? "1rem 3rem" : ".5rem 1rem")};
  /* display: block; */
  background-color: #7662a5;
  color: white;
  border: none;
  border-radius: 5px;
  width: 250px;
  height: 50px;
  text-transform: capitalize;
  font-size: 20px;
  line-height: 24px;
  font-family: "GothamRoundedNormal";
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.mobileM} {
    width: 300px;
    height: 70px;
  }
  @media ${device.laptop} {
    width: ${({ type }) => (type === "modal" ? "auto" : "220")}px;
    height: ${({ type }) => (type === "modal" ? "40" : "50")}px;
    font-size: ${({ type }) => (type === "modal" ? "16" : "20")}px;;
    padding: ${({ type }) => (type === "modal" ? "0" : "1rem 3rem")};
    background-color: ${({ purpose }) =>
    purpose === "delete" ? "white" : "#7662a5"};
    color: ${({ purpose }) => (purpose === "delete" ? "black" : "white")};

    border: ${({ purpose }) =>

      purpose === "delete" ? "2px solid orange" : "none"};
    align-self: center;

  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

export default Button;
