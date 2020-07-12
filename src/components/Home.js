import React, { useState } from 'react';


const Home = ({ updatePlayerName }) => {
    const [playerName, setPlayerName] = useState('');
    const [errors, setErrors] = useState('');
    
    const onChange = (e) => {
        setPlayerName(e.target.value);
    };

    const selectWhite = () => {
        updatePlayerName('white')
    }

    const selectBlack = () => {
        updatePlayerName('black')
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const errorsToSet = [];

        if (!playerName) {
            errorsToSet.push('Please provide a player name.');
        }

        if (errorsToSet.length > 0) {
            setErrors(errorsToSet);
            return;
        }

        updatePlayerName(playerName);
    };

    return (
        <>
            <div className="body-container">
                <h1 id='home-header'>CHESS</h1>
                <div id='home-page'>
                    <h2 id='pick-color'>Pick Your Color</h2>
                    <div className="button" onClick={selectWhite}>WHITE</div>
                    <div className="button" onClick={selectBlack}>BLACK</div>
                </div>
                <footer>
                    <a className="fa fa-github-square" href='https://github.com/rockyboyyang'></a>
                    <a className="fa fa-linkedin" href='https://www.linkedin.com/in/rocky-yang-8a6669b8/'></a>
                </footer>
            </div>
        </>
    );
}

export default Home;