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
                        <H3>Companies</H3>
                        <H4>Find a plan that fits with your company</H4>
                    </FeatureText>
                </Feature>

                <Feature>
                    <ImageContainer>
                        <FeatureImage src="./media/images/instructor-feature.jpg" alt="feature-2" />
                    </ImageContainer>
                    <FeatureText>
                        <H3>Instructors</H3>
                        <H4>Offer remote guidance and support</H4>
                    </FeatureText>
                </Feature>

                <Feature>
                    <ImageContainer>
                        <FeatureImage src="./media/images/employee-feature.jpg" alt="feature-3" />
                    </ImageContainer>
                    <FeatureText>
                        <H3>Employees</H3>
                        <H4>Experience new ways to keep moving</H4>
                    </FeatureText>
                </Feature>
            </FeatureList>
        </FeatureSection>
    );
};

const FeatureSection = styled.div`
    padding: 5rem 2rem;
    padding-bottom: 0;

    @media ${device.tablet} { 
        padding: 8rem 2rem;
    }

    @media ${device.desktopL} { 
        padding: 10rem 1rem;
        max-width: 1500px;
        margin: 0 auto;
    }
`;

const FeatureList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Feature = styled.div`
    max-width: 250px;
    text-align: center;
    padding-bottom: 5rem;
    
    @media ${device.mobileP} { 
        max-width: 270px;
        padding: 2rem;
    }

    @media ${device.tablet} { 
        max-width: 330px;
    }
`;

const ImageContainer = styled.div`
    
`;

const FeatureText = styled.div`
    max-width: 180px;
    margin: 0 auto;

    @media ${device.tablet} { 
        max-width: 300px;
    }
`;

const H3 = styled.h3`
    margin: 0;
    font-weight: 500;
    color: #624A99;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 30px;

    @media ${device.tablet} { 
        font-family: 'GothamRoundedMedium';
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        font-size: 26px;
        line-height: 30px;
    }
`;

const H4 = styled.h4`
    margin: 0;
    font-weight: 400;
    color: #707070;
    font-size: 14px;
    line-height: 16px;

    @media ${device.tablet} {
        font-weight: 300;
        font-size: 26px;
        line-height: 30px;
    }
`;

const FeatureImage = styled.img`
    object-fit: cover;
    border-radius: 2rem;
`;


export default Features;
