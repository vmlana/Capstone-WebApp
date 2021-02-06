import React from 'react';

const Signin = (props) => {

    return (
        <div>
            <button>Signin</button>
            <p onClick={props.goToSignUP}>Go to Signup</p>
        </div>
    );
};

export default Signin;