import React, { useState, } from 'react';

const Square = ({props}) => {
    return (
    <>
        <div id={`${props.id}`} className={props.className} onClick={props.selectPieceToMove}></div>
    </>    
    )
}

Square.defaultProps = {
    layout: [],
    id: ''
}
export default Square; 