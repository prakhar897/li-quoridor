// socketMiddleware.js
import io from "socket.io-client";
import { receiveMessage, updateMatchState } from "../actions/socketActions";

let socket = null;

const socketMiddleware = () => {
	return (store) => (next) => (action) => {
		switch (action.type) {
			case "SOCKET_CONNECTED":
				if (!socket) {
					socket = io("http://localhost:4000");
					console.log(socket);

					socket.on("matchState", (match) => {
						console.log(match);
						store.dispatch(updateMatchState(match));
					});

					socket.on("message", (message) => {
						store.dispatch(receiveMessage(message));
					});
				}
				break;

			case "SOCKET_DISCONNECTED":
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

			case "JOIN_QUEUE":
				if (socket) {
					socket.emit("joinQueue", "A player has joined the queue");
				}
				break;

			default:
				return next(action);
		}
	};
};

export default socketMiddleware;
