import React from "react";
import { connect } from "react-redux";
import { COLOR_CONSTANTS } from "../constants";
import { resetBoard } from "../actions/SidebarAction";
import { handleGapClick, handlePawnShadowClick } from "../actions/BoardAction";
import { convertNotationToMove } from "../helpers/SidebarHelpers";

const MoveList = ({
	moves,
	resetBoard,
	handleGapClick,
	handlePawnShadowClick,
}) => {
	const jumpToMove = (moveIndex) => {
		const newMoves = moves.splice(0, moveIndex + 1);
		resetBoard();
		for (let moveNotation of newMoves) {
			console.log(moveNotation);
			let move = convertNotationToMove(moveNotation);
			console.log(move);
			if (move.type === "PAWN") {
				handleGapClick(move.payload.rowIndex, move.payload.colIndex);
			} else {
				handlePawnShadowClick(
					move.payload.rowIndex,
					move.payload.colIndex
				);
			}
		}
	};

	const renderMoveItem = (move, index) => {
		const nextMove = moves[index + 1] || "";
		const bg_color =
			COLOR_CONSTANTS.MOVE_LIST_BG[Math.floor(index / 2) % 2];

		return (
			<div
				key={index}
				className={`flex justify-between p-1 border ${bg_color}`}
			>
				<span className="w-1/2 text-center ">{index / 2 + 1}.</span>
				<div className="w-1/2 text-center">
					<span
						className="cursor-pointer "
						onClick={() => jumpToMove(index)}
					>
						{move}
					</span>
				</div>
				<div className="w-1/2 text-center">
					<span
						className="cursor-pointer "
						onClick={() => jumpToMove(index + 1)}
					>
						{nextMove}
					</span>
				</div>
			</div>
		);
	};

	if (moves.length === 0) {
		return (
			<div id="move-list-component" className="overflow-auto max-h-96">
				<div className={`flex flex-col justify-end`}>
					{renderMoveItem("", 0)}
				</div>
			</div>
		);
	}

	return (
		<div id="move-list-component" className="overflow-auto max-h-96">
			<div className={`flex flex-col justify-end`}>
				{moves.map((move, index) => {
					if (index % 2 === 0) {
						return renderMoveItem(move, index);
					}
					return null;
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	moves: state.board.moves,
});

const mapDispatchToProps = {
	resetBoard: resetBoard,
	handleGapClick: handleGapClick,
	handlePawnShadowClick: handlePawnShadowClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveList);
