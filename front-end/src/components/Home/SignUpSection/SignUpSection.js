import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const SignUpSection = () => {
    const history = useHistory();

    return (
        <SignUpContainer>
            <SignUpContent>
                <H2>Sign Up</H2>
                <div className="signup-text">
                    <p className="signup-para">
                        Offer the best content and engagement to your team. Sign up now and get to know the best plan for your company
                    </p>
                    <button onClick={() => history.push("/auth")} className="secondary-btn">Sign Up</button>
                </div>
            </SignUpContent>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.div`
    background-image: url('./media/images/Mobile-Purple-CTA.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media ${device.tablet} { 
        background-image: url('./media/images/PurpleSmall-CTA.png');
    }
`;

const SignUpContent = styled.div`
    padding: 3.5rem 2rem;
    max-width: 1500px;
    margin: 0 auto;
    color: #FFFFFF;

    @media ${device.tablet} { 
        padding: 7rem 2rem;
    }

    .signup-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        @media ${device.laptop} { 
            flex-direction: row;
        }

        .signup-para {
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 4rem;

            @media ${device.tablet} { 
                font-size: 26px;
                line-height: 36px;
            }

            @media ${device.laptop} { 
                max-width: 650px;
                margin-bottom: 0;
            }

            @media ${device.desktopM} { 
                max-width: 900px;
                margin-bottom: 0;
            }
        }

        .secondary-btn {
            width: 250px;
            height: 60px;
            background-color: #FFFFFF;
            color: #707070;
            line-height: 24px;
            font-size: 20px;
            border-radius: 5px;   
            border: 4px solid #FBA76E;

            @media ${device.tablet} { 
                width: 300px;
                height: 70px;
            }
        }
    }
`;

const H2 = styled.h2`
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
    text-transform: uppercase;
    display: inline-block;
    position: relative;

    @media ${device.tablet} { 
        font-weight: bold;
        font-size: 30px;
        line-height: 30px;
    }

    :after {
        content: "";
        position: absolute;
        border-top: 3px solid white;
        top: 11px;
        width: 100%;
        left: 100%;
        margin-left: 2rem;

        @media ${device.tablet} { 
            width: 100px;
        }
    }
`;

export default SignUpSection;
