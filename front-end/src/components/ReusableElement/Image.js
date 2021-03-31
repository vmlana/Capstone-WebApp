import React, {useState} from "react";
import styled from "styled-components";

const Image = ({ src, alt }) => {
  const [didLoad, setLoad] = useState(false);

  const style = didLoad ? {} : { visibility: 'hidden' };

  return (
    <div>
      <ImageElement src={src} alt={alt} onLoad={() => setLoad(true)} style={style} />
    </div>
  );
};

const ImageElement = styled.img`
  max-width: 100%;
  height: auto;
  align-self: center;
`;

export default Image;
