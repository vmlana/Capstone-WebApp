import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
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
            <button style={{marginTop: "1rem"}} onClick={signupTest}>Signup</button>
            <p>
                <Link to="/auth">Go to Signin</Link>
            </p>
        </div>
    );
};

export default Signup;