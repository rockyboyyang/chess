import React from 'react';
import readyUpChessBoard from '../assets/squaresArray'

export const CreateGameboard = () => {
    const squares = readyUpChessBoard();
    const board = [];
    for(let i = 0; i < 64; i++) {
        if((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            if(i % 2 === 0) {
                if(squares[i] !== null){
                    board.push(<div className={`square-${i} plain-square ${squares[i]}`} key={i}></div>)
                } else {
                    board.push(<div className={`square-${i} plain-square`} key={i}></div>)
                }
            } else {
                if (squares[i] !== null) {
                    board.push(<div className={`square-${i} color-square ${squares[i]}`} key={i}></div>)
                } else {
                    board.push(<div className={`square-${i} color-square`} key={i}></div>)
                }
            }
        } else {
            if (i % 2 === 0) {
                if (squares[i] !== null) {
                    board.push(<div className={`square-${i} color-square ${squares[i]}`} key={i}></div>)
                } else {
                    board.push(<div className={`square-${i} color-square`} key={i}></div>)
                }
            } else {
                if (squares[i] !== null) {
                    board.push(<div className={`square-${i} plain-square ${squares[i]}`} key={i}></div>)
                } else {
                    board.push(<div className={`square-${i} plain-square`} key={i}></div>)
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