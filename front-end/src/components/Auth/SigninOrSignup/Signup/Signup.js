import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { userSigninSignup } from '../../../../redux/user/user.actions';

const Signup = (props) => {
    const [userType, setUserType] = useState("company");
    const dispatch = useDispatch();

    const signupTest = () => {
        dispatch(userSigninSignup(userType, 123456, "ThisIsDummyToken"));
        props.history.replace(`/auth`);
    }

    return (
        <div>
            <button onClick={signupTest}>Signup</button>
            <p onClick={props.goToSignIN}>Go to Signin</p>
        </div>
    );
};

export default Signup;