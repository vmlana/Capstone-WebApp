import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { userSigninSignup } from '../../../../redux/user/user.actions';

const Signin = (props) => {
    const [userType, setUserType] = useState("company");
    const dispatch = useDispatch();

    const signinTest = () => {
        dispatch(userSigninSignup(userType, 123456, "ThisIsDummyToken"));
        props.history.replace(`/auth`);
    }

    return (
        <div>
            <button onClick={signinTest}>Signin</button>
            <p onClick={props.goToSignUP}>Go to Signup</p>
        </div>
    );
};

export default Signin;