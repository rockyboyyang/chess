import { pawnMoveLogic, kingMoveLogic } from "./moveLogic";
import { isChecked } from '../gameLogic/checkLogic';

const isCheckmate = (kingSpot, color, layout, kingSquare, kingId, destination, opponentColor) => {
    const gapArray = [];
    const diffCurrAndDest = Math.abs(kingSpot - destination)
    const modulo = kingSpot % 8;
    const difference = 8 - modulo;

    if (destination > kingSpot) {
        if (diffCurrAndDest % 9 === 0) {
            for (let i = kingSpot + 9; i < destination; i += 9) {
                gapArray.push(i);
            }
        } else if (diffCurrAndDest % 8 === 0) {
            for (let i = kingSpot + 8; i < destination; i += 8) {
                gapArray.push(i);
            }
        } else if (diffCurrAndDest % 7 === 0) {
            for (let i = kingSpot + 7; i < destination; i += 7) {
                gapArray.push(i);
            }
        } else if (destination >= kingSpot - modulo && destination < kingSpot + difference) {
            for (let i = kingSpot + 1; i < destination; i++) {
                gapArray.push(i)
            }
        }
    } else if (destination < kingSpot) {
        if (diffCurrAndDest % 9 === 0) {
            for (let i = kingSpot - 9; i > destination; i -= 9) {
                gapArray.push(i);
            }
        } else if (diffCurrAndDest % 8 === 0) {
            for (let i = kingSpot - 8; i > destination; i -= 8) {
                gapArray.push(i);
            }
        } else if (diffCurrAndDest % 7 === 0) {
            for (let i = kingSpot - 7; i > destination; i -= 7) {
                gapArray.push(i);
            }
        } else if (destination >= kingSpot - modulo && destination < kingSpot + difference) {
            for (let i = kingSpot - 1; i > destination; i--) {
                gapArray.push(i)
            }
        }
    }

    for (let i = 0; i < gapArray.length; i++) {
        let gapSquareColor = document.querySelector(`.square-${gapArray[i]}`).className.split(' ')[1]
        // if(
        //     isChecked(kingSpot, color, layout, kingSquare, kingId) &&
        //     !pawnMoveLogic(currentSpot, destination, turn, layout)
        // )
        console.log(gapArray)
        if (color === 'white') {
            console.log('white')
            if (gapArray[i] - 16 >= 0) {
                if (pawnMoveLogic(gapArray[i] - 16, gapArray[i], opponentColor, layout)) return false;
            }
            if (pawnMoveLogic(gapArray[i] - 8, gapArray[i], opponentColor, layout)) return false;
        } else {
            console.log('black')
            if (gapArray[i] + 16 <= 63) {
                if (pawnMoveLogic(gapArray[i] + 16, gapArray[i], opponentColor, layout)) return false;
            }
            if (pawnMoveLogic(gapArray[i] + 8, gapArray[i], opponentColor, layout)) return false;
        }

        // checks if a gap spot is in check
        if (isChecked(gapArray[i], opponentColor, layout, gapSquareColor, null)) return false;
    }

    if (!isChecked(kingSpot, color, layout, kingSquare, kingId)) {
        console.log('FALSE')
        return false;
    }

    let destDiv = document.querySelector(`.square-${destination}`)
    let destSquareColor = destDiv.className.split(' ')[1]

    // sees if the opposing piece that checks your king can be captured from opposing piece
    console.log(destDiv, opponentColor, destDiv.id)
    if (isChecked(destination, opponentColor, layout, destSquareColor, destDiv.id)) {
        console.log('FALSE')
        return false;
    }

    for (let i = -9; i <= 9; i++) {
        let noIncludes = [-6, -5, -4, -3, -2, 0, 2, 3, 4, 5, 6]
        let newDest = kingSpot + i;
        if ((newDest < 0 || newDest > 63) || noIncludes.includes(i)) continue;
        if (layout[newDest] !== null) {
            // console.log('newDest', layout[newDest], newDest)
            if (layout[newDest].includes(`${opponentColor}`)) continue;
        }
        // console.log(layout[newDest], color, opponentColor)
        let destDiv = document.querySelector(`.square-${newDest}`)
        let newDestSquareColor = destDiv.className.split(' ')[1]
        // if(destDiv.id.includes(`${opponentColor}`)) return false;
        if (kingMoveLogic(kingSpot, newDest, layout, color, newDestSquareColor, kingId)) {
            // console.log(kingSpot, newDest, color, newDestSquareColor, kingId)
            return false;
        }
    }
    console.log('CHECKMATE')
    return true
}

export {
    isCheckmate,
}