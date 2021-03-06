import { pawnMoveLogic, kingMoveLogic } from "./moveLogic";
import { isChecked } from '../gameLogic/checkLogic';

const isCheckmate = (kingSpot, color, layout, kingSquare, kingId, destination, opponentColor) => {
    const gapArray = [];
    const diffCurrAndDest = Math.abs(kingSpot - destination)
    const modulo = kingSpot % 8;
    const difference = 8 - modulo;
    console.log(kingSpot, color, layout, kingSquare, kingId, destination, opponentColor)

    /*
    kingspot === 6
    color === white
    kingSquare === white-square
    kingId === king-black
    destination === 4
    opponentColor === white
    diffCurrAndDest === 2
    */
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

    console.log(gapArray, 'gapArray before loop')
    for (let i = 0; i < gapArray.length; i++) {
        let gapSquareColor = document.querySelector(`.square-${gapArray[i]}`).className.split(' ')[1]
        if (color === 'white') {
            if (gapArray[i] - 16 >= 0) {
                if (pawnMoveLogic(gapArray[i] - 16, gapArray[i], opponentColor, layout)) return false;
            }
            if (pawnMoveLogic(gapArray[i] - 8, gapArray[i], opponentColor, layout)) return false;
        } else {
            if (gapArray[i] + 16 <= 63) {
                if (pawnMoveLogic(gapArray[i] + 16, gapArray[i], opponentColor, layout)) return false;
            }
            if (pawnMoveLogic(gapArray[i] + 8, gapArray[i], opponentColor, layout)) return false;
        }

        // checks if a gap spot is in check
        if (!isChecked(gapArray[i], color, layout, gapSquareColor, null)) return false;

        if (isChecked(gapArray[i], opponentColor, layout, gapSquareColor, null)) return false;
    }
    console.log(gapArray, 'gapArray after loop')
    if (!isChecked(kingSpot, color, layout, kingSquare, kingId)) {
        return false;
    }

    let destDiv = document.querySelector(`.square-${destination}`)
    let destSquareColor = destDiv.className.split(' ')[1]

    // sees if the opposing piece that checks your king can be captured from opposing piece
    if (isChecked(destination, opponentColor, layout, destSquareColor, destDiv.id)) {
        return false;
    }

    for (let i = -9; i <= 9; i++) {
        let noIncludes = [-6, -5, -4, -3, -2, 0, 2, 3, 4, 5, 6]
        let newDest = kingSpot + i;
        if ((newDest < 0 || newDest > 63) || noIncludes.includes(i)) continue;
        if (layout[newDest] !== null) {
            if (layout[newDest].includes(`${opponentColor}`)) continue;
        }
        // console.log(layout[newDest], color, opponentColor)
        let destDiv = document.querySelector(`.square-${newDest}`)
        let newDestSquareColor = destDiv.className.split(' ')[1]
        // if(destDiv.id.includes(`${opponentColor}`)) return false;
        if (kingMoveLogic(kingSpot, newDest, layout, color, newDestSquareColor, kingId)) {
            return false;
        }
    }
    return true
}

export {
    isCheckmate,
}