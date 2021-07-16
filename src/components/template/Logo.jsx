import './Logo.css';
import zeusLogoLogo from '../../assets/imgs/zeusLogoLogo.png';
import  React from 'react';
import { Link } from 'react-router-dom';

export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={zeusLogoLogo} alt="log" />
        </Link>
    </aside>