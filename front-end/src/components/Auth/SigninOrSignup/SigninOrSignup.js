import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';

const SigninOrSignup = (props) => {
    let { url } = useRouteMatch();

    return (
        <Switch>
            <Route
                exact path={`${url}`}
                component={() =>
                    <Signin
                        history={props.history}
                    />
                }
            />
            <Route
                exact path={`${url}/signup`}
                component={() =>
                    <Signup
                        history={props.history}
                    />
                }
            />
        </Switch>
        );
};

export default SigninOrSignup;