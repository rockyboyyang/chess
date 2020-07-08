function isChecked (kingSpot, king, turn, layout, opposingColor) {
    function queenAndRookLoop(i) {
        if (layout[i] !== null && (layout[i] !== `queen-${turn}` && layout[i] !== `rook-${turn}`)) {
            console.log('break')
            return false
        } else if (layout[i] === `queen-${turn}` || layout[i] === `rook-${turn}`) {
            console.log('check')
            return true
        }
    }

    // Checks vertically for Queens and Rooks
    for(let i = kingSpot + 8; i < 64; i += 8) {
        if(queenAndRookLoop(i)) return true
    }
    for (let i = kingSpot - 8; i >= 0; i -= 8) {
        if (queenAndRookLoop(i)) return true
    }

    // Checks horizontally for Queens and Rooks
    const modulo = kingSpot % 8;
    const difference = 8 - modulo;

    for(let i = kingSpot - 1; i >= kingSpot - modulo; i--) {
        if (queenAndRookLoop(i)) return true
    }
    for (let i = kingSpot + 1; i < kingSpot + difference; i++) {
        if (queenAndRookLoop(i)) return true
    }

    return false
}

export {
    isChecked
}