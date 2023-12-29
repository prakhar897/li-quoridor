export const socketConnected = () => ({
	type: "SOCKET_CONNECTED",
});

export const socketDisconnected = () => ({
	type: "SOCKET_DISCONNECTED",
});

export const receiveMessage = (message) => ({
	type: "SOCKET_MESSAGE_RECEIVED",
	payload: message,
});

export const sendGameMove = (move) => ({
	type: "SEND_GAME_MOVE",
	payload: move,
});
