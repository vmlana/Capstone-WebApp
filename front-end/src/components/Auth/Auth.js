import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SigninOrSignup from './SigninOrSignup/SigninOrSignup';
import CompanyConfig from './CompanyConfig/CompanyConfig';
import InstructorConfig from './InstructorConfig/InstructorConfig';

const Auth = (props) => {
    const [token, setToken] = useState(null);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [userType, setUserType] = useState('guest');

    // let { path, url } = useRouteMatch();
    // console.log(props.history)

    useEffect(()=>{
        // tokenValidation
        setTokenIsValid(true);
    }, [token])

    let userDirection  = <SigninOrSignup history={props.history} />;

    useEffect(()=>{
        if (userType === 'guest' || !tokenIsValid) {
            userDirection = <SigninOrSignup history={props.history} />
        } else if (userType === 'company' || tokenIsValid) {
            userDirection = <CompanyConfig />
        } else if (userType === 'instructor' || tokenIsValid) {
            userDirection = <InstructorConfig />
        }
    }, [tokenIsValid, userType])

    return (
        <div>
            {userDirection}
        </div>
        );
};

export default Auth;