import { isChecked } from './checkLogic';

const colOne = [0, 8, 16, 24, 32, 40, 48, 56]
const colTwo = [1, 9, 17, 25, 33, 41, 49, 57]
const colSeven = [6, 14, 22, 30, 38, 46, 54, 62]
const colEight = [7, 15, 23, 31, 39, 47, 55, 63]

const pawnMoveLogic = (currentSpot, destination, turn, layout) => {
    if(currentSpot < 0 || currentSpot > 63) return false;
    if(layout[currentSpot] === 'null') return false;
    if(layout[currentSpot] !== 'null' && currentSpot >= 0 && currentSpot <= 63) {

        if(!layout[currentSpot].includes('pawn')) return false;
    }
    const whiteArr = [48, 49, 50, 51, 52, 53, 54, 55]
    const blackArr = [8, 9, 10, 11, 12, 13, 14, 15]
    if (turn === 'white') {
        if (whiteArr.includes(currentSpot)) {
            if ((currentSpot - destination === 8 || currentSpot - destination === 16) && layout[currentSpot - 8] === 'null' && layout[destination] === 'null') return true;
        } else {
            if (currentSpot - destination === 8 && layout[currentSpot - 8] === 'null') return true;
        }
        if (layout[destination] !== 'null' && destination === currentSpot - 7 && !colEight.includes(currentSpot)) return true
        if (layout[destination] !== 'null' && destination === currentSpot - 9 && !colOne.includes(currentSpot)) return true
        return false;
    } else {
        if (blackArr.includes(currentSpot)) {
            if ((currentSpot + 8 === destination || currentSpot + 16 === destination) && layout[currentSpot + 8] === 'null' && layout[destination] === 'null') return true;
        } else {
            if (currentSpot + 8 === destination && layout[currentSpot + 8] === 'null') return true;
        }
        if (layout[destination] !== 'null' && destination === currentSpot + 7 && !colOne.includes(currentSpot)) return true
        if (layout[destination] !== 'null' && destination === currentSpot + 9 && !colEight.includes(currentSpot)) return true
        return false;
    }
}

const knightMoveLogic = (currentSpot, destination) => {


    if(colOne.includes(currentSpot)) {
        if(
            currentSpot - 15 === destination ||
            currentSpot - 6 === destination ||
            currentSpot + 10 === destination ||
            currentSpot + 17 === destination
        ) return true
    } else if(colTwo.includes(currentSpot)) {
        if(
            currentSpot - 17 === destination ||
            currentSpot - 15 === destination ||
            currentSpot - 6 === destination ||
            currentSpot + 10 === destination ||
            currentSpot + 15 === destination ||
            currentSpot + 17 === destination
        ) return true
    } else if(colSeven.includes(currentSpot)) {
        if(
            currentSpot - 17 === destination ||
            currentSpot - 10 === destination ||
            currentSpot - 15 === destination ||
            currentSpot + 6 === destination ||
            currentSpot + 15 === destination ||
            currentSpot + 17 === destination
        ) return true
    } else if(colEight.includes(currentSpot)) {
        if(
            currentSpot - 17 === destination ||
            currentSpot - 10 === destination ||
            currentSpot + 6 === destination ||
            currentSpot + 15 === destination
        ) return true
    } else if (
        currentSpot - 17 === destination ||
        currentSpot - 15 === destination ||
        currentSpot - 10 === destination ||
        currentSpot - 6 === destination ||
        currentSpot + 17 === destination ||
        currentSpot + 15 === destination ||
        currentSpot + 10 === destination ||
        currentSpot + 6 === destination
    ) return true
    else {
        return false;
    }
}

