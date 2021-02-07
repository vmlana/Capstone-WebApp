import React, {useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { userSigninSignup } from '../../../../redux/user/user.actions';

const Signin = (props) => {
    const [userType, setUserType] = useState("company");
    const dispatch = useDispatch();

    const signinTest = () => {
        dispatch(userSigninSignup(userType, 123456, "ThisIsDummyToken"));
        props.history.replace(`/auth`);
    };

    return (
        <div>
            <div>
                <input
                    type="radio"
                    value="company"
                    name="userType"
                    defaultChecked
                    onChange={(ev) => setUserType(ev.target.value)}
                /> Company
                <input
                    type="radio"
                    value="instructor"
                    name="userType"
                    onChange={(ev) => setUserType(ev.target.value)}
                /> Instructor
            </div>
            <button style={{marginTop: "1rem"}} onClick={signinTest}>Signin</button>
            <p onClick={props.goToSignUP}>Go to Signup</p>
        </div>
    );
};

export default Signin;