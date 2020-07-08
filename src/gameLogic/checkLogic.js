function isChecked (kingSpot, king, turn, layout, opposingColor) {
    function queenRookAndBishopLoop(queen, rookOrBishop, i) {
        if (layout[i] !== null && (layout[i] !== `${queen}-${turn}` && layout[i] !== `${rookOrBishop}-${turn}`)) {
            console.log('break')
            return false
        } else if (layout[i] === `${queen}-${turn}` || layout[i] === `${rookOrBishop}-${turn}`) {
            console.log('check')
            return true
        }
    }


    // Checks vertically for Queens and Rooks
    for(let i = kingSpot + 8; i < 64; i += 8) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
    }
    for (let i = kingSpot - 8; i >= 0; i -= 8) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
    }

    // Checks horizontally for Queens and Rooks
    const modulo = kingSpot % 8;
    const difference = 8 - modulo;

    for(let i = kingSpot - 1; i >= kingSpot - modulo; i--) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
    }
    for (let i = kingSpot + 1; i < kingSpot + difference; i++) {
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
    }


    // Checks Diagnally for Queens and Bishops
    for (let i = kingSpot + 9; i < 64; i += 9) {
        if (queenRookAndBishopLoop('queen', 'bishop', i)) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 9; i >= 0; i -= 9) {
        if (queenRookAndBishopLoop('queen', 'bishop', i)) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
   } 
    for (let i = kingSpot + 7; i < 64; i += 7) {
        if (queenRookAndBishopLoop('queen', 'bishop', i)) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 7; i >= 0; i -= 7) {
        if (queenRookAndBishopLoop('queen', 'bishop', i)) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
}

export {
    isChecked
}