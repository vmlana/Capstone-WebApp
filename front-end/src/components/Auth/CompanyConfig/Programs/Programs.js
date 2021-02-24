import React from 'react';
import { useHistory } from 'react-router-dom';

const Programs = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push("/auth/add-program")}>Add New Program</button>
        </div>
    );
};

export default Programs;