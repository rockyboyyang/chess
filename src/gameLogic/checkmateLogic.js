import { isChecked } from './checkLogic';
import { kingMoveLogic } from '../gameLogic/moveLogic'

const isCheckmate = (kingSpot, destination, layout, destSquareColor, kingId, color, kingSquare) => {
    if(!kingMoveLogic(kingSpot, destination, layout, color, destSquareColor, kingId))
    if (isChecked(kingSpot, color, layout, kingSquare, kingId)) {
        return true;
    } 
}