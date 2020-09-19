import React, { useState } from 'react';


const Footer = () => {

    return (
        <footer>
            <div className='copyright-container'>
                <h5>© Rocky B Yang</h5>
            </div>
            <div className='socialmedia-links-container'>
                <a className="fa fa-github-square" href='https://github.com/rockyboyyang' target="_blank"></a>
                <a className="fa fa-linkedin" href='https://www.linkedin.com/in/rocky-yang-8a6669b8/' target="_blank"></a>
            </div>
        </footer>
    );
}

export default Footer;