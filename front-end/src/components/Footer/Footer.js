import React from 'react';
import styled from 'styled-components';
import { device } from '../StyleComponent/responsiveDevice';

const Footer = () => {
    return (
        <FooterSection>
            <p>
                &copy; 2020 Pivot Care by Team Popcorn. <span>All rights reserved.</span>
            </p>
        </FooterSection>
    );
};

const FooterSection = styled.footer`
    text-align: center;
    padding: 1rem 2rem;
    color: #676767;
    background-color: #F9F9F9;

    p {
        margin: 0;
        padding: 0;
        font-family: 'GothamRoundedMedium';
        font-size: 12px;
        line-height: 20px;

        span {
            display: block;
            line-height: 24px;

            @media ${device.tablet} { 
                display: inline-block;
            }
        }
    }
`;

export default Footer;