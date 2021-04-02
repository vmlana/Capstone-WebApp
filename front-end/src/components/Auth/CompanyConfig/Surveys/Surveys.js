import React from 'react';
import styled from 'styled-components';

import backImage from "../../../../assets/bottom-of-page.png";
import { device } from '../../../StyleComponent/responsiveDevice';

const Surveys = () => {
    return (
        <BackImageWrapperDiv>
            <Container>
                <MessageText>Sorry, the Survey Page is still under construction! &#128679;</MessageText>
            </Container>
        </BackImageWrapperDiv>
    );
};

const BackImageWrapperDiv = styled.div`
  @media ${device.laptop} {
    background-image: url(${backImage});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center bottom;
    min-height: unset
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
`;

const MessageText = styled.p`
    font-size: 24px;
    font-family: 'GothamRoundedBook', sans-serif;
    color: #707070;
    line-height: 1.5;
    padding: 2rem;
    top: -3rem;
`;


export default Surveys;