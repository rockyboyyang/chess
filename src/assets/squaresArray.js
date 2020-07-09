export default function readyUpChessBoard() {
    const squares = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        squares[i] ='pawn-black';
        squares[i + 40] = 'pawn-white';
    }
    squares[0] = 'rook-black'
    squares[7] = 'rook-black';
    squares[56] = 'rook-white';
    squares[63] = 'rook-white';

    squares[1] = 'knight-black';
    squares[6] = 'knight-black';
    squares[57] = 'knight-white';
    squares[62] = 'knight-white';

    squares[2] = 'bishop-black';
    squares[5] = 'bishop-black';
    squares[58] = 'bishop-white';
    squares[61] = 'bishop-white';

    squares[3] = 'queen-black';
    squares[4] = 'king-black';

    squares[59] = 'queen-white';
    squares[60] = 'king-white';

    return squares;
}