function checkObstacle(currentSpot, destination, layout, increment, modulo, difference) {
    let blockSpace;
    // blockspace will represent the first space that has a piece on it
    if (modulo && difference) {
        if (currentSpot > destination) {
            for (let i = currentSpot - increment; i >= currentSpot - modulo; i--) {
                blockSpace = i;
                if (layout[i] !== 'null') break;
            }
            if (blockSpace > destination) {
                return false
            }
        } else {
            for (let i = currentSpot + increment; i < currentSpot + difference; i++) {
                blockSpace = i;
                if (layout[i] !== 'null') break;
            }
            if (blockSpace < destination) {
                return false
            }
        }
    } else {
        if (currentSpot > destination) {
            for (let i = currentSpot - increment; i >= destination; i -= increment) {
                blockSpace = i;
                if (layout[i] !== 'null') break;
            }
            if (blockSpace > destination) {
                return false
            }
        } else {
            for (let i = currentSpot + increment; i <= destination; i += increment) {
                blockSpace = i;
                if (layout[i] !== 'null') break;
            }
            if (blockSpace < destination) {
                return false
            }
        }
    }
    return true;
}

// Going to be used for Bishops and Queens
const diagnalMovement = (currentSpot, destination, currentSquareColor, destSquareColor, layout) => {
    const increment = (Math.abs(currentSpot - destination) % 9 === 0) ? 9 : 7;
    // squarecolor checks for bugs
    if (
        (Math.abs(currentSpot - destination) % 9 === 0 || Math.abs(currentSpot - destination) % 7 === 0) &&
        (currentSquareColor === destSquareColor) &&
        checkObstacle(currentSpot, destination, layout, increment)
    ) return true;
    else {
        return false;
    }
}

// Use for Queens and Rooks
const horizontalAndVerticalMovement = (currentSpot, destination, layout) => {
    const increment = Math.abs(currentSpot - destination) % 8 === 0 ? 8 : 1;
    const modulo = increment === 1 ? currentSpot % 8 : 0;
    const difference = increment === 1 ? 8 - modulo : 0;

    if ((Math.abs(currentSpot - destination) % 8 === 0) || (destination >= (currentSpot - modulo) && destination < (currentSpot + difference))) {
        if (checkObstacle(currentSpot, destination, layout, increment, modulo, difference) === false) return false
        return true;
    }
}

const bishopMoveLogic = (currentSpot, destination, currentSquareColor, destSquareColor, layout) => {
    return diagnalMovement(currentSpot, destination, currentSquareColor, destSquareColor, layout)
}

const rookMoveLogic = (currentSpot, destination, layout) => {
    return horizontalAndVerticalMovement(currentSpot, destination, layout)
}

const queenMoveLogic = (currentSpot, destination, currentSquareColor, destSquareColor, layout) => {
    return (
        horizontalAndVerticalMovement(currentSpot, destination, layout) ||
        diagnalMovement(currentSpot, destination, currentSquareColor, destSquareColor, layout));
}

