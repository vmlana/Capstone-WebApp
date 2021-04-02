import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '../ReusableElement/Button';

import backImage from "../../assets/bottom-of-page.png";
import { device } from '../StyleComponent/responsiveDevice';

const ErrorPage = () => {
    const history = useHistory()
    return (
        <BackImageWrapperDiv>
            <Container>
                <MessageH2>ERROR 404</MessageH2>
                <MessageText>OOPS! We couldn’t find the page you are looking for. Please try again.</MessageText>
                <Button text="Back To Home" style={{width: "250px", height: "3rem"}} onClick={()=> history.push("/")} />
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
    padding: 2rem;
`;

const MessageH2 = styled.h2`
    font-size: 24px;
    font-family: 'GothamRoundedBold', sans-serif;
    color: #707070;
    line-height: 1.5;
`;

const MessageText = styled.p`
    font-size: 24px;
    font-family: 'GothamRoundedBook', sans-serif;
    color: #707070;
    line-height: 1.5;
    margin-bottom: 2rem;
`;


export default ErrorPage;