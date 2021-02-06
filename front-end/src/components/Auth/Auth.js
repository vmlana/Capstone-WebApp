import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import SigninOrSignup from './SigninOrSignup/SigninOrSignup';
import CompanyConfig from './CompanyConfig/CompanyConfig';
import InstructorConfig from './InstructorConfig/InstructorConfig';

const Auth = (props) => {
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const userInfo = useSelector(state => state.user.userInfo);
    const {userType, authId, token} = userInfo;

    useEffect(()=>{
        // tokenValidation
        setTokenIsValid(true);
    }, [token])

    let userDirection  = <SigninOrSignup history={props.history} />;

    if (userType === 'guest' || !tokenIsValid) {
        userDirection = <SigninOrSignup history={props.history} />
    } else if (userType === 'company' && tokenIsValid) {
        userDirection = <CompanyConfig />
    } else if (userType === 'instructor' && tokenIsValid) {
        userDirection = <InstructorConfig />
    }

    return (
        <div>
            {userDirection}
        </div>
    );
};

export default Auth;