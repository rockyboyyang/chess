import React, { useState, } from 'react';

const Square = ({props}) => {
    return (
    <>
        <div id={`${props.id}`} className={props.className} onClick={props.selectFuncs}></div>
    </>    
    )
}

Square.defaultProps = {
    layout: [],
    id: ''
}
export default Square; 