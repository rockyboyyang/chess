import { pawnMoveLogic, knightMoveLogic, kingMoveLogic } from "./moveLogic";

function isChecked (kingSpot, color, layout, kingSquare, kingId) {
    // console.log(kingSpot, color, layout, kingSquare)
    // console.log(kingId)
    function queenRookAndBishopLoop(queen, rookOrBishop, i) {
        // if(layout[i] === kingId)
        if (layout[i] !== null && (layout[i] !== `${queen}-${color}` && layout[i] !== `${rookOrBishop}-${color}`)) {
            // console.log('break')
            return false
        } else if (layout[i] === `${queen}-${color}` || layout[i] === `${rookOrBishop}-${color}`) {
            // console.log('check')
            return true
        }
    }

    for(let i = kingSpot + 8; i < 64; i += 8) {
        if(layout[i] === kingId) continue
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
        if (layout[i] === kingId) continue
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }
    for (let i = kingSpot + 1; i < kingSpot + difference; i++) {
        if (layout[i] === kingId) continue
        if (queenRookAndBishopLoop('queen', 'rook', i)) return true
        else if (queenRookAndBishopLoop('queen', 'rook', i) === false) break;
    }


    // Checks Diagnally for Queens and Bishops
    for (let i = kingSpot + 9; i < 64; i += 9) {
        if (layout[i] === kingId) continue
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 9; i >= 0; i -= 9) {
        if (layout[i] === kingId) continue
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    } 
    for (let i = kingSpot + 7; i < 64; i += 7) {
        if (layout[i] === kingId) continue
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }
    for (let i = kingSpot - 7; i >= 0; i -= 7) {
        if (layout[i] === kingId) continue
        const checkedSquares = document.querySelector(`.square-${i}`).className.split(' ')[1]
        if (queenRookAndBishopLoop('queen', 'bishop', i) && checkedSquares === kingSquare) return true
        else if (queenRookAndBishopLoop('queen', 'bishop', i) === false) break;
    }

    //Checks L's for knights
    const colOne = [0, 8, 16, 24, 32, 40, 48, 56]
    const colTwo = [1, 9, 17, 25, 33, 41, 49, 57]
    const colSeven = [6, 14, 22, 30, 38, 46, 54, 62]
    const colEight = [7, 15, 23, 31, 39, 47, 55, 63]

    if(colOne.includes(kingSpot)) {
        if (
            layout[kingSpot - 15] === `knight-${color}` ||
            layout[kingSpot - 6] === `knight-${color}` ||
            layout[kingSpot + 17] === `knight-${color}` ||
            layout[kingSpot + 10] === `knight-${color}` 
        ) return true;
    } else if (colTwo.includes(kingSpot)) {
        if (
            layout[kingSpot - 17] === `knight-${color}` ||
            layout[kingSpot - 15] === `knight-${color}` ||
            layout[kingSpot - 6] === `knight-${color}` ||
            layout[kingSpot + 17] === `knight-${color}` ||
            layout[kingSpot + 15] === `knight-${color}` ||
            layout[kingSpot + 10] === `knight-${color}`
        ) return true
    } else if (colSeven.includes(kingSpot)) {
        if (
            layout[kingSpot - 17] === `knight-${color}` ||
            layout[kingSpot - 15] === `knight-${color}` ||
            layout[kingSpot - 10] === `knight-${color}` ||
            layout[kingSpot + 17] === `knight-${color}` ||
            layout[kingSpot + 15] === `knight-${color}` ||
            layout[kingSpot + 6] === `knight-${color}`
        ) return true
    } else if (colEight.includes(kingSpot)) {
        if (
            layout[kingSpot - 17] === `knight-${color}` ||
            layout[kingSpot - 10] === `knight-${color}` ||
            layout[kingSpot + 15] === `knight-${color}` ||
            layout[kingSpot + 6] === `knight-${color}`
        ) return true
    } else {
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
    }
    
    const upLeft = kingSpot - 9;
    const upRight = kingSpot - 7;
    const downLeft = kingSpot + 7;
    const downRight = kingSpot + 9;
    // const checkedSquaresNine = kingId === 'king-white' ? document.querySelector(`.square-${upLeft}`).className.split(' ')[1] : document.querySelector(`.square-${downRight}`).className.split(' ')[1]
    // const checkedSquaresSeven = kingId === 'king-white' ? document.querySelector(`.square-${upRight}`).className.split(' ')[1] : document.querySelector(`.square-${downLeft}`).className.split(' ')[1]
    // console.log(checkedSquaresSeven, checkedSquaresNine, kingSquare)
    const leftSide = [0, 8, 16, 24, 32, 40, 48, 56]
    const rightSide = [7, 15, 23, 31, 39, 47, 55, 63]
    
    if(kingId !== null) {
        // console.log(kingId)
        if(leftSide.includes(kingSpot)) {
            if(kingId.includes('white')) {
                if (layout[upRight] === `pawn-black`) {
                    return true;
                }
            } else if(kingId.includes('black')) {
                if (layout[downRight] === `pawn-white`) {
                    return true;
                }
            }
        } else if (rightSide.includes(kingSpot)) {
            if (kingId.includes('king-white')) {
                if (layout[upLeft] === `pawn-black`) {
                    return true;
                }
            } else if (kingId.includes('king-black')) {
                if (layout[downLeft] === `pawn-white`) {
                    return true;
                }
            }
        } else {
            if(kingId.includes('white')) {
                if (layout[upLeft] === `pawn-black` || layout[upRight] === `pawn-black`) {
                    return true;
                }
            } else if(kingId.includes('black')) {
                if (layout[downRight] === `pawn-white` || layout[downLeft] === `pawn-white`) {
                    return true;
                }
            }
        }
    }
    return false
}

export {
    isChecked,
}