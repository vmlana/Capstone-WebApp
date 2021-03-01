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
                        Start now and keep you and your team
                        engaged from anywhere with Pivot Care
                        Web Platform.
                    </p>
                    <button onClick={() => history.push("/auth")} className="secondary-btn">Sign Up</button>
                </div>
            </SignUpContent>
        </SignUpContainer >
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
    padding: 7rem 1rem;
    max-width: 1500px;
    margin: 0 auto;
    color: #FFFFFF;

    .signup-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        @media ${device.laptop} { 
            flex-direction: row;
        }

        .signup-para {
            font-size: 26px;
            line-height: 36px;
            margin-bottom: 4rem;

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

const H2 = styled.h2`
    font-size: 30px;
    line-height: 24px;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    position: relative;

    :after {
        content: "";
        position: absolute;
        border-top: 3px solid white;
        top: 0;
        width: 100px;
        left: 100%;
        margin-left: 2rem;
    }
`;

export default SignUpSection;
