import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';
import { colors } from '../../StyleComponent/colors';

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
                    <div className='btnContainer'><Button onClick={() => history.push("/about")}>Read More</Button></div>
                </AboutPivotCare>
                {/* <BGImage></BGImage> */}
            </PivotCare>
            <BGImage></BGImage>
            {/* <img src="./media/images/Intro-MockupsPile.png" alt="about-pivot-care" /> */}
        </AboutSection>
    );
};

const AboutSection = styled.div`
    padding: 0 2rem;
    position: relative;

    @media ${device.laptop} {
        padding-right: 0;
    }
`;

const BGImage = styled.div`
    background-image: url('./media/images/Intro-MockupsPile.png');

    @media ${device.laptop} {
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        right: 0%;
        left: 54%;
        top: 0;
        bottom: 0;
    }

`;

const PivotCare = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    position: relative;

    @media ${device.laptop} { 
        grid-template-columns: 1fr 1fr;
    }
`;

const AboutPivotCare = styled.div`
    /* max-width: 670px;
    margin: 0 auto; */
    padding-top: 2.5rem;
    padding-bottom: 2.65rem;

    @media ${device.laptop} { 
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .btnContainer {
        text-align: center;

        @media ${device.tablet} { 
            /* padding-top: 8rem;
            padding-bottom: 7rem; */
            text-align: left;
        }
    }
`;

const H2 = styled.h2`
    font-size: 20px;
    line-height: 30px;
    color: ${colors.darkGrey};
    font-weight: 500;

    @media ${device.tablet} { 
        font-size: 30px;
        line-height: 42px;
    }
`;

const PivotCareDescription = styled.div`
    margin-top: 2rem;

    @media ${device.tablet} { 
        margin-top: 5rem;
    }
`;

const Para = styled.p`
    font-size: 14px;
    line-height: 22px;
    margin: 0;

    @media ${device.tablet} { 
        font-size: 18px;
        line-height: 30px;
    }
`;

const Button = styled.button`
    width: 250px;
    height: 60px;
    background-color: #7662A5;
    color: #FFFFFF;
    line-height: 24px;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    margin-top: 2.5rem;

    @media ${device.tablet} { 
        background-position: 300px;
        height: 70px;
        margin-top: 5rem;
    }
`;

export default AboutPivot;
