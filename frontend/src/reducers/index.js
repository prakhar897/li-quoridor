import { combineReducers } from "redux";
import  from "./gameReducer";

const rootReducer = combineReducers({
    game: gameReducer,
    player: playerReducer
});

export default rootReducer;