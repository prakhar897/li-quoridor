import React from "react";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import ProfileBox from "../components/ProfileBox";

import { connect } from "react-redux";

import Navbar from "../components/Navbar";
const FreeBoard = ({ game, board }) => {
	const getWallCount = (id) => {
		for (let pawnKey in board.pawns) {
			let pawn = board.pawns[pawnKey];

			if (pawn.id === id) {
				return pawn.wallCount;
			}
		}
	};

	const getUsername = (id) => {
		return game.pawnPlayerMap[id];
	};

	return (
		<div className="grid grid-cols-10 h-screen">
			<div className="col-span-1 bg-gray-600">
				<div className="h-full flex items-center justify-center">
					<Navbar />
				</div>
			</div>

			<div className="col-span-6 bg-gray-400 h-screen w-full">
				<div className="grid grid-rows-10 w-full h-screen bg-gray-400">
					<div className="row-span-1">
						<ProfileBox
							wallcount={getWallCount(1)}
							username={getUsername(1)}
						/>
					</div>

					<div className="row-span-8">
						<Board />
					</div>

					<div className="row-span-1 align-bottom">
						<ProfileBox
							wallcount={getWallCount(0)}
							username={getUsername(0)}
						/>
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

export default connect(mapStateToProps, null)(FreeBoard);
