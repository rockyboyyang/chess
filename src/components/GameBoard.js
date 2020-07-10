import React, { useState, } from 'react';
import { CreateGameboard } from './CreateGameBoard'
import { GameBoardContext } from '../context/GameBoardContext'
import Square from './Square';
import readyUpChessBoard from '../assets/squaresArray'

const GameBoard = () => {
    const [turn, changeTurn] = useState('white')
    const [gameStatus, setGameStatus] = useState('PLAYING')
    const [promotionPiece, setPromotion] = useState('')
    const squares = readyUpChessBoard();
    const [layout, setLayout] = useState(squares)
    const [lastDest, setLastDest] = useState('')
    const [pause, setPause] = useState(false)  


    const ownColor = turn === 'white' ? 'black' : 'white'
    function setQueenPromotion (e) {
        document.querySelector('.modal').style.display = 'none'
        setPromotion(`queen-${ownColor}`)
        setPause(false)
        return
    }

    function setKnightPromotion(e) {
        document.querySelector('.modal').style.display = 'none'
        setPromotion(`knight-${ownColor}`)
        setPause(false)
        return 
    }

    function setBishopPromotion(e) {
        document.querySelector('.modal').style.display = 'none'
        setPromotion(`bishop-${ownColor}`)
        setPause(false)
        return
    }

    function setRookPromotion(e) {
        document.querySelector('.modal').style.display = 'none'
        setPromotion(`rook-${ownColor}`)
        setPause(false)
        console.log(promotionPiece)
        return
    }

    return (
        <GameBoardContext.Provider value={{ gameStatus, setGameStatus, turn, changeTurn, promotionPiece, setPromotion, layout, setLayout, squares,lastDest, setLastDest , setPause}}>
            <div className="modal" style={{display:"none"}}>
                <div className="modal-container">
                    <div id={`queen-${ownColor}`} className="black-square promotion" onClick={setQueenPromotion} />
                    <div id={`knight-${ownColor}`} className="black-square promotion" onClick={setKnightPromotion}/>
                    <div id={`rook-${ownColor}`} className="black-square promotion" onClick={setRookPromotion} />
                    <div id={`bishop-${ownColor}`} className="black-square promotion" onClick={setBishopPromotion} />
                </div>
            </div>
            <h1 id="gameStatus">Game Status: {gameStatus}</h1>
            <h1 id="turn">Turn: {turn.toUpperCase()}</h1>
            <div className="game-board">
                { pause ? null : <CreateGameboard />}
            </div>
        </GameBoardContext.Provider>
    )
}
//HI DELETE LATER
export default GameBoard