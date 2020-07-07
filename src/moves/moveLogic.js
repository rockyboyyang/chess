const pawnMoveLogic = (currentSpot, destination, turn) => {
    // ONLY FIRST MOVE
    // STILL NEED TO WRITE CODE ON HOW TO MOVE AFTER PAWN HAS ALREADY MOVED
    // AND ALSO HOW TO TAKE A PIECE THROUGH DIAGNOL

    if (turn === 'white') {
        if (currentSpot - destination === 8 || currentSpot - destination === 16) return true;
        else {
            console.log('INVALID MOVE')
            return false;
        }
    } else {
        if (currentSpot + 8 === destination || currentSpot + 16 === destination) return true;
        else {
            console.log('INVALID MOVE')
            return false;
        }
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

// Going to be used for Bishops and Queens
const diagnalMovement = (currentSpot, destination, currentSquareColor, destSquareColor) => {
    // squarecolor checks for bugs
    if ((Math.abs(currentSpot - destination) % 9 === 0 || Math.abs(currentSpot - destination) % 7 === 0) && currentSquareColor === destSquareColor) return true;
    else {
        console.log('INVALID MOVE')
        return false;
    }
}

// Use for Queens and Rooks
const horizontalAndVerticalMovement = (currentSpot, destination, layout) => {

    function checkVerticalObstacle() {
        let blockSpace = 0;
        // checks if there are pieces in the way for vertical and horizontal
        if (currentSpot > destination) {
            for(let i = currentSpot - 8; i >= destination; i -= 8) {
                blockSpace = i;
                if(layout[i]) break;
            }
            if (blockSpace > destination) return false;
        } else {
            for (let i = currentSpot + 8; i <= destination; i += 8) {
                blockSpace = i;
                if (layout[i]) break;
            }
            if (blockSpace < destination) return false;
        }
        return true
    }
    
    let modulo = currentSpot % 8;
    let difference = 8 - modulo;
    
    // checks if there are pieces in the way for Horizontal Obstacle
    function checkHorizontalObstacle() {
        let blockSpace;
        if (currentSpot > destination) {
            for(let i = currentSpot - 1; i >= currentSpot - modulo; i--) {
                blockSpace = i;
                if(layout[i]) break;
            }
            if(blockSpace > destination) return false;

        } else {
            for(let i = currentSpot + 1; i < currentSpot + difference; i++) {
                blockSpace = i;
                if(layout[i]) break;
            }
            if(blockSpace < destination) return false;
        }
        console.log('hey')
        return true
    }

    if (
        // for vertical
        (Math.abs(currentSpot - destination) % 8 === 0 && checkVerticalObstacle()) || 
        // for horizontal
        ((destination >= (currentSpot - modulo) && destination < (currentSpot + difference)) && checkHorizontalObstacle())
    ) return true;
    else {
        console.log('INVALID MOVE')
        return false;
    }
}

const bishopMoveLogic = (currentSpot, destination, currentSquareColor, destSquareColor) => {
    return diagnalMovement(currentSpot, destination, currentSquareColor, destSquareColor)
}

const rookMoveLogic = (currentSpot, destination, layout) => {
    return horizontalAndVerticalMovement(currentSpot, destination, layout)
}

const queenMoveLogic = (currentSpot, destination, currentSquareColor, destSquareColor, layout) => {
    return (
    horizontalAndVerticalMovement(currentSpot, destination, layout) || 
    diagnalMovement(currentSpot, destination, currentSquareColor, destSquareColor));
}

const kingMoveLogic = (currentSpot, destination) => {
    if(
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