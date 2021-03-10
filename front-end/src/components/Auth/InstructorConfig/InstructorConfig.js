import React from 'react';
import styled from 'styled-components';
import InstructorConfigHeader from './InstructorConfigHeader/InstructorConfigHeader';
import InstructorNavRouter from './InstructorNavRouter';

const InstructorConfig = (props) => {
    return (
        <ConfigDiv>
            <InstructorConfigHeader history={props.history} />
            <InstructorNavRouter />
        </ConfigDiv>
    );
};

const ConfigDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default InstructorConfig;
