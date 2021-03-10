import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { userSigninSignup } from '../../../../redux/user/user.actions';
import { login } from '../../../../services/tokenApi';
import { apiUrl } from '../../../../services/apiUrl';

import styled from "styled-components";

// Reusable Component
// import Button from "../../../ReusableElement/Button";
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

    return (
        <SigninPageContainer>
            <HeaderWrapDiv>
                <SigninPageHeader>Sign up here !</SigninPageHeader>
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
                <Button>SIGN UP</Button>
                <LinkToSignupText>
                    Already have an account?&nbsp;
                        <Link to="/auth">
                        <UnderlineSpan>Sign in</UnderlineSpan>
                    </Link>
                    &nbsp;here
                </LinkToSignupText>
            </Form>
        </SigninPageContainer>
    );
};

const mobileBreakPoint = "576px";

const SigninPageContainer = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    @media (max-width: ${mobileBreakPoint}) {
        margin: 2rem 3rem;
    }
`;

const HeaderWrapDiv = styled.div`
    position: relative;
    border-bottom: solid 1px #000000;
    max-width: 250px;
    margin-bottom: 3rem;
    @media (max-width: ${mobileBreakPoint}) {
        margin-right: 0;
        margin-left: 0;
        max-width: 100%;
    }
`;

const SigninPageHeader = styled.h2`
    font-size: 1.25rem;
    font-weight: normal;
    position: absolute;
    top: -1.75rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
`;

const RadioDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: ${mobileBreakPoint}) {
      width: 100%;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

const RadioButton = styled.input`
    margin: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  width: 60%;
  margin: 2rem auto;
  text-align: center;
  @media (max-width: ${mobileBreakPoint}) {
      margin: 0;
      width: 100%;
  }
`;

const Button = styled.button`
    margin: 4rem auto 0rem;
`;

const LinkToSignupText = styled.p`
    margin-top: 1rem;
    font-size: .9rem;
    text-align: center;
`;

const UnderlineSpan = styled.span`
    text-decoration: underline;
`;


export default Signup;