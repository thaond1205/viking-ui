import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start" style={{clear: 'both'}}>
        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: '100px', 
            marginTop: '30px',
            paddingTop: '30px'}}>
            © 2021 Copyright:
            <Link className="text-dark" to="/"><b> Nguyen Duc Thao</b></Link>
        </div>
        </footer>

    );
};

export default Footer;