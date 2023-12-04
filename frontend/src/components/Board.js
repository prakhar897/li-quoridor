import React from "react";
import { connect } from "react-redux";
import { typeOfCell } from "../helpers/BoardHelpers";
import CONSTANTS from "../constants";

import Pawn from "./Pawn";
import Wall from "./Wall";

const BOARD_SIZE = CONSTANTS.BOARD_SIZE;

const BG_GAP_COLOR = "bg-stone-400";
const BG_TILE_COLOR = "bg-stone-800";

const Board = ({ cells }) => {
	const renderCellContent = (rowIndex, colIndex, cell) => {
		switch (typeOfCell(rowIndex, colIndex)) {
			case "TILE":
				if (cell === 2) {
					return (
						<Pawn
							rowIndex={rowIndex}
							colIndex={colIndex}
							isShadow={false}
						/>
					);
				} else if (cell === 1) {
					return (
						<Pawn
							rowIndex={rowIndex}
							colIndex={colIndex}
							isShadow={true}
						/>
					);
				}
				break;
			case "RECTANGLE_GAP":
				if (cell === 2) {
					return <Wall isShadow={false} />;
				} else if (cell === 1) {
					return <Wall isShadow={true} />;
				}

				break;
			case "SQUARE_GAP":
				if (cell === 2) {
					return <Wall isShadow={false} />;
				} else if (cell === 1) {
					return <Wall isShadow={true} />;
				}
				break;
			default:
				break;
		}
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

	const renderRectangularGaps = (rowIndex, colIndex, cell) => {
		return (
			<div
				key={colIndex}
				className={` ${BG_GAP_COLOR} ${
					rowIndex % 2 === 1 ? "h-2" : "h-10"
				} ${colIndex % 2 === 1 ? "w-2" : "w-10"} `}
			>
				{renderCellContent(rowIndex, colIndex, cell)}
			</div>
		);
	};

	const renderSquareGaps = (rowIndex, colIndex, cell) => {
		return (
			<div key={colIndex} className={` ${BG_GAP_COLOR} w-2 h-2`}>
				{renderCellContent(rowIndex, colIndex, cell)}
			</div>
		);
	};

	const renderVerticalLabels = (rowIndex) => {
		const labels = "1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20"
			.split("")
			.slice(0, BOARD_SIZE);

		return (
			<div
				className={` ${BG_GAP_COLOR} w-10 ${
					rowIndex % 2 === 1 ? "h-2" : "h-10"
				} flex justify-center items-center`}
			>
				{rowIndex % 2 === 0 && labels[rowIndex]}
			</div>
		);
	};

	const renderHorizontalLabels = () => {
		const labels = "a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z"
			.split("")
			.slice(0, BOARD_SIZE);
		return (
			<div className="flex">
				<div className="w-10 h-10"></div>
				{cells[0].map((cell, colIndex) => (
					<div
						key={colIndex}
						className={` ${BG_GAP_COLOR} h-10 ${
							colIndex % 2 === 1 ? "w-2" : "w-10"
						} flex justify-center items-center`}
					>
						{colIndex % 2 === 0 && labels[colIndex]}
					</div>
				))}
			</div>
		);
	};

	const renderBoard = () => {
		return (
			<div className="flex justify-center items-center h-screen">
				<div
					className={`pl-2.5 pb-2.5 pt-5 pr-5  ${BG_GAP_COLOR} rounded-[30px]`}
				>
					{cells.map((row, rowIndex) => (
						<div key={rowIndex} className="flex">
							{renderVerticalLabels(rowIndex)}
							{row.map((cellValue, colIndex) => {
								if (rowIndex % 2 === 0 && colIndex % 2 === 0) {
									return renderTiles(
										rowIndex,
										colIndex,
										cellValue
									);
								} else if (
									rowIndex % 2 === 1 &&
									colIndex % 2 === 1
								) {
									return renderSquareGaps(
										rowIndex,
										colIndex,
										cellValue
									);
								} else {
									return renderRectangularGaps(
										rowIndex,
										colIndex,
										cellValue
									);
								}
							})}
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
	cells: state.board.cells,
});

export default connect(mapStateToProps, null)(Board);
