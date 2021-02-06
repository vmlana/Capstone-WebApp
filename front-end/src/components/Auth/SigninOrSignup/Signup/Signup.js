import React from 'react';

const Signup = (props) => {
    return (
        <div>
            <button>Signup</button>
            <p onClick={props.goToSignIN}>Go to Signin</p>
        </div>
    );
};

export default Signup;