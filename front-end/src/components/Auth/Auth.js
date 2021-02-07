import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SigninOrSignup from './SigninOrSignup/SigninOrSignup';
import CompanyConfig from './CompanyConfig/CompanyConfig';
import InstructorConfig from './InstructorConfig/InstructorConfig';
import { userSigninSignup } from '../../redux/user/user.actions';

const Auth = (props) => {
    const dispatch = useDispatch();
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [localStorageUserInfo, setLocalStorageUserInfo] = useState(JSON.parse(window.localStorage.getItem("PivotCareUser")))
    const userInfo = useSelector(state => state.user.userInfo);
    const {userType, authId, token} = userInfo;

    useEffect(()=>{
        if (localStorageUserInfo !== null) {
            const localUserType = localStorageUserInfo.userType;
            const localAuthId = localStorageUserInfo.authId;
            const localToken = localStorageUserInfo.token;

            dispatch(
                userSigninSignup(
                    localUserType,
                    localAuthId,
                    localToken
                )
            );
        }
    }, [localStorageUserInfo])

    useEffect(()=>{
        // tokenValidation
        setTokenIsValid(true);
    }, [token])

    let userDirection;

    if (userType === 'company' && tokenIsValid) {
        userDirection = <CompanyConfig history={props.history} />
    } else if (userType === 'instructor' && tokenIsValid) {
        userDirection = <InstructorConfig history={props.history} />
    } else {
        userDirection = <SigninOrSignup history={props.history} />
    }

    return (
        <div>
            {userDirection}
        </div>
    );
};

export default Auth;