import React, { useState, } from 'react';
import { CreateGameboard } from './CreateGameBoard'
import { GameBoardContext } from '../context/GameBoardContext'

const GameBoard = () => {
    const [turn, changeTurn] = useState('white')
    const [gameStatus, setGameStatus] = useState('')

    return (
        <GameBoardContext.Provider value={{ gameStatus, setGameStatus, turn, changeTurn }}>
            <h1 id="gameStatus">Game Status: {gameStatus}</h1>
            <h1 id="turn">Turn: {turn.toUpperCase()}</h1>
            <div className="game-board">
                <CreateGameboard />
            </div>
        </GameBoardContext.Provider>
    )
}
//HI DELETE LATER
export default GameBoard