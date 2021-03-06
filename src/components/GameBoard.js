import React, { useState, useEffect } from 'react';
import { CreateGameboard } from './CreateGameBoard'
import { GameBoardContext } from '../context/GameBoardContext'
import Square from './Square';
import readyUpChessBoard from '../squaresArray'
import Footer from './Footer'

const GameBoard = ({playerName, match, gameBoard ,setGameBoard, sendGameboard, turn, changeTurn, gameStatus, setGameStatus, onePlayerGame, twoPlayerGame, quitGame}) => {
    // const [gameStatus, setGameStatus] = useState('PLAYING')
    const [promotionPiece, setPromotion] = useState('')
    const squares = readyUpChessBoard();
    const [layout, setLayout] = useState(gameBoard)
    const [lastDest, setLastDest] = useState('')
    const [pause, setPause] = useState(false)  
    // console.log('piece moved',layout.slice(48, 56).includes('null'))
    // console.log('gameboard.js', gameBoard.slice(48, 56).includes('null'))
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
        return
    }

    return (
        <GameBoardContext.Provider value={{ gameStatus, setGameStatus, turn, changeTurn, promotionPiece, setPromotion, layout, setLayout, squares,lastDest, setLastDest , setPause, setGameBoard, sendGameboard, gameBoard, playerName, onePlayerGame, twoPlayerGame}}>
            {match ? (
                <>
                    <div className="modal" style={{display:"none"}}>
                        <div className="modal-container">
                            <div id={`queen-${ownColor}`} className="black-square promotion" onClick={setQueenPromotion} />
                            <div id={`knight-${ownColor}`} className="black-square promotion" onClick={setKnightPromotion}/>
                            <div id={`rook-${ownColor}`} className="black-square promotion" onClick={setRookPromotion} />
                            <div id={`bishop-${ownColor}`} className="black-square promotion" onClick={setBishopPromotion} />
                        </div>
                    </div>
                    <div className='body-container'>
                        <nav>
                            <h1 id="gameStatus">Game Status: {gameStatus}</h1>
                            <div className='quit-button' onClick={quitGame}>QUIT</div>
                            <h1 id="turn">Turn: {turn.toUpperCase()}</h1>
                        </nav>
                        <div className="game-board">
                            { pause ? null : <CreateGameboard />}
                        </div>
                        <Footer />
                    </div>
                </>
            ) : (
                <h3 className='waiting'>Waiting for game to start...</h3>
            )}
        </GameBoardContext.Provider>
    )
}
//HI DELETE LATER
export default GameBoard