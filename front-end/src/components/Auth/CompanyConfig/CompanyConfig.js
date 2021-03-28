import React from 'react';
import styled from 'styled-components';
import CompanyConfigHeader from './CompanyConfigHeader/CompanyConfigHeader';
import CompanyNavRouter from './CompanyNavRouter';

const CompanyConfig = (props) => {
    return (
        <ConfigDiv>
            <CompanyConfigHeader history={props.history} />
            <CompanyNavRouter />
        </ConfigDiv>
    );
};

const ConfigDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default CompanyConfig;