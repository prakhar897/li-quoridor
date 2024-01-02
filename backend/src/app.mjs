import express from "express";
import http from "http";
import { Server } from "socket.io";
import apiRoutes from "./routes/api.mjs";
import { v4 as uuidv4 } from "uuid";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

app.use("/api", apiRoutes);

let playerQueue = [];

let currentMatches = {};

io.on("connection", (socket) => {
	console.log("New player connected:", socket.id);

	socket.on("joinQueue", () => {
		playerQueue.push(socket);
		console.log(playerQueue.length);

		// TODO: >2 logic
		if (playerQueue.length === 2) {
			let players = [playerQueue[0], playerQueue[1]];
			if (Math.floor(Math.random() * 100) > 50) {
				players = [playerQueue[1], playerQueue[0]];
			}

			const matchId = uuidv4();
			const random = Math.floor(Math.random() * 100);
			currentMatches[matchId] = {
				white: {
					id: random > 50 ? players[0].id : players[1].id,
					rating: 1500,
					winner: null,
				},
				black: {
					id: random > 50 ? players[1].id : players[0].id,
					rating: 1500,
					winner: null,
				},
				moves: [],
				type: "normal",
				start_time: Date.now(),
				end_time: Date.now() + 30000,
				last_activity: Date.now(),
				id: matchId,
			};

			io.to(players[0].id).emit("matchState", {
				match: currentMatches[matchId],
			});
			io.to(players[1].id).emit("matchState", {
				match: currentMatches[matchId],
			});
		}

		console.log(currentMatches);
	});

	socket.on("move", (data) => {
		const match = currentMatches[data.match.id];
		const turn = match.moves.length % 2 === 0 ? "white" : "black";

		if (data.move.by === match[turn].id) {
			match.moves.push(data.move);
		}

		io.to(players[0].id).emit("matchState", {
			match: currentMatches[matchId],
		});
		io.to(players[1].id).emit("matchState", {
			match: currentMatches[matchId],
		});
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
