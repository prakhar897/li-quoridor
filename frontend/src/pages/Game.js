import React from "react";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
const Game = () => {
	return (
		<div className="grid grid-cols-10 h-screen">
			<div className="col-span-1 bg-gray-200">
				<div className="h-full flex items-center justify-center">
					{/* Content for navigation bar */}
					<p>Navigation Bar</p>
				</div>
			</div>
			<div className="col-span-6 bg-gray-400">
				<Board />
			</div>
			<div className="col-span-3 bg-gray-300">
				<Sidebar />
			</div>
		</div>
	);
};

export default Game;
