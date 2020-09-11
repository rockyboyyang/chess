import React, { useState } from 'react';
import Footer from './Footer'
import OnePlayerTutorial from '../videos/one-player-tutorial.mp4'
import TwoPlayerTutorial from '../videos/two-player-tutorial.mp4'

const Splash = ({startSetup}) => {

    return (
        <>
            <div className="body-container">
                <h1 id='home-header'>CHESS</h1>
                <div id='splash-page-middle-container'>
                    <div id='start-game-settings-button-container'>
                        <div id='start-game-settings-button' onClick={startSetup}>Start</div>
                    </div>
                    <div id='one-player-container'>
                        <h3>One Player Tutorial</h3>
                        <div id='one-player-tutorial-container'>
                            <video src={OnePlayerTutorial} controls='true' autoplay="" loop=""></video>
                        </div>
                    </div>
                    <div id='two-player-container'>
                        <h3>Two Player Tutorial</h3>
                        <div id='two-player-tutorial-container'>
                            <video src={TwoPlayerTutorial} controls='true' autoplay="" loop=""></video>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Splash;