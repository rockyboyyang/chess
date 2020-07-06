import React, { useState, } from 'react';
import readyUpChessBoard from '../assets/squaresArray'
import Square from './Square';

export const CreateGameboard = () => {
    const squares = readyUpChessBoard();
    const board = [];
    const [layout, setLayout] = useState(squares)
    const [selectedPiece, setSelectedPiece] = useState('')
    const [previousSelected, setPreviousSelected] = useState('')
    // const [layout, setLayout] = useState(squares)
    
    const selectPieceToMove = (e) => {
        if(!selectedPiece) {
            if(e.target.id === 'undefined') return
            setSelectedPiece(e.target.id)
            setPreviousSelected(e.target.className.split(' ')[0])
        }
        // console.log(previousSelected)

        if (selectedPiece) {
            e.target.id = selectedPiece;
            setSelectedPiece('')
            document.querySelector(`.${previousSelected}`).removeAttribute('id')
        }
            
        // console.log(e.target.key)
        // e.target.id =''
      
        // console.log(e.target.className)
    }

    // const selectPieceToLand = (e) => {
    //     if(selectedPiece) {
    //         e.target.id = selectedPiece
    //         setSelectedPiece('')
    //     }
    // }

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