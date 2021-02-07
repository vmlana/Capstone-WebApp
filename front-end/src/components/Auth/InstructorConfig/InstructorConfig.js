import React from 'react';
import InstructorConfigHeader from './InstructorConfigHeader/InstructorConfigHeader';
import InstructorNavRouter from './InstructorNavRouter';

const InstructorConfig = (props) => {
    return (
        <div>
            <InstructorConfigHeader history={props.history} />
            <InstructorNavRouter />
        </div>
    );
};

export default InstructorConfig;
