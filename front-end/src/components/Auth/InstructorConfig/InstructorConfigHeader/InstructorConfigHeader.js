import React, { useState, useEffect } from "react";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import * as FAIcons from "react-icons/fa";
import { IconContext } from 'react-icons';

import { useDispatch } from 'react-redux';
import { userLogout } from '../../../../redux/user/user.actions';
import { BASE_URL } from '../../../../services/apiUrl';

import { logout } from '../../../../services/tokenApi';

const InstructorConfigHeader = (props) => {
    const dispatch = useDispatch()
    let { url } = useRouteMatch();

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [showDesktopMenu, setDesktopMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const updateWindowWidth = () => setWindowWidth(window.innerWidth);

    const logoutHandler = () => {
        (async()=>{
            await logout();
            dispatch(userLogout());
            props.history.replace(`/auth`);
        })()
    }

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        updateWindowWidth();

        if (windowWidth > 875) {
            setDesktopMenu(true);
        } else {
            setDesktopMenu(false);
        }

        // console.log(windowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [showDesktopMenu, windowWidth]);

    return (
        <header className={showDesktopMenu ? (scroll ? "desktop-menu active" : "desktop-menu") : "mobile-menu"}>
            {showDesktopMenu ?

                <nav className='nav-menu'>
                    <div className='site-logo'>
                        <Link to="/"><img src={`${BASE_URL}/media/images/pivotcare-logo.svg`} /></Link>
                    </div>
                    <ul className='nav-menu-items'>
                        <li className="nav-item">
                            <NavLink exact to={url}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={url + '/lessons'}>Lessons</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={url + '/playlists'}>Playlists</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to={url + '/blogs'}>Blogs</NavLink>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/auth"
                                onClick={() => {
                                    logoutHandler();
                                }}
                            >
                                <FAIcons.FaSignOutAlt size={24} />
                            </Link>
                        </li>
                    </ul>
                </nav>
                :
                <div className="mobile-menu">
                    <IconContext.Provider value={{ color: '#fff' }}>
                        <div className='navbar'>

                            <div className='site-logo'>
                                <Link to="/"><img src={`${BASE_URL}/media/images/pivotcare-logo.svg`} /></Link>
                            </div>
                            <Link to="#" className='hamburger-menu'>
                                <FAIcons.FaBars onClick={showSidebar} />
                            </Link>
                        </div>
                        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                            <ul className='nav-menu-items' onClick={showSidebar}>
                                <li className='navbar-toggle'>
                                    <Link to="#" className='close-menu'><FAIcons.FaTimes /></Link>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to={url}>Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to={url + '/lessons'}>Lessons</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to={url + '/playlists'}>Playlists</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to={url + '/blogs'}>Blogs</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/auth"
                                        onClick={() => {
                                            logoutHandler();
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </IconContext.Provider>
                </div>
            }

        </header>
        // <div id="instructorConfigHeader">
        //     <div className="site-logo">
        //         <Link to="/">Pivot Care</Link>
        //     </div>
        //     <ul>
        //         <li>
        //             <Link to={url}>Profile</Link>
        //         </li>
        //         <li>
        //             <Link to={url + '/lessons'}>Lessons</Link>
        //         </li>
        //         <li>
        //             <Link to={url + '/playlists'}>Playlists</Link>
        //         </li>
        //         <li>
        //             <Link to={url + '/blogs'}>Blogs</Link>
        //         </li>
        //         <li>
        //             <button
        //                 onClick={() => {
        //                     dispatch(userLogout());
        //                     props.history.replace(`/auth`);
        //                 }}>
        //                 Sign Out
        //             </button>
        //         </li>
        //     </ul>
        // </div>
    );
};

export default InstructorConfigHeader;