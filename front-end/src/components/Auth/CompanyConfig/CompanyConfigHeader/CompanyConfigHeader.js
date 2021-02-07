import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { userLogout } from '../../../../redux/user/user.actions';

const CompanyConfigHeader = () => {
    const dispatch = useDispatch()
    let { url } = useRouteMatch();

    return (
        <div id="companyConfigHeader">
            <ul>
                <li>
                    <Link to={url}>Account</Link>
                </li>
                <li>
                    <Link to={url + '/programs'}>Programs</Link>
                </li>
                <li>
                    <Link to={url + '/surveys'}>Surveys</Link>
                </li>
                <li>
                    <button
                        onClick={()=>dispatch(userLogout())}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CompanyConfigHeader;