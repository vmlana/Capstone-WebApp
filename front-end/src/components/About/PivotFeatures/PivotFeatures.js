import React from 'react';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const PivotFeatures = () => {
    return (
        <PivotFeatureSection>
            <div className="feature-list">
                <div className="feature feature-odd">
                    <div></div>
                    <div className="feature-description">
                        <h2>FIND A PLAN THAT FIT WITH YOUR COMPANY</h2>
                        <p>
                            Find plans with instructors and playlists specially designed according to your
                            company's job positions, main activities and environments prioritizing wellness and
                            healthy habits and making the difference in their daily work environment.
                        </p>
                    </div>
                    <img className="feature-image" src="./media/images/company-feature.jpg" alt="feature-1" />
                </div>

                <div className="feature feature-even">
                    <img className="feature-image" src="./media/images/instructor-feature.jpg" alt="feature-2" />
                    <div className="feature-description">
                        <h2>OFFER REMOTE GUIDENCE AND SUPPORT</h2>
                        <p>
                            Instructors from different healthy and wellness
                            areas can upload content, videos and create
                            customized playlist in the platform to keep
                            providing your training classes and services
                            remotely from anywhere with PIVOT CARE and
                            measure users satisfaction trough surveys.
                        </p>
                    </div>
                    <div></div>
                </div>

                <div className="feature feature-odd">
                    <div></div>
                    <div className="feature-description">
                        <h2>EXPERIENCE NEW WAYS TO KEEP MOVING</h2>
                        <p>
                            Offer varied and interesting content about the
                            importance of health care, posture and
                            ergonomics in the work environment, especially
                            in remote work and encourage your team to
                            think and do more about occupational health
                            issues prevention.
                        </p>
                    </div>
                    <img className="feature-image" src="./media/images/employee-feature.jpg" alt="feature-3" />
                </div>
            </div>
        </PivotFeatureSection>
    );
};

const PivotFeatureSection = styled.div`
    background-image: url('./media/images/Gradient.png');
    /* background-size: cover; */
    background-repeat: no-repeat;
    background-position: center;
    padding: 5rem 3rem;

    @media ${device.tablet} { 
        padding: 12rem 2rem;
    }

    .feature-list {
        max-width: 1500px;
        margin: 0 auto;
        display: grid;
        grid-gap: 4rem;

        @media ${device.tablet} { 
            grid-gap: 7rem;
        }

        .feature {
            display: grid;
            grid-gap: 3rem;
            align-items: center;

            &.feature-odd {
                @media ${device.tablet} { 
                    grid-template-columns: auto 1.5fr auto;
                    text-align: right;
                }

                @media ${device.desktopM} { 
                    grid-template-columns: 1fr 1.5fr auto;
                }
            }

            &.feature-even {

                @media ${device.tablet} { 
                    grid-template-columns: auto 1.5fr auto;
                    text-align: left;
                }

                @media ${device.desktopM} { 
                    grid-template-columns: auto 1.5fr 1fr;
                }
            }

            .feature-description {
                order: 2;

                @media ${device.tablet} { 
                    order: unset;
                }

                h2 {
                    margin: 0;
                    color: #707070;
                    font-size: 30px;
                    line-height: 36px;
                    max-width: 450px;
                    display: inline-block;
                }

                p {
                    font-size: 18px;
                    line-height: 30px;
                    color: #333333;
                }
            }

            .feature-image {
                max-width: 370px;
                margin: 0 auto;
                object-fit: cover;
                border-radius: 2rem;
                order: 1;

                @media ${device.tablet} { 
                    order: unset;
                }
            }
        }
    }
`;

export default PivotFeatures;
