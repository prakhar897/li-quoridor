import React from "react";
import Board from "../components/Board";
const Game = () => {
	return (
		<div className="grid grid-cols-10 h-screen">
			<div className="col-span-1 bg-gray-200">
				{" "}
				{/* 10% width */}
				<div className="h-full flex items-center justify-center">
					{/* Content for navigation bar */}
					<p>Navigation Bar</p>
				</div>
			</div>
			<div className="col-span-6 bg-gray-400">
				<Board />
			</div>
			<div className="col-span-2 bg-gray-300">
				{" "}
				{/* 20% width */}
				<div className="h-full flex items-center justify-center">
					{/* Content for the board sidebar */}
					<p>Board Sidebar</p>
				</div>
			</div>
			<div className="col-span-1 bg-gray-100">
				{" "}
				{/* 10% width */}
				<div className="h-full flex items-center justify-center">
					{/* Content for Google Ads */}
					<p>Google Ads</p>
				</div>
			</div>
		</div>
	);
};

export default Game;
