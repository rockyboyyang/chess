import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';

const GuestMenu = () => {
    return(
        <>
            <button className="play-button">Play</button>
            <Link to="/login">Logout</Link>
            <Link to="/gameBoard">PLAY</Link>
        </>
    )
}

export default GuestMenu