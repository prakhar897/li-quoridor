import io from "socket.io-client";

const socket = io("http://localhost:4000");

export const joinQueue = () => {
	socket.emit("joinQueue");
	return { type: "JOIN_QUEUE" };
};
