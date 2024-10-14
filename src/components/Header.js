import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <div className='headerWrap'>
           <div className="header-area">
            <div className="logo">
                <Link to="/"><img src={process.env.PUBLIC_URL+ "./img/logo.png"} alt="" /></Link>
            </div>
            <div className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
            </div> 
        </div>
    );
};

export default Header;