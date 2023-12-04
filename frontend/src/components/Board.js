import React from "react";
import { connect } from "react-redux";
import { typeOfCell } from "../helpers/BoardHelpers";
import CONSTANTS from "../constants";

import Pawn from "./Pawn";
import Wall from "./Wall";

import {
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
} from "../actions/BoardAction";

const BOARD_SIZE = CONSTANTS.BOARD_SIZE;

const BG_GAP_COLOR = "bg-stone-400";
const BG_TILE_COLOR = "bg-stone-800";

const Board = ({
	pawns,
	walls,
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
}) => {
	const renderCellContent = (rowIndex, colIndex) => {
		const pieceKey = rowIndex + "," + colIndex;

		if (pawns[pieceKey]) {
			return <Pawn {...pawns[pieceKey]} />;
		} else if (walls[pieceKey]) {
			return <Wall {...walls[pieceKey]} />;
		}
		return null;
	};

	const renderTiles = (rowIndex, colIndex, cell) => {
		return (
			<div
				key={colIndex}
				className={` ${BG_TILE_COLOR} w-10 h-10 opacity-30`}
			>
				{renderCellContent(rowIndex, colIndex, cell)}
			</div>
		);
	};

	const renderRectangularGaps = (rowIndex, colIndex) => {
		return (
			<div
				key={colIndex}
				className={` ${BG_GAP_COLOR} ${
					rowIndex % 2 === 1 ? "h-2" : "h-10"
				} ${colIndex % 2 === 1 ? "w-2" : "w-10"} `}
				onClick={() => handleGapClick(rowIndex, colIndex)}
				onMouseEnter={() => handleMouseEnteringGap(rowIndex, colIndex)}
				onMouseLeave={() => handleMouseLeavingGap(rowIndex, colIndex)}
			>
				{renderCellContent(rowIndex, colIndex)}
			</div>
		);
	};

	const renderSquareGaps = (rowIndex, colIndex) => {
		return (
			<div
				key={colIndex}
				className={` ${BG_GAP_COLOR} w-2 h-2`}
				onClick={() => handleGapClick(rowIndex, colIndex)}
				onMouseEnter={() => handleMouseEnteringGap(rowIndex, colIndex)}
				onMouseLeave={() => handleMouseLeavingGap(rowIndex, colIndex)}
			>
				{renderCellContent(rowIndex, colIndex)}
			</div>
		);
	};

	const renderVerticalLabels = (rowIndex) => {
		const labels =
			"1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20".split("");
		const labelToShow = rowIndex % 2 === 0 ? labels[rowIndex] : null;

		return (
			<div
				className={` ${BG_GAP_COLOR} w-10 ${
					rowIndex % 2 === 1 ? "h-2" : "h-10"
				} flex justify-center items-center`}
			>
				{labelToShow}
			</div>
		);
	};

	const renderHorizontalLabels = () => {
		const labels =
			"a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z".split("");

		return (
			<div className="flex">
				<div className="w-10 h-10"></div>
				{Array.from({ length: BOARD_SIZE }).map((_, colIndex) => {
					const labelToShow =
						colIndex % 2 === 0 ? labels[colIndex] : null;

					return (
						<div
							key={colIndex}
							className={` ${BG_GAP_COLOR} h-10 ${
								colIndex % 2 === 1 ? "w-2" : "w-10"
							} flex justify-center items-center`}
						>
							{labelToShow}
						</div>
					);
				})}
			</div>
		);
	};

	const renderBoard = () => {
		return (
			<div className="flex justify-center items-center h-screen">
				<div
					className={`pl-2.5 pb-2.5 pt-5 pr-5 ${BG_GAP_COLOR} rounded-[30px]`}
				>
					{Array.from({ length: BOARD_SIZE }).map((_, rowIndex) => (
						<div key={rowIndex} className="flex">
							{renderVerticalLabels(rowIndex)}
							{Array.from({ length: BOARD_SIZE }).map(
								(_, colIndex) => {
									if (
										typeOfCell(rowIndex, colIndex) ===
										"TILE"
									) {
										return renderTiles(rowIndex, colIndex);
									} else if (
										typeOfCell(rowIndex, colIndex) ===
										"SQUARE_GAP"
									) {
										return renderSquareGaps(
											rowIndex,
											colIndex
										);
									} else {
										return renderRectangularGaps(
											rowIndex,
											colIndex
										);
									}
								}
							)}
						</div>
					))}
					{renderHorizontalLabels()}
				</div>
			</div>
		);
	};

	return <>{renderBoard()}</>;
};

const mapStateToProps = (state) => ({
	pawns: state.board.pawns,
	walls: state.board.walls,
});

const mapDispatchToProps = {
	handleGapClick: handleGapClick,
	handleMouseEnteringGap: handleMouseEnteringGap,
	handleMouseLeavingGap: handleMouseLeavingGap,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
