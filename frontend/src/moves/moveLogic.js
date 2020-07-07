const pawnMoveLogic = (currentSpot, destination, turn) => {
    // ONLY FIRST MOVE
    // STILL NEED TO WRITE CODE ON HOW TO MOVE AFTER PAWN HAS ALREADY MOVED
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


const bishopMoveLogic = (currentSpot, destination) => {
    if (Math.abs(currentSpot - destination) % 9 === 0 || Math.abs(currentSpot - destination) % 7 === 0) return true;
    else {
        console.log('INVALID MOVE') 
        return;
    }
}

const rookMoveLogic = (currentSpot, destination) => {
    let modulo = currentSpot % 8;
    let difference = 8 - modulo;
    if (
        // for vertical
        Math.abs(currentSpot - destination) % 8 === 0 || 
        // for horizontal
        (destination >= (currentSpot - modulo) && destination < (currentSpot + difference))
    ) return true;
    else {
        console.log('INVALID MOVE')
        return;
    }
}

export {
    pawnMoveLogic,
    knightMoveLogic,
    bishopMoveLogic,
    rookMoveLogic,
}