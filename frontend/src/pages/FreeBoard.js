import React from "react";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";

import { connect } from "react-redux";

import {
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
} from "../actions/BoardAction";

import Navbar from "../components/Navbar";

const FreeBoard = ({
	game,
	board,
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
}) => {
	const getWallCount = (id) => {
		for (let pawnKey in board.pawns) {
			let pawn = board.pawns[pawnKey];

			if (pawn.id === id) {
				return pawn.wallCount;
			}
		}
	};

	return (
		<div className="grid grid-cols-10 h-screen">
			<div className="col-span-1 bg-gray-600">
				<div className="h-full flex items-center justify-center">
					<Navbar />
				</div>
			</div>

			<div className="col-span-6 bg-lime-50 h-screen w-full flex flex-col justify-center items-center">
				<div>
					<Board
						handleGapClick={handleGapClick}
						handleMouseEnteringGap={handleMouseEnteringGap}
						handleMouseLeavingGap={handleMouseLeavingGap}
					/>
				</div>

				<div className="flex items-center space-x-6 mt-4 text-xl border-b border-stone-800">
					<div className="font-bold text-stone-800 ">
						WHITE:{"  "}
						<span className="text-3xl">{getWallCount(0)} </span>
					</div>
					<div className="font-bold text-stone-800">
						BLACK:{"  "}
						<span className="text-3xl">{getWallCount(1)} </span>
					</div>
				</div>
			</div>
			<div className="col-span-3 bg-gray-600 h-screen">
				<Sidebar />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	game: state.game,
	board: state.board,
});

const mapDispatchToProps = {
	handleGapClick: handleGapClick,
	handleMouseEnteringGap: handleMouseEnteringGap,
	handleMouseLeavingGap: handleMouseLeavingGap,
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeBoard);
