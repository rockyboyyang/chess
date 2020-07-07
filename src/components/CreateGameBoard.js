import React, { useState, } from 'react';
import readyUpChessBoard from '../assets/squaresArray'
import Square from './Square';
import { pawnMoveLogic, knightMoveLogic, bishopMoveLogic, rookMoveLogic, queenMoveLogic, kingMoveLogic } from '../moves/moveLogic'

export const CreateGameboard = () => {
    const squares = readyUpChessBoard();
    const board = [];
    const [layout, setLayout] = useState(squares)
    const [selectedPiece, setSelectedPiece] = useState('')
    const [previousSelected, setPreviousSelected] = useState('')
    const [turn, changeTurn] = useState('white')
    const [whiteCasualties, setWhiteCasualties] = useState([])
    const [blackCasualties, setBlackCasualties] = useState([])

    const selectPieceToMove = (e) => {
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
            // check for valid moves
            const currentSpot = Number(previousSelected.split(' ')[0].slice(7))
            const destination = Number(e.target.className.split(' ')[0].slice(7))
            const currentSquareColor = previousSelected.split(' ')[1]
            const destSquareColor = e.target.className.split(' ')[1]
            // const currentSpot = previousSelected;
            // const destination = e.target.className
            // console.log(previousSelected)
            // console.log(e.target.className)
            if(selectedPiece.includes('pawn')) {
                if (!pawnMoveLogic(currentSpot, destination, turn)) {
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('knight')) {
                if (!knightMoveLogic(currentSpot, destination)) {
                    setSelectedPiece('')
                    return
                }
            }
            
            if(selectedPiece.includes('bishop')) {
                if (!bishopMoveLogic(currentSpot, destination, currentSquareColor, destSquareColor)) {
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('rook')) {
                if (!rookMoveLogic(currentSpot, destination)) {
                    setSelectedPiece('')
                    return
                }
            }
            
            if (selectedPiece.includes('queen')) {
                if (!queenMoveLogic(currentSpot, destination)) {
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('king')) {
                if (!kingMoveLogic(currentSpot, destination)) {
                    setSelectedPiece('')
                    return
                }
            }

            // return if selected piece is own piece
            if(e.target.id.includes(turn)) return
            e.target.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected.split(' ')[0]}`).removeAttribute('id')
            if (turn === 'white') changeTurn('black')
            if (turn === 'black') changeTurn('white')
            let tempArr = layout
            tempArr[destination] = e.target.id
            tempArr[currentSpot] = null;
            setLayout(tempArr)
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