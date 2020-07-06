import React from 'react';

export const CreateGameboard = () => {

    const board = [];
    for(let i = 0; i < 64; i++) {
        if((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            if(i % 2 === 0) {
                board.push(<div className={`square-${i} plain-square`}></div>)
            } else {
                board.push(<div className={`square-${i} color-square`}></div>)
            }
        } else {
            if (i % 2 === 0) {
                board.push(<div className={`square-${i} color-square`}></div>)
            } else {
                board.push(<div className={`square-${i} plain-square`}></div>)
            }
        }
    }

    return (
        <>
            {board}
        </>
    )
}