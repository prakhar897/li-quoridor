import { combineReducers } from "redux";
import boardReducer from "./BoardReducer";
import sidebarReducer from "./SidebarReducer";

const rootReducer = combineReducers({
	board: boardReducer,
	sidebar: sidebarReducer,
});

export default rootReducer;
