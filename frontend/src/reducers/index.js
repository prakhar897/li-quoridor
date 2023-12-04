import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";

const rootReducer = combineReducers({
	board: boardReducer,
});

export default rootReducer;
