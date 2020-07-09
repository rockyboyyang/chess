import React, { useState, useContext } from 'react';
import readyUpChessBoard from '../assets/squaresArray'
import Square from './Square';
import { pawnMoveLogic, knightMoveLogic, bishopMoveLogic, rookMoveLogic, queenMoveLogic, kingMoveLogic } from '../gameLogic/moveLogic'
import { isChecked } from '../gameLogic/checkLogic';
import { isCheckmate } from '../gameLogic/isCheckmateLogic'
import { GameBoardContext } from '../context/GameBoardContext'

export const CreateGameboard = () => {
    const { gameStatus, setGameStatus, turn, changeTurn } = useContext(GameBoardContext)
    const squares = readyUpChessBoard();
    const board = [];
    const [layout, setLayout] = useState(squares)
    const [selectedPiece, setSelectedPiece] = useState('')
    const [previousSelected, setPreviousSelected] = useState('')
    const [blackKingMove, setBlackKingMove] = useState(false)
    const [whiteKingMove, setWhiteKingMove] = useState(false)
    const [whiteRook1Move, setWhiteRook1Move] = useState(false)
    const [whiteRook2Move, setWhiteRook2Move] = useState(false)
    const [blackRook1Move, setBlackRook1Move] = useState(false)
    const [blackRook2Move, setBlackRook2Move] = useState(false)
    // const [turn, changeTurn] = useState('white')
    // const [gameStatus, setGameStatus] = useState('')
    // const [whiteCasualties, setWhiteCasualties] = useState([])
    // const [blackCasualties, setBlackCasualties] = useState([])
    const ifMoved = {
        blackKingMove,
        whiteKingMove,
        whiteRook1Move,
        whiteRook2Move,
        blackRook1Move,
        blackRook2Move,
    }
    

    const selectPieceToMove = (e) => {
        if(gameStatus === 'CHECKMATE!') return;
        setGameStatus('PLAYING')
        if(turn === 'white'){
            if(!selectedPiece) {
                if(e.target.id === 'undefined') return
                if(!e.target.id.includes(`${turn}`)) {
                    return
                }
                setSelectedPiece(e.target.id)
                setPreviousSelected(e.target.className)
            }
        } else {
            if (!selectedPiece) {
                if (e.target.id === 'undefined') return
                if (!e.target.id.includes(`${turn}`)) {
                    return
                }
                setSelectedPiece(e.target.id)
                setPreviousSelected(e.target.className)
            }
        }
        
        if (selectedPiece) {
            // returns if clicks on own piece
            if (e.target.id.includes(turn)) {
                setSelectedPiece('')
                return
            }
            // check for valid moves
            const currentSpot = Number(previousSelected.split(' ')[0].slice(7))
            const destination = Number(e.target.className.split(' ')[0].slice(7))
            const currentSquareColor = previousSelected.split(' ')[1]
            const destSquareColor = e.target.className.split(' ')[1]
            let opponentColor = turn === 'white' ? 'black' : 'white';

            if(selectedPiece.includes('pawn')) {
                if (!pawnMoveLogic(currentSpot, destination, turn, layout)) {
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
                tempArr[currentSpot] = null;
                let king = turn === 'white' ? document.querySelector(`#king-white`): document.querySelector(`#king-black`)
                let kingSpot = Number(king.className.split(' ')[0].slice(7))
                let kingSquare = king.className.split(' ')[1]
                if (isChecked(kingSpot, opponentColor, tempArr, kingSquare, king.id)) {
                    setGameStatus('INVALID: YOUR KING WILL BE IN CHECK')
                    tempArr[destination] = null
                    tempArr[currentSpot] = selectedPiece;
                    setSelectedPiece('')
                    return;
                } 
            }

            // checks castling
            if (selectedPiece.includes('king') && Math.abs(currentSpot - destination) === 2) {
                let king = turn === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
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
                    layout[currentSpot - 4] = null;
                } else if (currentSpot < destination) {
                    layout[currentSpot + 1] = layout[currentSpot + 3]
                    layout[currentSpot + 3] = null;
                }
                turn === 'white' ? setWhiteKingMove(true) : setBlackKingMove(true)
            }

            e.target.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected.split(' ')[0]}`).removeAttribute('id')
            if (turn === 'white') changeTurn('black')
            if (turn === 'black') changeTurn('white')
            tempArr[destination] = e.target.id
            tempArr[currentSpot] = null;
            setLayout(tempArr)
            // king grabs the opposing king
            let king = turn === 'white' ? document.querySelector(`#king-black`) : document.querySelector(`#king-white`)
            let kingSpot = Number(king.className.split(' ')[0].slice(7))
            let kingSquare = king.className.split(' ')[1]
            if (gameStatus) setGameStatus('PLAYING')
            
            if(isChecked(kingSpot, turn, layout, kingSquare, king.id)){
                setGameStatus('CHECK!')
            } 

            // checks if either rook moved
            if (layout[0] === null) {
                setBlackRook1Move(true)
            } else if (layout[7] === null) {
                setBlackRook2Move(true)
            } else if (layout[56] === null) {
                setWhiteRook1Move(true)
            } else if (layout[63] === null) {
                setWhiteRook2Move(true)
            }

            if(isCheckmate(kingSpot, turn, layout, kingSquare, king.id, destination, opponentColor)) setGameStatus('CHECKMATE!')
        } 
    }

    for(let i = 0; i < 64; i++) {
        let className;
        if((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            if(i % 2 === 0) {
                className = `square-${i} white-square`
                if(squares[i] !== null){
                    board.push(<Square key={i} props={ {id: layout[i], selectPieceToMove, className} }></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} black-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectPieceToMove, className }}></Square>)
                }
            }
        } else {
            if (i % 2 === 0) {
                className = `square-${i} black-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} white-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectPieceToMove, className }}></Square>)
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