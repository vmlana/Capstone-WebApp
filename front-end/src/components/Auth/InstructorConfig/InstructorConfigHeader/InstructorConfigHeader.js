import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { userLogout } from '../../../../redux/user/user.actions';

const InstructorConfigHeader = () => {
    const dispatch = useDispatch()
    let { url } = useRouteMatch();

    return (
        <div id="instructorConfigHeader">
            <ul>
                <li>
                    <Link to={url}>Profile</Link>
                </li>
                <li>
                    <Link to={url + '/lessons'}>Lessons</Link>
                </li>
                <li>
                    <Link to={url + '/playlists'}>Playlists</Link>
                </li>
                <li>
                    <Link to={url + '/blogs'}>Blogs</Link>
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

export default InstructorConfigHeader;