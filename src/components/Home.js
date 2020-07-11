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
        <div id='home-page'>
            <h1 id='home-header'>LET'S PLAY CHESS!</h1>
            <h2 id='pick-color'>Pick Your Color</h2>
            {/* <p>Please provide your player name and
            click the "Play Game" button to start a game.</p>
            <form onSubmit={onSubmit}>
                <input type='text' value={playerName}
                    onChange={onChange} />
                <button>Play Game</button>
            </form> */}
            <button onClick={selectWhite}>WHITE</button>
            <button onClick={selectBlack}>BLACK</button>
        </div>
    );
}

export default Home;