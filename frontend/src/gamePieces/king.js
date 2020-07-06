import GamePiece from './gamePiece';

class King extends GamePiece {
    constructor(player) {
        super(player, 'King')
        this.checked = false
    }

    //TODO Create a check method for other pieces

    canItMove(currentSpot, destination) {
        if(this.checked) return false;

        return (
            currentSpot - 9 === destination ||
            currentSpot - 8 === destination ||
            currentSpot - 7 === destination ||
            currentSpot - 1 === destination ||
            currentSpot + 1 === destination ||
            currentSpot + 7 === destination ||
            currentSpot + 8 === destination ||
            currentSpot + 9 === destination
        );
    }

    pathFromCurrentSpotToDestination() {
        return [];
    }
}