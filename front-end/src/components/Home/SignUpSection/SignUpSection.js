import React from 'react';
import { useHistory } from 'react-router-dom';

const SignUpSection = () => {
    const history = useHistory();

    return (
        <div className="signup-section">
            <h2>Sign Up</h2>
            <p>
                Offer the best content and engagement to your team
            </p>
            <p>
                Sign up now and get to know the best plan for your company
            </p>
            <button onClick={() => history.push("/auth")}>Sign Up</button>
        </div>
    );
};

export default SignUpSection;
