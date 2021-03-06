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
    const {userType, authId, accessToken, accessExpiresIn} = userInfo;
    

    useEffect(()=>{
        if (localStorageUserInfo !== null) {
            const localUserType = localStorageUserInfo.userType;
            const localAuthId = localStorageUserInfo.authId;
            const localAccessToken = localStorageUserInfo.accessToken;
            const localRefreshToken = localStorageUserInfo.refreshToken;
            const localAccessExpiresIn = localStorageUserInfo.accessExpiresIn;
            const localRefreshExpiresIn = localStorageUserInfo.refreshExpiresIn;

            dispatch(
                userSigninSignup(
                    localUserType,
                    localAuthId,
                    localAccessToken,
                    localRefreshToken,
                    localAccessExpiresIn,
                    localRefreshExpiresIn
                )
            );
        }
    }, [localStorageUserInfo, dispatch])

    // let userDirection;

    useEffect(()=>{
        if (userType === 'company' && tokenIsValid) {
            userDirection = <CompanyConfig history={props.history} />
        } else if (userType === 'instructor' && tokenIsValid) {
            userDirection = <InstructorConfig history={props.history} />
        } else {
            userDirection = <SigninOrSignup history={props.history} />
        }
    
        // console.log(userInfo);
        // console.log(accessToken);

        // (async()=>{
        //     // tokenValidation
        //     const validationResult = await fetch(`http://localhost:3000/api/v1/verify`,{
        //         method: "POST",
        //         headers: {
        //             "access-token": accessToken,
        //         },
        //     }).then(response => {
        //         return response.json();
        //     }).catch(err => {
        //         throw err;
        //     })

        //     console.log(validationResult);

        //     // if(!validationResult.success) {
        //     //     history.push("/auth");
        //     // }

        //     setTokenIsValid(validationResult.success);
        // })();

        const now = new Date().getTime();
        // console.log(now < accessExpiresIn)
        // console.log(accessExpiresIn)
        setTokenIsValid(now < accessExpiresIn)
    }, [accessToken])

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