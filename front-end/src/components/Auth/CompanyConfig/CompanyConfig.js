import React from 'react';
import CompanyConfigHeader from './CompanyConfigHeader/CompanyConfigHeader';
import CompanyNavRouter from './CompanyNavRouter';

const CompanyConfig = (props) => {
    return (
        <div>
            <CompanyConfigHeader history={props.history} />
            <CompanyNavRouter />
        </div>
    );
};

export default CompanyConfig;