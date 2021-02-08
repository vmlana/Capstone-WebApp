import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="globalHeader">
            <div className="site-logo">
                <Link to="/">Pivot Care</Link>
            </div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/auth'>Signin/Signup</Link></li>
            </ul>
        </div>
    );
};

export default Header;