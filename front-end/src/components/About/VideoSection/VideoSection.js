import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const VideoSection = () => {
    const history = useHistory();

    return (
        <CTAVideoSection>
            <div className="section-content">
                <div className="cta-section">
                    <SignUpContent>
                        <h2>Sign Up</h2>
                        <div className="signup-text">
                            <p className="signup-para">
                                Start now and keep you and your team engaged from anywhere with PIVOTCARE Web Platform.
                            </p>
                            <button onClick={() => history.push("/auth")} className="secondary-btn">Sign Up</button>
                        </div>
                    </SignUpContent>
                </div>
                <div className="container">
                    <video className="responsive-video" autoPlay playsInline muted /* loop */ src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
                </div>
            </div>
        </CTAVideoSection>
    );
};

const CTAVideoSection = styled.div`
    .section-content {
        display: grid;
        
        @media ${device.laptop} { 
            grid-template-columns: 1.5fr 1fr;
        }
    }

    .cta-section {
        background-image: url('./media/images/Mobile-Purple-CTA.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: initial;
        text-align: center;
        order: 2;

    @media ${device.tablet} { 
        background-image: url('./media/images/PurpleBig-CTA.png');
    }
        

        @media ${device.laptop} { 
            order: 1;
        }
    }

    .container {
        order: 1;
    }
`;

const SignUpContent = styled.div`
    padding: 7rem 1rem;
    color: #FFFFFF;
    text-align: left;

    h2 {
        font-size: 30px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        font-weight: bold;
        text-transform: uppercase;
        display: inline-block;
        position: relative;

        :after {
            content: "";
            position: absolute;
            border-top: 2px solid white;
            top: 0;
            width: 70px;
        }
        :after {
            left: 100%;
            margin-left: 2rem;
        }
    }

    .signup-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .signup-para {
            font-size: 26px;
            line-height: 36px;
            margin: 5rem 0;

            @media ${device.laptop} { 
                max-width: 650px;
                margin: 5rem 0;
            }
        }

        .secondary-btn {
            width: 300px;
            height: 70px;
            background-color: #FFFFFF;
            color: #707070;
            line-height: 24px;
            font-size: 20px;
            border-radius: 5px;   
            border: 4px solid #FBA76E;
        }
    }
`;


export default VideoSection;
