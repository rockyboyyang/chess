import React, { useState } from 'react';
import Footer from './Footer'

const Home = () => {

    return (
        <>
            <div className="body-container">
                <h1 id='home-header'>CHESS</h1>
                <div id='home-page'>
                    {!onePlayerGame && !twoPlayerGame ? (
                        <>
                            <h2 id='pick-color'>Pick A Mode</h2>
                            <div className="button" onClick={selectOnePlayer}>One Player Match</div>
                            <div className="button" onClick={selectTwoPlayer}>Two Player Match</div>
                        </>
                    ) : (
                            <>
                                <h2 id='pick-color'>Pick Your Color</h2>
                                <div className="button" onClick={selectWhite}>WHITE</div>
                                <div className="button" onClick={selectBlack}>BLACK</div>
                            </>
                        )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;