const kingMoveLogic = (currentSpot, destination, layout, opponentColor, destSquareColor, kingId, ifMoved) => {
    
    if(Math.abs(currentSpot - destination) === 2 && (currentSpot === 4 || currentSpot === 60)) {
        const {
            blackKingMove,
            whiteKingMove,
            whiteRook1Move,
            whiteRook2Move,
            blackRook1Move,
            blackRook2Move,
        } = ifMoved;
        // castling
        const rightRookSpot = currentSpot + 3
        const leftRookSpot = currentSpot - 4
        if(
            kingId === 'king-white' && 
            whiteRook2Move === false && 
            whiteKingMove === false &&
            layout[currentSpot + 1] === 'null' &&
            layout[currentSpot + 2] === 'null' &&
            currentSpot + 2 === destination
        )  return true
        else if (
            kingId === 'king-white' &&
            whiteRook1Move === false &&
            whiteKingMove === false &&
            layout[currentSpot - 1] === 'null' &&
            layout[currentSpot - 2] === 'null' &&
            currentSpot - 2 === destination
        ) return true
        else if (
            kingId === 'king-black' &&
            blackRook1Move === false &&
            blackKingMove === false &&
            layout[currentSpot - 1] === 'null' &&
            layout[currentSpot - 2] === 'null' &&
            currentSpot - 2 === destination
        ) return true
        else if (
            kingId === 'king-black' &&
            blackRook2Move === false &&
            blackKingMove === false &&
            layout[currentSpot + 1] === 'null' &&
            layout[currentSpot + 2] === 'null' &&
            currentSpot + 2 === destination
        ) return true
    }
    const colTwo = [1, 9, 17, 25, 33, 41, 49, 57]
    const colSeven = [6, 14, 22, 30, 38, 46, 54, 62]
    const leftSide = [0, 8, 16, 24, 32, 40, 48, 56]
    const rightSide = [7, 15, 23, 31, 39, 47, 55, 63]

    if(isChecked(destination, opponentColor, layout, destSquareColor, kingId)) {
        return false
    }

    if (leftSide.includes(currentSpot) || colTwo.includes(currentSpot)) {
        if (kingId === 'king-white') {
            if (
                layout[destination - 8] === 'king-black' ||
                layout[destination - 7] === 'king-black' ||
                layout[destination + 9] === 'king-black' ||
                layout[destination + 8] === 'king-black' ||
                layout[destination + 1] === 'king-black'
            ) {
                return false;
            }
        } else if (kingId === 'king-black') {
            if (
                layout[destination - 8] === 'king-white' ||
                layout[destination - 7] === 'king-white' ||
                layout[destination + 9] === 'king-white' ||
                layout[destination + 8] === 'king-white' ||
                layout[destination + 1] === 'king-white'
            ) {
                return false;
            }
        }   
    } else if (rightSide.includes(currentSpot) || colSeven.includes(currentSpot)) {
        if (kingId === 'king-white') {
            if (
                layout[destination - 8] === 'king-black' ||
                layout[destination - 9] === 'king-black' ||
                layout[destination - 1] === 'king-black' ||
                layout[destination + 8] === 'king-black' ||
                layout[destination + 7] === 'king-black' 
            ) {
                return false;
            }
        } else if (kingId === 'king-black') {
            if (
                layout[destination - 8] === 'king-white' ||
                layout[destination - 9] === 'king-white' ||
                layout[destination - 1] === 'king-white' ||
                layout[destination + 8] === 'king-white' ||
                layout[destination + 7] === 'king-white' 
            ) {
                return false;
            }
        }   
    } else if (kingId === 'king-white') {
        if (
            layout[destination - 9] === 'king-black' ||
            layout[destination - 8] === 'king-black' ||
            layout[destination - 7] === 'king-black' ||
            layout[destination - 1] === 'king-black' ||
            layout[destination + 9] === 'king-black' ||
            layout[destination + 8] === 'king-black' ||
            layout[destination + 7] === 'king-black' ||
            layout[destination + 1] === 'king-black'
        ) {
            return false;
        }
    } else if (kingId === 'king-black') {
        if (
            layout[destination - 9] === 'king-white' ||
            layout[destination - 8] === 'king-white' ||
            layout[destination - 7] === 'king-white' ||
            layout[destination - 1] === 'king-white' ||
            layout[destination + 9] === 'king-white' ||
            layout[destination + 8] === 'king-white' ||
            layout[destination + 7] === 'king-white' ||
            layout[destination + 1] === 'king-white'
        ) {
            return false;
        }
    }  

    

    if(leftSide.includes(currentSpot)) {
        if (
            currentSpot - 8 === destination ||
            currentSpot - 7 === destination ||
            currentSpot + 8 === destination ||
            currentSpot + 9 === destination ||
            currentSpot + 1 === destination
        ) return true;
        else {
            return false;
        }
    } else if (rightSide.includes(currentSpot)) {
        if (
            currentSpot - 9 === destination ||
            currentSpot - 8 === destination ||
            currentSpot - 1 === destination ||
            currentSpot + 8 === destination ||
            currentSpot + 7 === destination 
        ) return true;
        else {
            return false;
        }
    }

    if (
        currentSpot - 9 === destination ||
        currentSpot - 8 === destination ||
        currentSpot - 7 === destination ||
        currentSpot - 1 === destination ||
        currentSpot + 8 === destination ||
        currentSpot + 9 === destination ||
        currentSpot + 7 === destination ||
        currentSpot + 1 === destination
    ) return true;
    else {
        return false;
    }
}

export {
    pawnMoveLogic,
    knightMoveLogic,
    bishopMoveLogic,
    rookMoveLogic,
    queenMoveLogic,
    kingMoveLogic
}