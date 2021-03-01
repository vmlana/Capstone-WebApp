import React from 'react';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const Downloads = () => {
    return (
        <DownloadSection>
            <DownloadContent>
                <H2>Download Our App</H2>
                <Para>Click to download the Pivot Care App on your mobile now!</Para>
            </DownloadContent>
            <CTABtns>
                <a href="https://play.google.com/store"><img src="./media/images/googleplay.png" alt="Google Play" /></a>
                <a href="https://www.apple.com/ca/app-store/"><img src="./media/images/applestore.png" alt="App Store" /></a>
            </CTABtns>
        </DownloadSection>
    );
};

const DownloadSection = styled.div`
    background-image: url('./media/images/Mobile-Blue-CTA.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    text-align: center;
    padding: 7rem 0;

    @media ${device.tablet} { 
        background-image: url('./media/images/Blue-CTA.png');
        background-position: center;
        padding: 7rem 0;
    }
`;

const DownloadContent = styled.div`
    max-width: 525px;
    margin: 0 auto;
    padding: 0 1rem;

    @media ${device.mobileP} { 
        padding: 0;
    }
`;

const H2 = styled.h2`
    font-size: 30px;
    line-height: 30px;
    color: #707070;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
`;

const Para = styled.p`
    font-size: 26px;
    line-height: 31px;
    color: #707070;
`;

const CTABtns = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-gap: 1rem;
    padding-top: 3rem;

    @media ${device.laptop} { 
        grid-template-columns: 1fr 1fr;
    }

    img {
        max-width: 280px;
        border-radius: 5px;

        @media ${device.laptop} { 
            max-width: 350px;
        }
    }
`;

export default Downloads;
