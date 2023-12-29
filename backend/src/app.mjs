import express from "express";
import http from "http";
import { Server } from "socket.io";
import apiRoutes from "./routes/api.mjs";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"], // Add the methods you're using
	},
});

app.use("/api", apiRoutes);

let playerQueue = [];

io.on("connection", (socket) => {
	console.log("New player connected:", socket.id);

	socket.on("joinQueue", () => {
		playerQueue.push(socket);
		if (playerQueue.length === 2) {
			const players = [playerQueue[0], playerQueue[1]];
			playerQueue = [];
			io.to(players[0].id).emit("startGame", { color: "white" });
			io.to(players[1].id).emit("startGame", { color: "black" });
		}
	});

	socket.on("move", (data) => {
		socket.broadcast.emit("move", data);
	});

	socket.on("disconnect", () => {
		playerQueue = playerQueue.filter((player) => player !== socket);
		console.log(" player Disconnected:", socket.id);
	});

	// Handle socket events
	socket.on("chat message", (msg) => {
		console.log("message: " + msg);
		// Broadcast the message to all connected clients
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
