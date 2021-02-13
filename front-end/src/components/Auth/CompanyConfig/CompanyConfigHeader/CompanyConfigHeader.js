import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { userLogout } from '../../../../redux/user/user.actions';

const CompanyConfigHeader = (props) => {
    const dispatch = useDispatch()
    let { url } = useRouteMatch();

    return (
        <div id="companyConfigHeader">
            <div className="site-logo">
                <Link to="/">Pivot Care</Link>
            </div>

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
                        onClick={()=>{
                            dispatch(userLogout());
                            props.history.replace(`/auth`);
                        }}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CompanyConfigHeader;