import React, { useState, useContext, useEffect } from 'react';
import readyUpChessBoard from '../squaresArray'
import Square from './Square';
import { pawnMoveLogic, knightMoveLogic, bishopMoveLogic, rookMoveLogic, queenMoveLogic, kingMoveLogic } from '../gameLogic/moveLogic'
import { isChecked } from '../gameLogic/checkLogic';
import { isCheckmate } from '../gameLogic/isCheckmateLogic'
import { GameBoardContext } from '../context/GameBoardContext'

export const CreateGameboard = () => {
    const { gameStatus, setGameStatus, turn, changeTurn, promotionPiece, setLayout, squares, lastDest, setLastDest, setPause, setPromotion, setGameBoard, sendGameboard, gameBoard, playerName, onePlayerGame, twoPlayerGame } = useContext(GameBoardContext)
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
        const tempArr = layout
        tempArr[lastDest] = promotionPiece
        setLayout(tempArr)
        setPromotion('')
        
        if(twoPlayerGame) {
            if (turn === 'white') sendGameboard(layout, 'black');
            if (turn === 'black') sendGameboard(layout, 'white');
        } else {
            if (turn === 'white') changeTurn('black')
            if (turn === 'black') changeTurn('white')
        }
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

    if (gameStatus === 'CHECKMATE!' && document.getElementById('gameStatus')) document.getElementById('gameStatus').className = 'animate__animated animate__wobble animate__repeat-3'
    if (playerName === turn && document.getElementById('turn')) {
        document.getElementById('turn').className = 'animate__animated animate__rubberBand animate__repeat-3'
    } else if (playerName !== turn && document.getElementById('turn')){
        document.getElementById('turn').removeAttribute('class')
    }

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    // AI Moves
    const aiMoves = () => {
        if(onePlayerGame) {
            if(playerName === 'white' && turn === 'black') {
                selectPieceToMove()
            }
            if (playerName === 'black' && turn === 'white') {
                selectPieceToMove()
            }
        }
    }

    useEffect(() => {
        try {
            aiMoves();
        } catch (e) {
            console.log(e)
        }
    },)

    const selectPieceToMove = (e) => {
        if(gameStatus === 'CHECKMATE!') return;
        let tempSelectedPiece;
        if(onePlayerGame) {
            if(playerName === 'white' && turn === 'black') {
                let arrOfAIsquareNums = [];
                for(let i = 0; i < layout.length; i++) {
                    if(layout[i].includes('black')) {
                        arrOfAIsquareNums.push(i)
                    }
                }
                let randomPiece = randomIntFromInterval(0, arrOfAIsquareNums.length - 1)
                tempSelectedPiece = document.querySelector(`.square-${arrOfAIsquareNums[randomPiece]}`)
            } else if (playerName === 'black' && turn === 'white') {
                let arrOfAIsquareNums = [];
                for (let i = 0; i < layout.length; i++) {
                    if (layout[i].includes('white')) {
                        arrOfAIsquareNums.push(i)
                    }
                }
                let randomPiece = randomIntFromInterval(0, arrOfAIsquareNums.length - 1)
                tempSelectedPiece = document.querySelector(`.square-${arrOfAIsquareNums[randomPiece]}`)
            } else {
                if (playerName !== turn) return
                tempSelectedPiece = e.target
            }
        } else {
            if (playerName !== turn) return
            tempSelectedPiece = e.target
        }
        setGameStatus('PLAYING')
        if(turn === 'white'){
            if(!selectedPiece) {
                if(tempSelectedPiece.id === 'undefined') return
                if(!tempSelectedPiece.id.includes(ownColor)) {
                    setGameStatus("That's not your piece!")
                    return
                }
                setSelectedPiece(tempSelectedPiece.id)
                setPreviousSelected(tempSelectedPiece.className)
            }
        } else {
            if (!selectedPiece) {
                if (tempSelectedPiece.id === 'undefined') return
                if (!tempSelectedPiece.id.includes(ownColor)) {
                    setGameStatus("That's not your piece!")
                    return
                }
                setSelectedPiece(tempSelectedPiece.id)
                setPreviousSelected(tempSelectedPiece.className)
            }
        }
        
        if (selectedPiece) {
            let pieceCanMove = false;
            let aiTurn = false;
            let visitedDest = {}
            while(pieceCanMove === false) {
            let tempSelectedDest;
            if (onePlayerGame) {
                if (playerName === 'white' && turn === 'black') {
                    aiTurn = true;
                    let arrOfAIsquareNums = [];
                    for (let i = 0; i < layout.length; i++) {
                        if (layout[i].includes('black')) {
                            arrOfAIsquareNums.push(i)
                        }
                    }
                    let randomDest = randomIntFromInterval(0, 63)
                    if(randomDest in visitedDest) continue
                    visitedDest[randomDest] = randomDest
                    tempSelectedDest = document.querySelector(`.square-${randomDest}`)
                } else if (playerName === 'black' && turn === 'white'){
                    aiTurn = true;
                    let arrOfAIsquareNums = [];
                    for (let i = 0; i < layout.length; i++) {
                        if (layout[i].includes('white')) {
                            arrOfAIsquareNums.push(i)
                        }
                    }
                    let randomDest = randomIntFromInterval(0, 63)
                    if (randomDest in visitedDest) continue
                    visitedDest[randomDest] = randomDest
                    tempSelectedDest = document.querySelector(`.square-${randomDest}`)
                } else {
                    tempSelectedDest = e.target
                }
            } else {
                tempSelectedDest = e.target
            }

            // returns if clicks on own piece
            if (tempSelectedDest.id.includes(ownColor)) {
                setSelectedPiece('')
                return
            }
            // check for valid moves
            const currentSpot = Number(previousSelected.split(' ')[0].slice(7))
            const destination = Number(tempSelectedDest.className.split(' ')[0].slice(7))
            setLastDest(destination)
            const currentSquareColor = previousSelected.split(' ')[1]
            const destSquareColor = tempSelectedDest.className.split(' ')[1]
            // let opponentColor = turn === 'white' ? 'black' : 'white';

            if(selectedPiece.includes('pawn')) {
                if(aiTurn) {
                    if (!pawnMoveLogic(currentSpot, destination, ownColor, layout)) {
                        continue
                    }
                } else {
                    if (!pawnMoveLogic(currentSpot, destination, ownColor, layout)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }

            if (selectedPiece.includes('knight')) {
                if (aiTurn) {
                    if (!knightMoveLogic(currentSpot, destination, ownColor, layout)) {
                        continue
                    }
                } else {
                    if (!knightMoveLogic(currentSpot, destination, ownColor, layout)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }
            
            if(selectedPiece.includes('bishop')) {
                if (aiTurn) {
                    if (!bishopMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                        continue
                    }
                } else {
                    if (!bishopMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }

            if (selectedPiece.includes('rook')) {
                if (aiTurn) {
                    if (!rookMoveLogic(currentSpot, destination, layout)) {
                        continue
                    }
                } else {
                    if (!rookMoveLogic(currentSpot, destination, layout)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }

            if (selectedPiece.includes('queen')) {
                if (aiTurn) {
                    if (!queenMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                        continue
                    }
                } else {
                    if (!queenMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor, layout)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }

            if (selectedPiece.includes('king')) {
                let king = turn === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                if (aiTurn) {
                    if (!kingMoveLogic(currentSpot, destination, layout, opponentColor, destSquareColor, king.id, ifMoved)) {
                        continue
                    }
                } else {
                    if (!kingMoveLogic(currentSpot, destination, layout, opponentColor, destSquareColor, king.id, ifMoved)) {
                        setGameStatus('INVALID MOVE')
                        setSelectedPiece('')
                        return
                    }
                }
            }
            
            let tempArr = layout

            //  Checks to see if you can safely move a piece without
            // putting your king in check
            if(aiTurn) {
                if (!selectedPiece.includes('king')) {
                    let tempPiece = tempArr[destination]
                    tempArr[destination] = selectedPiece
                    tempArr[currentSpot] = 'null';
                    let king = ownColor === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                    let kingSpot = Number(king.className.split(' ')[0].slice(7))
                    let kingSquare = king.className.split(' ')[1]
                    if (isChecked(kingSpot, opponentColor, tempArr, kingSquare, king.id)) {
                        tempArr[destination] = tempPiece
                        tempArr[currentSpot] = selectedPiece;
                        continue;
                    }
                }
            } else {
                if (!selectedPiece.includes('king')) {
                    let tempPiece = tempArr[destination]
                    tempArr[destination] = selectedPiece
                    tempArr[currentSpot] = 'null';
                    let king = ownColor === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                    let kingSpot = Number(king.className.split(' ')[0].slice(7))
                    let kingSquare = king.className.split(' ')[1]
                    if (isChecked(kingSpot, opponentColor, tempArr, kingSquare, king.id)) {
                        setGameStatus('INVALID: YOUR KING WILL BE IN CHECK')
                        tempArr[destination] = tempPiece
                        tempArr[currentSpot] = selectedPiece;
                        setSelectedPiece('')
                        return;
                    }
                }
            }

            // checks castling
            if(aiTurn) {
                if (selectedPiece.includes('king') && Math.abs(currentSpot - destination) === 2) {
                    let king = ownColor === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                    for (let i = - 2; i < 0; i++) {
                        let coloredSquare = document.querySelector(`.square-${currentSpot - i}`).className.split(' ')[1]
                        if (isChecked(currentSpot + i, opponentColor, layout, coloredSquare, king.id)) {
                            continue
                        }
                    }
                    for (let i = 2; i > 0; i--) {
                        let coloredSquare = document.querySelector(`.square-${currentSpot + i}`).className.split(' ')[1]
                        if (isChecked(currentSpot + i, opponentColor, layout, coloredSquare, king.id)) {
                            continue
                        }
                    }
                    if (currentSpot > destination) {
                        layout[currentSpot - 1] = layout[currentSpot - 4]
                        layout[currentSpot - 4] = 'null';
                    } else if (currentSpot < destination) {
                        layout[currentSpot + 1] = layout[currentSpot + 3]
                        layout[currentSpot + 3] = 'null';
                    }
                    turn === 'white' ? setWhiteKingMove(true) : setBlackKingMove(true)
                }
            } else {
                if (selectedPiece.includes('king') && Math.abs(currentSpot - destination) === 2) {
                    let king = ownColor === 'white' ? document.querySelector(`#king-white`) : document.querySelector(`#king-black`)
                    for (let i = - 2; i < 0; i++) {
                        let coloredSquare = document.querySelector(`.square-${currentSpot - i}`).className.split(' ')[1]
                        if (isChecked(currentSpot + i, opponentColor, layout, coloredSquare, king.id)) {
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
                    if (currentSpot > destination) {
                        layout[currentSpot - 1] = layout[currentSpot - 4]
                        layout[currentSpot - 4] = 'null';
                    } else if (currentSpot < destination) {
                        layout[currentSpot + 1] = layout[currentSpot + 3]
                        layout[currentSpot + 3] = 'null';
                    }
                    turn === 'white' ? setWhiteKingMove(true) : setBlackKingMove(true)
                }
            }

            if(tempSelectedDest.id !== 'undefined') {
                const tempCasualtyArr = turn === 'white' ? blackCasualties : whiteCasualties
                tempCasualtyArr.push(tempSelectedDest.id)
                turn === 'white' ? setBlackCasualties(tempCasualtyArr) : setWhiteCasualties(tempCasualtyArr)
            }

            tempSelectedDest.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected.split(' ')[0]}`).removeAttribute('id')
            tempArr[destination] = tempSelectedDest.id
            tempArr[currentSpot] = 'null';
            setLayout(tempArr)

            // king grabs the opposing king
            let king = opponentColor === 'black' ? document.querySelector(`#king-black`) : document.querySelector(`#king-white`)
            let kingSpot = Number(king.className.split(' ')[0].slice(7))
            let kingSquare = king.className.split(' ')[1]

            
            const promoArr = [0, 1, 2, 3, 4, 5, 6, 7, 56, 57, 58, 59, 60, 61, 62, 63]
            
            if (tempSelectedDest.id.includes('pawn') && promoArr.includes(destination)) {
                document.querySelector('.modal').style.display = 'block'
                setPause(true)
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

            if(isCheckmate(kingSpot, ownColor, layout, kingSquare, king.id, destination, opponentColor)) {
                setGameStatus('CHECKMATE!')
                console.log(true)
                document.getElementById('gameStatus').className = 'animate__animated animate__wobble animate__repeat-3'
                if (twoPlayerGame) sendGameboard(layout, turn, 'CHECKMATE!');
                pieceCanMove = true;
                setTimeout(() => {
                    return   
                }, 3000)
                return
            } else {
                console.log(false)
            }
            if(isChecked(kingSpot, ownColor, layout, kingSquare, king.id)){
                // document.getElementById('turn').removeAttribute('class')
                setGameStatus('CHECK!')
                if(twoPlayerGame) sendGameboard(layout, turn, 'CHECK!');
                else {
                    setGameStatus('CHECK!')
                    pieceCanMove = true;
                    if (turn === 'white') changeTurn('black')
                    if (turn === 'black') changeTurn('white')
                }
            } else if(layout) {
                // document.getElementById('turn').removeAttribute('class')

                if(twoPlayerGame) sendGameboard(layout, turn, gameStatus)
                else {
                    pieceCanMove = true;
                    if (turn === 'white') changeTurn('black')
                    if (turn === 'black') changeTurn('white')
                }
            }
            } 
        }
    }

    for(let i = 0; i < 64; i++) {
        let className;
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