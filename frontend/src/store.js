import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import SocketMiddleware from "./middlewares/SocketMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(SocketMiddleware()))
);

export default store;
