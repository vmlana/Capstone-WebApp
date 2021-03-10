import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const AboutPivot = () => {
    const history = useHistory();

    return (
        <AboutSection>
            <PivotCare>
                <AboutPivotCare>
                    <H2>What is Pivot Care</H2>
                    <PivotCareDescription>
                        <Para>
                            Pivot Care is a mobile application that helps companies to continue providing fitness and mental health care for their
                            employees while they working from home, as a way to prevent occupational related injuries such as Repetitive Strain
                            Injury (RSI) and Work-Related Musculoskeletal Disorders (WRMD).
                        </Para>
                        <Para>
                            Based on the needs of each group of employees or individuals, companies can setup customized exercises programs with
                            the supervision and monitoring of specialized instructors. The main purpose of the application is to provide focused activities
                            related to the specific work environment of the company, such as yoga, meditation, and company-wide stretch breaks.
                        </Para>
                    </PivotCareDescription>
                    <Button onClick={() => history.push("/about")}>Read More</Button>
                </AboutPivotCare>
            </PivotCare>
            {/* <img src="./media/images/Intro-MockupsPile.png" alt="about-pivot-care" /> */}
        </AboutSection>
    );
};

const AboutSection = styled.div`
    padding: 0 1rem;

    @media ${device.laptop} { 
        background-image: url('./media/images/Intro-MockupsPile.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 500px;
    }

    @media ${device.desktopM} { 
        background-position: 500px;
    }

    @media ${device.desktopL} { 
        background-position: 500px;
    }
`;

const PivotCare = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding-top: 8rem;
    padding-bottom: 7rem;
`;

const AboutPivotCare = styled.div`
    max-width: 800px;
`;

const H2 = styled.h2`
    font-size: 30px;
    line-height: 36px;
`;

const PivotCareDescription = styled.div`
    margin-top: 5rem;
`;

const Para = styled.p`
    font-size: 18px;
    line-height: 30px;
    margin: 0;
`;

const Button = styled.button`
    width: 300px;
    height: 70px;
    background-color: #7662A5;
    color: #FFFFFF;
    line-height: 24px;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    margin-top: 5rem;
`;

export default AboutPivot;
