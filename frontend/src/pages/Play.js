import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import PlaySideBar from "../components/PlaySidebar";
import ProfileBox from "../components/ProfileBox";

import { socketConnected, socketDisconnected } from "../actions/socketActions";

import {
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
} from "../actions/BoardAction";

import { connect } from "react-redux";

import Navbar from "../components/Navbar";

const Play = ({
	game,
	board,
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
}) => {
	useEffect(() => {
		socketConnected();

		return () => {
			socketDisconnected();
		};
	}, [socketConnected, socketDisconnected]);

	const [inGame, setInGame] = useState(false);

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

			<div className="col-span-6 bg-gray-400 h-screen w-full">
				<div className="grid grid-rows-10 w-full h-screen bg-gray-400">
					<div className="row-span-1">
						<ProfileBox
							wallcount={getWallCount(1)}
							username={game.black.username}
						/>
					</div>

					<div className="row-span-8">
						<Board
							handleGapClick={handleGapClick}
							handleMouseEnteringGap={handleMouseEnteringGap}
							handleMouseLeavingGap={handleMouseLeavingGap}
						/>
					</div>

					<div className="row-span-1 align-bottom">
						<ProfileBox
							wallcount={getWallCount(0)}
							username={game.black.username}
						/>
					</div>
				</div>
			</div>
			<div className="col-span-3 bg-gray-600 h-screen">
				{inGame && <Sidebar />}
				{!inGame && <PlaySideBar />}
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
	socketConnected: socketConnected,
	socketDisconnected: socketDisconnected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
