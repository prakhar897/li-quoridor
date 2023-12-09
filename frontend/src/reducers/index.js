import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import sidebarReducer from "./SidebarReducer";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
	board: boardReducer,
	sidebar: sidebarReducer,
	game: gameReducer,
});

export default rootReducer;
