import GamePiece from './gamePiece';

class Rook extends GamePiece {
    constructor(player) {
        super(player, 'Rook')
    }

    canItMove(currentSpot, destination) {
        const modValue = currentSpot % 8;
        const diff = 8 - modValue;

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