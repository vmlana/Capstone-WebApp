import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SigninOrSignup from './SigninOrSignup/SigninOrSignup';
import CompanyConfig from './CompanyConfig/CompanyConfig';
import InstructorConfig from './InstructorConfig/InstructorConfig';
import { userSigninSignup } from '../../redux/user/user.actions';
import { refreshToken } from '../../services/tokenApi';

const Auth = (props) => {
    const dispatch = useDispatch();
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const userInfo = useSelector(state => state.user.userInfo);
    const {userType, authId, accessToken, accessExpiresIn, refreshExpiresIn} = userInfo;

    let userDirection;

    if (userType === 'company' && tokenIsValid) {
        userDirection = <CompanyConfig history={props.history} />
    } else if (userType === 'instructor' && tokenIsValid) {
        userDirection = <InstructorConfig history={props.history} />
    } else {
        userDirection = <SigninOrSignup history={props.history} />
    }

    useEffect(()=>{
        if (userType === 'company' && tokenIsValid) {
            userDirection = <CompanyConfig history={props.history} />
        } else if (userType === 'instructor' && tokenIsValid) {
            userDirection = <InstructorConfig history={props.history} />
        } else {
            userDirection = <SigninOrSignup history={props.history} />
        }
    }, [tokenIsValid])

    useEffect(()=>{    
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
        if(now > accessExpiresIn) {
            props.history.push("/auth");
            if(accessExpiresIn < now && now < refreshExpiresIn) {
              refreshToken().then(response=>{
                if(response){
      
                  const {
                    userType,
                    authId,
                    accessToken,
                    refreshToken,
                    accessExpiresIn,
                    refreshExpiresIn
                } = response.body;
        
                  dispatch(
                      userSigninSignup(
                        userType,
                        authId,
                        accessToken,
                        refreshToken,
                        accessExpiresIn,
                        refreshExpiresIn
                      )
                  );
                }
              })
            }      
        }
    }, [accessToken])

    return (
        <div>
            {userDirection}
        </div>
    );
};

export default Auth;