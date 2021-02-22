import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

// Reusable Components
import Button from '../../../ReusableElement/Button';

const Lessons = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push("/auth/add-lesson")}>Add New Lesson</button>
        </div>
    );
};

export default Lessons;