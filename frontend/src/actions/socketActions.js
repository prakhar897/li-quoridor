export const socketConnected = () => ({
	type: "SOCKET_CONNECTED",
});

export const socketDisconnected = () => {
	return {
		type: "SOCKET_DISCONNECTED",
	};
};

export const joinQueue = () => {
	return {
		type: "JOIN_QUEUE",
	};
};

export const receiveMessage = (message) => ({
	type: "SOCKET_MESSAGE_RECEIVED",
	payload: message,
});

export const sendGameMove = (move) => ({
	type: "SEND_GAME_MOVE",
	payload: move,
});

export const updateMatchState = (match) => ({
	type: "UPDATE_MATCH_STATE",
	payload: { match: match },
});

export const UPDATE_MOVE = (move) => ({
	type: "UPDATE_MOVE",
	payload: { move: move },
});
