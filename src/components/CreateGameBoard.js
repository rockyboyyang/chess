import React, { useState, useContext, useEffect } from 'react';
import readyUpChessBoard from '../squaresArray'
import Square from './Square';
import { pawnMoveLogic, knightMoveLogic, bishopMoveLogic, rookMoveLogic, queenMoveLogic, kingMoveLogic } from '../gameLogic/moveLogic'
import { isChecked } from '../gameLogic/checkLogic';
import { isCheckmate } from '../gameLogic/isCheckmateLogic'
import { GameBoardContext } from '../context/GameBoardContext'

export const CreateGameboard = () => {
    const { gameStatus, setGameStatus, turn, changeTurn, promotionPiece, setLayout, squares, lastDest, setLastDest, setPause, setPromotion, setGameBoard, sendGameboard, gameBoard, playerName } = useContext(GameBoardContext)
    const layout = gameBoard;
    const board = [];
    const [selectedPiece, setSelectedPiece] = useState('')
    const [previousSelected, setPreviousSelected] = useState('')
    const [blackKingMove, setBlackKingMove] = useState(false)
    const [whiteKingMove, setWhiteKingMove] = useState(false)
    const [whiteRook1Move, setWhiteRook1Move] = useState(false)
    const [whiteRook2Move, setWhiteRook2Move] = useState(false)
    const [blackRook1Move, setBlackRook1Move] = useState(false)
    const [blackRook2Move, setBlackRook2Move] = useState(false)
    const [whiteCasualties, setWhiteCasualties] = useState([])
    const [blackCasualties, setBlackCasualties] = useState([])
    const ifMoved = {
        blackKingMove,
        whiteKingMove,
        whiteRook1Move,
        whiteRook2Move,
        blackRook1Move,
        blackRook2Move,
    }
    const ownColor = turn === 'white' ? 'white' : 'black'
    const opponentColor = turn === 'white' ? 'black' : 'white'
    if (promotionPiece) {
        console.log(promotionPiece, 'This is promo ppiece')
        const tempArr = layout
        tempArr[lastDest] = promotionPiece
        setLayout(tempArr)
        setPromotion('')
        // let king = document.querySelector(`#king-black`)
        // console.log(king)
        // let kingSpot = Number(king.className.split(' ')[0].slice(7))
        // let kingSquare = king.className.split(' ')[1]
        // if (isChecked(kingSpot, opponentColor, layout, kingSquare, king.id)) {
        //     setGameStatus('CHECK!')
        // } 
        if (turn === 'white') sendGameboard(layout, 'black');
        if (turn === 'black') sendGameboard(layout, 'white');

    }

    // rotates the board and pieces for black
    if (playerName === 'black') {
        if(document.querySelector('.squares')){
            document.querySelector('.game-board').style.transform = 'rotate(180deg)'
            let allSquares = document.querySelectorAll('.squares')
            if(allSquares) {
                for(const square of allSquares) {
                    square.style.transform = 'rotate(180deg)'
                }
            }
        }
    }

    const selectPieceToMove = (e) => {
        if(playerName !== turn) return
        if(gameStatus === 'CHECKMATE!') return;
        setGameStatus('PLAYING')
        if(turn === 'white'){
            if(!selectedPiece) {
                if(e.target.id === 'undefined') return
                if(!e.target.id.includes(ownColor)) {
                    setGameStatus("That's not your piece!")
                    return
                }
                setSelectedPiece(e.target.id)
                setPreviousSelected(e.target.className)
            }
        } else {
            if (!selectedPiece) {
                if (e.target.id === 'undefined') return
                if (!e.target.id.includes(ownColor)) {
                    setGameStatus("That's not your piece!")
                    return
                }
                setSelectedPiece(e.target.id)
                setPreviousSelected(e.target.className)
            }
        }
        
        if (selectedPiece) {
            // returns if clicks on own piece
            if (e.target.id.includes(ownColor)) {
                setSelectedPiece('')
                return
            }
            // check for valid moves
            const currentSpot = Number(previousSelected.split(' ')[0].slice(7))
            const destination = Number(e.target.className.split(' ')[0].slice(7))
            setLastDest(destination)
            const currentSquareColor = previousSelected.split(' ')[1]
            const destSquareColor = e.target.className.split(' ')[1]
            // let opponentColor = turn === 'white' ? 'black' : 'white';

            if(selectedPiece.includes('pawn')) {
                if (!pawnMoveLogic(currentSpot, destination, ownColor, layout)) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('knight')) {
                if (!knightMoveLogic(currentSpot, destination)) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }
            
            if(selectedPiece.includes('bishop')) {
                if (!bishopMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('rook')) {
                if (!rookMoveLogic(currentSpot, destination, layout)) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('queen')) {
                if (!queenMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('king')) {
                let king = turn === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                if (!kingMoveLogic(currentSpot, destination, layout, opponentColor, destSquareColor, king.id, ifMoved )) {
                    setGameStatus('INVALID MOVE')
                    setSelectedPiece('')
                    return
                }
            }
            
            let tempArr = layout

            //  Checks to see if you can safely move a piece without
            // putting your king in check
            if(!selectedPiece.includes('king')){
                tempArr[destination] = selectedPiece
                tempArr[currentSpot] = 'null';
                let king = ownColor === 'white' ? document.querySelector(`#king-white`): document.querySelector(`#king-black`)
                let kingSpot = Number(king.className.split(' ')[0].slice(7))
                let kingSquare = king.className.split(' ')[1]
                if (isChecked(kingSpot, opponentColor, tempArr, kingSquare, king.id)) {
                    setGameStatus('INVALID: YOUR KING WILL BE IN CHECK')
                    tempArr[destination] = 'null'
                    tempArr[currentSpot] = selectedPiece;
                    setSelectedPiece('')
                    return;
                } 
            }

            // checks castling
            if (selectedPiece.includes('king') && Math.abs(currentSpot - destination) === 2) {
                let king = ownColor === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                for(let i = - 2; i < 0; i ++) {
                    let coloredSquare = document.querySelector(`.square-${currentSpot - i}`).className.split(' ')[1]
                    if(isChecked(currentSpot + i, opponentColor, layout, coloredSquare, king.id)) {
                        setGameStatus('INVALID: YOUR KING WILL BE IN CHECK')
                        return
                    }
                }
                for (let i = 2; i > 0; i--) {
                    let coloredSquare = document.querySelector(`.square-${currentSpot + i}`).className.split(' ')[1]
                    if (isChecked(currentSpot + i, opponentColor, layout, coloredSquare, king.id)) {
                        setGameStatus('INVALID: YOUR KING WILL BE IN CHECK')
                        return
                    }
                }
                if(currentSpot > destination) {
                    layout[currentSpot - 1] = layout[currentSpot - 4]
                    layout[currentSpot - 4] = 'null';
                } else if (currentSpot < destination) {
                    layout[currentSpot + 1] = layout[currentSpot + 3]
                    layout[currentSpot + 3] = 'null';
                }
                turn === 'white' ? setWhiteKingMove(true) : setBlackKingMove(true)
            }

            if(e.target.id !== 'undefined') {
               const tempCasualtyArr = turn === 'white' ? blackCasualties : whiteCasualties
               tempCasualtyArr.push(e.target.id)
               turn === 'white' ? setBlackCasualties(tempCasualtyArr) : setWhiteCasualties(tempCasualtyArr)
            }

            e.target.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected.split(' ')[0]}`).removeAttribute('id')
            // console.log(turn, 'before change cfb.js')
            // if (turn === 'white') changeTurn('black')
            // if (turn === 'black') changeTurn('white')
            // console.log(turn, 'after change cfb.js')
            tempArr[destination] = e.target.id
            tempArr[currentSpot] = 'null';
            // console.log('tempArr',tempArr)
            setLayout(tempArr)
            // king grabs the opposing king
            let king = opponentColor === 'black' ? document.querySelector(`#king-black`) : document.querySelector(`#king-white`)
            let kingSpot = Number(king.className.split(' ')[0].slice(7))
            let kingSquare = king.className.split(' ')[1]
            // if (gameStatus) setGameStatus('PLAYING')
            // checks for promotion 
            // document.querySelector(`.square-${destination}`).id = 'queen-white'
            // document.querySelector(`.square-${destination}`).id = 'queen-white'
            
            const promoArr = [0, 1, 2, 3, 4, 5, 6, 7, 56, 57, 58, 59, 60, 61, 62, 63]
            // console.log(promoArr.includes(destination))
            
            if (e.target.id.includes('pawn') && promoArr.includes(destination)) {
                document.querySelector('.modal').style.display = 'block'
                setPause(true)
                // while(!promotionPiece) {
                //     console.log('yeah')
                // }
                // pausecomp(5000)
                if(promotionPiece) {
                    const tempArr = layout
                    tempArr[lastDest] = promotionPiece
                    setLayout(tempArr)
                } 
            }

            
            // checks if either rook moved
            if (layout[0] === 'null') {
                setBlackRook1Move(true)
            } else if (layout[7] === 'null') {
                setBlackRook2Move(true)
            } else if (layout[56] === 'null') {
                setWhiteRook1Move(true)
            } else if (layout[63] === 'null') {
                setWhiteRook2Move(true)
            }
            // checks for checkmate
            // console.log(kingSpot, ownColor, opponentColor)
            if(isCheckmate(kingSpot, ownColor, layout, kingSquare, king.id, destination, opponentColor)) {
                setGameStatus('CHECKMATE!')
                sendGameboard(layout, turn, 'CHECKMATE!');
                return
            }
            if(isChecked(kingSpot, ownColor, layout, kingSquare, king.id)){
                setGameStatus('CHECK!')
                // console.log(gameStatus)
                sendGameboard(layout, turn, 'CHECK!');
            } else if(layout) {
                sendGameboard(layout, turn, gameStatus);
            }
            // console.log(gameBoard, 'asas')
            // if(layout) {
            //     // console.log(Object.keys(layout).length)
            //     // setGameBoard(layout)
            //     // console.log(gameStatus)
            //     // console.log('piece moved in create', layout.slice(48, 56).includes('null'))
            //     sendGameboard(layout, turn, gameStatus);
            // }
        } 
    }

    for(let i = 0; i < 64; i++) {
        let className;
        // if(layout[i] === undefined) console.log(layout)
        if((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            if(i % 2 === 0) {
                className = `square-${i} white-square squares`
                if(layout[i] !== 'null'){
                    board.push(<Square key={i} props={ {id: layout[i], selectPieceToMove, className} }></Square>)
                } else {
                    board.push(<Square key={i} props={{ id: 'null', selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} black-square squares`
                if (layout[i] !== 'null') {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ id: 'null', selectPieceToMove, className }}></Square>)
                }
            }
        } else {
            if (i % 2 === 0) {
                className = `square-${i} black-square squares`
                if (layout[i] !== 'null') {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ id: 'null', selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} white-square squares`
                if (layout[i] !== 'null') {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ id: 'null',selectPieceToMove, className }}></Square>)
                }
            }
        }
    }


    return (
        <>
            {board}
        </>
    )
}