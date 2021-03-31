import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { userSigninSignup } from '../../../../redux/user/user.actions';
import { login } from '../../../../services/tokenApi';
import { apiUrl } from '../../../../services/apiUrl';

import styled from "styled-components";

import { device } from '../../../StyleComponent/responsiveDevice';
import { colors } from '../../../StyleComponent/colors';

import Button from "../../../ReusableElement/Button";

import InputWithLabel from "../../../ReusableElement/InputWithLabel";

const Signup = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState({
        userType: "company",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    const displaySizeListener = () => {
        const newWindowWidth = window.innerWidth;
        // console.log(newWindowWidth);
        setwindowWidth(newWindowWidth);
    };

    const handleOnChange = (e) => {
        e.persist();
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (userInput.password === userInput.confirmPassword) {
            // Call authentication API Here to get token
            // const response = await {success: true}

            try {
                const { email, password, userType } = userInput;
                const response = await login(
                    `${apiUrl}/signup`,
                    email,
                    password,
                    userType
                )
                    .catch((error => {
                        throw error;
                    }))

                // console.log(response.body.success);

                if (!response || !response.body.success) {
                    alert("Something is wrong!!!");
                    return;
                }

                const {
                    authId,
                    accessToken,
                    refreshToken,
                    accessExpiresIn,
                    refreshExpiresIn
                } = response.body;

                dispatch(userSigninSignup(userType, authId, accessToken, refreshToken, accessExpiresIn, refreshExpiresIn));
                history.push("/auth");

            } catch (error) {
                alert("Something is wrong!!!");
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", displaySizeListener);

        return () => {
            window.removeEventListener("resize", displaySizeListener);
        };
    }, []);

    return (
        <SigninPageContainer>
            <HeaderWrapDiv>
                {
                    windowWidth < 768 ?
                        <SigninPageHeader>Sign up</SigninPageHeader>
                        :
                        <SigninPageHeader>Sign up here !</SigninPageHeader>
                }
            </HeaderWrapDiv>
            <Form onSubmit={signUpHandler}>
                <RadioDiv>
                    <RadioLabel>
                        Company
                        <RadioButton
                            type="radio"
                            value="company"
                            name="userType"
                            defaultChecked
                            onChange={handleOnChange}
                        />
                    </RadioLabel>
                    <RadioLabel>
                        Instructor
                        <RadioButton
                            type="radio"
                            value="instructor"
                            name="userType"
                            onChange={handleOnChange}
                        />
                    </RadioLabel>
                </RadioDiv>

                <InputWithLabel
                    label="Email"
                    type="email"
                    name="email"
                    value={userInput.email}
                    required
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Password"
                    type="password"
                    name="password"
                    value={userInput.password}
                    required
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={userInput.confirmPassword}
                    required
                    onChange={handleOnChange}
                />
                {/* <Button>SIGN UP</Button> */}
                <ButtonDiv>
                    <Button
                        text="Sign up"
                        type="submit"
                        style={{ width: "100%" }}
                        onClick={() => { }}
                    />
                </ButtonDiv>
                <LinkToSignupText>
                    Already have an account?&nbsp;
                        <div style={{ display: "inline-block" }} onClick={() => {
                            history.push("/auth")
                        }}>
                            <UnderlineSpan>Sign in</UnderlineSpan>
                        </div>
                    &nbsp;here
                </LinkToSignupText>
            </Form>
        </SigninPageContainer>
    );
};


const SigninPageContainer = styled.div`
    max-width: 1500px;
    margin: 2rem 3rem;
    min-height: 75vh;
    
    @media ${device.tablet} {
        padding: 0 2rem;
        margin: 2rem auto;
    }
`;

const HeaderWrapDiv = styled.div`
    position: relative;
    border-bottom: solid 2.5px ${colors.darkGrey};
    margin-bottom: 3rem;
    margin-top: 4rem;
    max-width: 100%;

    margin-right: 0;
    margin-left: 0;

    @media ${device.tablet} {
        max-width: 300px;
    }
`;

const SigninPageHeader = styled.h2`
    font-size: 1.25rem;
    font-weight: normal;
    position: absolute;
    top: -2.25rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
    color: ${colors.darkGrey};
    font-family: 'GothamRoundedBold', sans-serif;
    font-size: 28px;
    font-weight: 400;
`;

const RadioDiv = styled.div`
    font-family: 'GothamRoundedMedium', sans-serif;
    font-weight: 300;
    color: ${colors.darkGrey};

    margin: 0 0 1.5rem;

    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;

    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
        margin-top: 1.5rem;
    }
`;

const RadioLabel = styled.label`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;

  @media ${device.tablet} {
        flex-flow: column;
        justify-content: center;
    }
`;

const RadioButton = styled.input`
    margin: 1rem;

    :after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        /* background-color: #d1d3d1; */
        content: '';
        /* display: "inline-block"; */
        visibility: visible;
        border: 0px solid white;
    }

    :checked:after {
        width: 16.5px;
        height: 16.5px;
        border-radius: 16.5px;
        /* top: -2px;
        left: -1px; */
        top: 0px;
        left: -2px;
        position: relative;
        background-color: ${colors.UIViolet};
        
        content: '';
        display: inline-block;
        visibility: visible;
        border: 0px solid white;
    }
`;

const Form = styled.form`
    display: flex;
    flex-flow: column;
    text-align: center;
    margin: 0;
    width: 100%;
    
    @media ${device.tablet} {
        max-width: 768px;
        margin: 2rem auto;
    }
`;

// const Button = styled.button`
//     margin: 4rem auto 0rem;
// `;

const ButtonDiv = styled.div`
    margin: 4rem auto 1.5rem;
    width: 100%;
    @media ${device.tablet} {
       width: 50%;
    }
`;

const LinkToSignupText = styled.p`
    margin-top: 1rem;
    font-size: .9rem;
    text-align: center;
`;

const UnderlineSpan = styled.span`
    text-decoration: underline;
    color: ${colors.darkGrey};
    font-weight: 600;
`;


export default Signup;