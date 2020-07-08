import { isChecked } from './checkLogic';

const pawnMoveLogic = (currentSpot, destination, turn, layout) => {

    const whiteArr = [48, 49, 50, 51, 52, 53, 54, 55]
    const blackArr = [8, 9, 10, 11, 12, 13, 14, 15]

    if (turn === 'white') {
        if (whiteArr.includes(currentSpot)) {
            if ((currentSpot - destination === 8 || currentSpot - destination === 16) && layout[currentSpot - 8] === null && layout[destination] === null) return true;
        } else {
            if (currentSpot - destination === 8 && layout[currentSpot - 8] === null) return true;
        }
        if (layout[destination] && destination === currentSpot - 7) return true
        if (layout[destination] && destination === currentSpot - 9) return true
        console.log('INVALID MOVE')
        return false;
    } else {
        if (blackArr.includes(currentSpot)) {
            if ((currentSpot + 8 === destination || currentSpot + 16 === destination) && layout[currentSpot + 8] === null && layout[destination] === null) return true;
        } else {
            if (currentSpot + 8 === destination && layout[currentSpot + 8] === null) return true;
        }
        if (layout[destination] && destination === currentSpot + 7) return true
        if (layout[destination] && destination === currentSpot + 9) return true
        console.log('INVALID MOVE')
        return false;
    }
}

const knightMoveLogic = (currentSpot, destination) => {
    if (
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
        console.log('INVALID MOVE')
        return false;
    }
}

function checkObstacle(currentSpot, destination, layout, increment, modulo, difference) {
    // increment will either be 7 or 9 depending on the destination of diagnal movement
    // increment wlll be 8 on vertical movement
    console.log(increment)
    console.log(modulo, difference)

    let blockSpace;
    // blockspace will represent the first space that has a piece on it
    if (modulo && difference) {
        if (currentSpot > destination) {
            for (let i = currentSpot - increment; i >= currentSpot - modulo; i--) {
                blockSpace = i;
                if (layout[i]) break;
            }
            if (blockSpace > destination) return false;

        } else {
            for (let i = currentSpot + increment; i < currentSpot + difference; i++) {
                blockSpace = i;
                if (layout[i]) break;
            }
            if (blockSpace < destination) return false;
        }
    } else {
        if (currentSpot > destination) {
            for (let i = currentSpot - increment; i >= destination; i -= increment) {
                blockSpace = i;
                if (layout[i]) break;
            }
            if (blockSpace > destination) return false
        } else {
            for (let i = currentSpot + increment; i <= destination; i += increment) {
                blockSpace = i;
                if (layout[i]) break;
            }
            if (blockSpace < destination) return false
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
        console.log('INVALID MOVE')
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

const kingMoveLogic = (currentSpot, destination, layout, opponentColor, destSquareColor, kingId) => {
    // console.log(opponentColor)
    // console.log(isChecked(destination, opponentColor, layout, destSquareColor))
    // console.log(destSquareColor)
    if(isChecked(destination, opponentColor, layout, destSquareColor, kingId)) {
        console.log('INVALID MOVE: YOU WILL BE IN CHECK')
        return false
    }

    if(kingId === 'king-white') {
        if(
            layout[destination - 9] === 'king-black' ||
            layout[destination - 8] === 'king-black'||
            layout[destination - 7] === 'king-black'||
            layout[destination - 1] === 'king-black'||
            layout[destination + 9] === 'king-black'||
            layout[destination + 8] === 'king-black'||
            layout[destination + 7] === 'king-black'||
            layout[destination + 1] === 'king-black'
        ) {
            console.log('INVALID MOVE: KING CANNOT BE ADJACENT TO ANOTHER KING')
            return false;
        }
    } else if (kingId === 'king-black') {
        if(
            layout[destination - 9] === 'king-white' ||
            layout[destination - 8] === 'king-white' ||
            layout[destination - 7] === 'king-white' ||
            layout[destination - 1] === 'king-white' ||
            layout[destination + 9] === 'king-white' ||
            layout[destination + 8] === 'king-white' ||
            layout[destination + 7] === 'king-white' ||
            layout[destination + 1] === 'king-white'
        ) {
            console.log('INVALID MOVE: KING CANNOT BE ADJACENT TO ANOTHER KING')
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
        console.log('INVALID MOVE')
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