import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { COLOR_CONSTANTS } from "../constants";
import { resetBoard } from "../actions/SidebarAction";
import { handleGapClick, bulkUpdateState } from "../actions/BoardAction";

const MoveList = ({ moves, resetBoard, bulkUpdateState, currentMoveNo }) => {
	const messagesEndRef = useRef(null);

	const handleKeyDown = (event) => {
		if (event.keyCode === 37) {
			// Left arrow key
			resetBoard();
			bulkUpdateState(moves, currentMoveNo - 1);
		} else if (event.keyCode === 39) {
			// Right arrow key
			if (moves.length - 1 !== currentMoveNo) {
				resetBoard();
				bulkUpdateState(moves, currentMoveNo + 1);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [moves]);
	const jumpToMove = (moveIndex) => {
		resetBoard();

		bulkUpdateState(moves, moveIndex + 1);
	};

	const renderMoveItem = (move, index, currentMoveNo) => {
		const nextMove = moves[index + 1] || "";
		const bg_color =
			COLOR_CONSTANTS.MOVE_LIST_BG[Math.floor(index / 2) % 2];
		const current_move_bg = currentMoveNo - 1 === index ? "bg-red-500" : "";
		const current_move_bg2 =
			currentMoveNo - 1 === index + 1 ? "bg-red-500" : "";

		return (
			<div
				key={index}
				className={`flex justify-between p-1 border ${bg_color}`}
				ref={index === moves.length - 3 ? messagesEndRef : null}
			>
				<span className="w-1/2 text-center ">{index / 2 + 1}.</span>
				<div className={`w-1/2 text-center ${current_move_bg}`}>
					<span
						className={`cursor-pointer `}
						onClick={() => jumpToMove(index)}
					>
						{move}
					</span>
				</div>
				<div className={`w-1/2 text-center ${current_move_bg2}`}>
					<span
						className={`cursor-pointer`}
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
						return renderMoveItem(move, index, currentMoveNo);
					}
					return null;
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	moves: state.board.moves,
	currentMoveNo: state.board.currentMoveNo,
});

const mapDispatchToProps = {
	resetBoard: resetBoard,
	handleGapClick: handleGapClick,
	bulkUpdateState: bulkUpdateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveList);
