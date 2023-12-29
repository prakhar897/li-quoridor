// socketMiddleware.js
import io from "socket.io-client";
import { receiveMessage } from "../actions/socketActions";

let socket = null;

const socketMiddleware = () => {
	return (store) => (next) => (action) => {
		switch (action.type) {
			case "SOCKET_CONNECT":
				if (!socket) {
					socket = io("http://your-socket-server-url");

					socket.on("message", (message) => {
						store.dispatch(receiveMessage(message));
					});
				}
				break;

			case "SOCKET_DISCONNECT":
				if (socket) {
					socket.disconnect();
					socket = null;
				}
				break;

			case "SEND_GAME_MOVE":
				if (socket) {
					socket.emit("game_move", action.payload);
				}
				break;

			default:
				return next(action);
		}
	};
};

export default socketMiddleware;
