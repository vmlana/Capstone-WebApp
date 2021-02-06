import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="globalHeader">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/auth'>Sign/Signup</Link></li>
            </ul>
        </div>
    );
};

export default Header;