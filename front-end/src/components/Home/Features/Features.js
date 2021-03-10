import React from 'react';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const Features = () => {
    return (
        <FeatureSection>
            <FeatureList>
                <Feature>
                    <ImageContainer>
                        <FeatureImage src="./media/images/company-feature.jpg" alt="feature-1" />
                    </ImageContainer>
                    <FeatureText>
                        <H3>For Companies</H3>
                        <H4>Find a plan that fits with your company</H4>
                    </FeatureText>
                </Feature>

                <Feature>
                    <ImageContainer>
                        <FeatureImage src="./media/images/instructor-feature.jpg" alt="feature-2" />
                    </ImageContainer>
                    <FeatureText>
                        <H3>For Instructors</H3>
                        <H4>Offer remote guidance and support</H4>
                    </FeatureText>
                </Feature>

                <Feature>
                    <ImageContainer>
                        <FeatureImage src="./media/images/employee-feature.jpg" alt="feature-3" />
                    </ImageContainer>
                    <FeatureText>
                        <H3>For Employees</H3>
                        <H4>Experience new ways to keep moving</H4>
                    </FeatureText>
                </Feature>
            </FeatureList>
        </FeatureSection>
    );
};

const FeatureSection = styled.div`
    padding: 14rem 1rem;

    @media ${device.desktopL} { 
        padding: 10rem 1rem;
        max-width: 1500px;
        margin: 0 auto;
    }
`;

const FeatureList = styled.div`
    display: grid;
    grid-gap: 2rem;

    @media ${device.tablet} { 
        grid-template-columns: repeat(3, 1fr);
    }

    @media ${device.laptop} { 
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
    }

    @media ${device.desktopM} { 
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
    }

    @media ${device.desktopL} { 
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5rem;
    }
`;

const Feature = styled.div`
    text-align: center;
`;

const ImageContainer = styled.div`
    
`;

const FeatureText = styled.div`
    max-width: 315px;
    margin: 0 auto;
`;

const H3 = styled.h3`
    margin: 0;
    font-weight: 400;
    color: #624A99;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 26px;
    line-height: 30px;
`;

const H4 = styled.h4`
    margin: 0;
    font-weight: 400;
    color: #707070;
    font-size: 26px;
    line-height: 30px;
`;

const FeatureImage = styled.img`
    width: 330px;
    height: 330px;
    object-fit: cover;
    border-radius: 2rem;
`;


export default Features;
