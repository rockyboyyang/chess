import React, { useState, } from 'react';
import readyUpChessBoard from '../assets/squaresArray'
import Square from './Square';
import { pawnMoveLogic, knightMoveLogic, bishopMoveLogic } from '../moves/moveLogic'

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
                setPreviousSelected(e.target.className.split(' ')[0])
            }
        } else {
            if (!selectedPiece) {
                if (e.target.id === 'undefined') return
                if (!e.target.id.includes(`${turn}`)) {
                    return
                }
                setSelectedPiece(e.target.id)
                setPreviousSelected(e.target.className.split(' ')[0])
            }
        }
        
        if (selectedPiece) {
            // check for valid moves
            if(selectedPiece.includes('pawn')) {
                if (!pawnMoveLogic(Number(previousSelected.slice(7)), Number(e.target.className.split(' ')[0].slice(7)), turn)) {
                    setSelectedPiece('')
                    return
                }
            }

            if (selectedPiece.includes('knight')) {
                if (!knightMoveLogic(Number(previousSelected.slice(7)), Number(e.target.className.split(' ')[0].slice(7)))) {
                    setSelectedPiece('')
                    return
                }
            }
            
            if(selectedPiece.includes('bishop')) {
                if (!bishopMoveLogic(Number(previousSelected.slice(7)), Number(e.target.className.split(' ')[0].slice(7)))) {
                    setSelectedPiece('')
                    return
                }
            }

            
            // return if selected piece is own piece
            if(e.target.id.includes(turn)) return
            e.target.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected}`).removeAttribute('id')
            if (turn === 'white') changeTurn('black')
            if (turn === 'black') changeTurn('white')
        }
    }

    for(let i = 0; i < 64; i++) {
        let className;
        if((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            if(i % 2 === 0) {
                className = `square-${i} plain-square`
                if(squares[i] !== null){
                    board.push(<Square key={i} props={ {id: layout[i], selectFuncs: selectPieceToMove, className} }></Square>)
                } else {
                    board.push(<Square key={i} props={{selectFuncs: selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} color-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectFuncs: selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectFuncs: selectPieceToMove, className }}></Square>)
                }
            }
        } else {
            if (i % 2 === 0) {
                className = `square-${i} color-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectFuncs: selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectFuncs: selectPieceToMove, className }}></Square>)
                }
            } else {
                className = `square-${i} plain-square`
                if (squares[i] !== null) {
                    board.push(<Square key={i} props={{ id: layout[i], selectFuncs: selectPieceToMove, className }}></Square>)
                } else {
                    board.push(<Square key={i} props={{ selectFuncs: selectPieceToMove, className }}></Square>)
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