import React from "react";
import styled from "styled-components";

const Image = ({ src, alt }) => {
  return (
    <div>
      <ImageElement src={src} alt={alt} />
    </div>
  );
};

const ImageElement = styled.img`
  width: 100%;
  height: auto;
  align-self: center;
`;

export default Image;
