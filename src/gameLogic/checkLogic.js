function isChecked (kingSpot, color, layout, kingSquare, kingId) {
    // console.log(kingSpot, color, layout, kingSquare)
    function queenRookAndBishopLoop(queen, rookOrBishop, i) {
        if (layout[i] !== null && (layout[i] !== `${queen}-${color}` && layout[i] !== `${rookOrBishop}-${color}`)) {
            // console.log('break')
            return false
        } else if (layout[i] === `${queen}-${color}` || layout[i] === `${rookOrBishop}-${color}`) {
            // console.log('check')
            return true
        }
    }
    // console.log(king.split(' ')[1])
    // console.log(document.querySelector(`.square-10`).className.split(' ')[1])
    // Checks vertically for Queens and Rooks

    for(let i = kingSpot + 8; i < 64; i += 8) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }
    for (let i = kingSpot - 8; i >= 0; i -= 8) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }

    // Checks horizontally for Queens and Rooks
    const modulo = kingSpot % 8;
    const difference = 8 - modulo;

    for(let i = kingSpot - 1; i >= kingSpot - modulo; i--) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }
    for (let i = kingSpot + 1; i < kingSpot + difference; i++) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }


    // Checks Diagnally for Queens and Bishops
    for (let i = kingSpot + 9; i < 64; i += 9) {
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 9; i >= 0; i -= 9) {
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    } 
    for (let i = kingSpot + 7; i < 64; i += 7) {
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 7; i >= 0; i -= 7) {
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }

    //Checks L's for knights
    if(
        layout[kingSpot - 17] === `knight-${color}` ||
        layout[kingSpot - 15] === `knight-${color}` ||
        layout[kingSpot - 10] === `knight-${color}` ||
        layout[kingSpot - 6] === `knight-${color}` ||
        layout[kingSpot + 17] === `knight-${color}` ||
        layout[kingSpot + 15] === `knight-${color}` ||
        layout[kingSpot + 10] === `knight-${color}` ||
        layout[kingSpot + 6] === `knight-${color}`
    ) return true;
    
    if(kingId === 'king-white') {
        if (layout[kingSpot - 9] === `pawn-black` || layout[kingSpot - 7] === `pawn-black`) {
            return true;
        }
    } else if(kingId === 'king-black') {
        if (layout[kingSpot + 9] === `pawn-white` || layout[kingSpot + 7] === `pawn-white`) {
            return true;
        }
    }

    return false
}

export {
    isChecked
}