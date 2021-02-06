import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';

const SigninOrSignup = (props) => {
    const [ isSignin, setIsSignin ] = useState(true);

    let { url } = useRouteMatch();

    useEffect(()=>{
        props.history.push(`${url}/signin`);
    }, []);

    useEffect(()=>{
        if (isSignin) {
            props.history.push(`${url}/signin`);
        } else {
            props.history.push(`${url}/signup`);
        }
    }, [isSignin]);

    const goToSignIN = () => {
        setIsSignin(true)
    };

    const goToSignUP = () => {
        setIsSignin(false)
    };

    return (
        <Switch>
            <Route
                exact path={`${url}/signin`}
                component={() =>
                    <Signin
                        goToSignUP={goToSignUP}
                    />
                }
            />
            <Route
                exact path={`${url}/signup`}
                component={() =>
                    <Signup
                        goToSignIN={goToSignIN}
                    />
                }
            />
        </Switch>
        );
};

export default SigninOrSignup;