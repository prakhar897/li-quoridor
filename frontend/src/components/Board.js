import React, { useState } from "react";
import Pawn from "./Pawn";
import Wall from "./Wall";
import PawnShadow from "./PawnShadow";
import log from "../logger";
import WallShadow from "./WallShadow";

const BOARD_SIZE = 17;

const BG_GAP_COLOR = "bg-stone-400";
const BG_TILE_COLOR = "bg-stone-800";

const Board = () => {
	/*
		Board array has the following data: 
		 if its a tile: 0 = empty, 1: shadow-pawn, 2: your-pawn, 3: opposite-pawn
		 if its a gap: 0 = empty, 1: shadow-wall, 2: your-wall, 3: opposite-wall
	*/
	const [board, setBoard] = useState(() => {
		// Initialize the board with 0s for empty spaces
		const initialBoard = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			initialBoard.push(new Array(BOARD_SIZE).fill(0));
		}
		initialBoard[2][2] = 2;

		initialBoard[1][3] = 2;
		initialBoard[1][4] = 2;
		initialBoard[1][5] = 2;

		initialBoard[3][3] = 1;
		initialBoard[3][4] = 1;
		initialBoard[3][5] = 1;
		return initialBoard;
	});

	const [pawnShadowToPawnMap, setPawnShadowToPawnMap] = useState({});

	const handleMouseEnter = (rowIndex, colIndex) => {
		wallLogic(rowIndex, colIndex, "ADD_WALL_SHADOW");
	};

	const handleGapClick = (rowIndex, colIndex) => {
		wallLogic(rowIndex, colIndex, "ADD_WALL");
	};

	const wallLogic = (rowIndex, colIndex, action) => {
		let actionValue;

		if (action === "ADD_WALL_SHADOW") {
			actionValue = 1;
		} else if (action === "REMOVE_WALL_SHADOW") {
			actionValue = 0;
		} else if (action === "ADD_WALL") {
			actionValue = 2;
		} else {
			actionValue = -1;
		}

		if (typeOfCell(rowIndex, colIndex) === "RECTANGLE_GAP") {
			if (typeOfRectangularCell(rowIndex, colIndex) === "VERTICAL") {
				if (rowIndex === BOARD_SIZE - 1) {
					updateBoard(
						[
							[rowIndex, colIndex],
							[rowIndex - 1, colIndex],
							[rowIndex - 2, colIndex],
						],
						actionValue
					);
				} else {
					updateBoard(
						[
							[rowIndex, colIndex],
							[rowIndex + 1, colIndex],
							[rowIndex + 2, colIndex],
						],
						actionValue
					);
				}
			} else {
				if (colIndex === BOARD_SIZE - 1) {
					updateBoard(
						[
							[rowIndex, colIndex],
							[rowIndex, colIndex - 1],
							[rowIndex, colIndex - 2],
						],
						actionValue
					);
				} else {
					updateBoard(
						[
							[rowIndex, colIndex],
							[rowIndex, colIndex + 1],
							[rowIndex, colIndex + 2],
						],
						actionValue
					);
				}
			}
		} else if (typeOfCell(rowIndex, colIndex) === "SQUARE_GAP") {
			updateBoard(
				[
					[rowIndex, colIndex - 1],
					[rowIndex, colIndex],
					[rowIndex, colIndex + 1],
				],
				actionValue
			);
		}
	};
	const updateBoard = (coords, value) => {
		console.log(coords);

		for (let coord in coords) {
			const [rowIndex, colIndex] = coords[coord];
			if (
				board[rowIndex][colIndex] === 2 ||
				board[rowIndex][colIndex] === 3
			) {
				return;
			}
		}
		for (let coord in coords) {
			const [rowIndex, colIndex] = coords[coord];
			const newBoard = [...board];
			newBoard[rowIndex][colIndex] = value;
			setBoard(newBoard);
		}
	};

	const handleMouseLeave = (rowIndex, colIndex) => {
		wallLogic(rowIndex, colIndex, "REMOVE_WALL_SHADOW");
	};

	/* Tile, Rectangular_gap, Square_gap */
	const typeOfCell = (rowIndex, colIndex) => {
		return rowIndex % 2 === 1 && colIndex % 2 === 1
			? "SQUARE_GAP"
			: rowIndex % 2 !== 1 && colIndex % 2 !== 1
			? "TILE"
			: "RECTANGLE_GAP";
	};

	const typeOfRectangularCell = (rowIndex, colIndex) => {
		return rowIndex % 2 === 1 && colIndex % 2 === 0
			? "HORIZONTAL"
			: "VERTICAL";
	};
	const updateAdjacentPawnShadows = (rowIndex, colIndex, action) => {
		const adjacentList = [
			[-2, 0],
			[2, 0],
			[0, 2],
			[0, -2],
		];

		const newBoard = [...board];
		const newPawnShadowToPawnMap = { ...pawnShadowToPawnMap };

		for (var coords in adjacentList) {
			let newRowIndex = rowIndex + adjacentList[coords][0];
			let newColIndex = colIndex + adjacentList[coords][1];

			if (
				newRowIndex < 0 ||
				newRowIndex >= BOARD_SIZE ||
				newColIndex < 0 ||
				newColIndex >= BOARD_SIZE
			) {
				continue;
			}

			if (action === "ADD") {
				newBoard[newRowIndex][newColIndex] = 1;
				newPawnShadowToPawnMap[
					`${newRowIndex},${newColIndex}`
				] = `${rowIndex},${colIndex}`;
			} else if (action === "REMOVE") {
				newBoard[newRowIndex][newColIndex] = 0;
				delete newPawnShadowToPawnMap[`${newRowIndex},${newColIndex}`];
			}
		}

		setBoard(newBoard);
		setPawnShadowToPawnMap(newPawnShadowToPawnMap);
	};

	const handlePawnClick = (rowIndex, colIndex, isClicked) => {
		log.info(`Pawn clicked at row ${rowIndex}, col ${colIndex}`);

		if (isClicked) {
			updateAdjacentPawnShadows(rowIndex, colIndex, "REMOVE");
		} else {
			updateAdjacentPawnShadows(rowIndex, colIndex, "ADD");
		}
	};

	const handlePawnShadowClick = (rowIndex, colIndex) => {
		log.info(`Pawn Shadow clicked at row ${rowIndex}, col ${colIndex}`);

		// Get the coordinates of the pawn that this shadow belongs to
		const pawnCoords =
			pawnShadowToPawnMap[`${rowIndex},${colIndex}`].split(",");
		updateAdjacentPawnShadows(
			parseInt(pawnCoords[0]),
			parseInt(pawnCoords[1]),
			"REMOVE"
		);

		// If the pawn exists, move the pawn to the shadow's position
		if (pawnCoords) {
			const newBoard = [...board];
			newBoard[pawnCoords[0]][pawnCoords[1]] = 0;
			newBoard[rowIndex][colIndex] = 2;
			setBoard(newBoard);
		}

		// Remove all shadows
		setPawnShadowToPawnMap({});
	};

	const renderCellContent = (rowIndex, colIndex, cell) => {
		switch (typeOfCell(rowIndex, colIndex)) {
			case "TILE":
				if (cell === 2) {
					return (
						<Pawn
							rowIndex={rowIndex}
							colIndex={colIndex}
							onPawnClick={handlePawnClick}
						/>
					);
				} else if (cell === 1) {
					return (
						<PawnShadow
							rowIndex={rowIndex}
							colIndex={colIndex}
							onPawnShadowClick={handlePawnShadowClick}
						/>
					);
				}
				break;
			case "RECTANGLE_GAP":
				if (cell === 2) {
					return <Wall />;
				} else if (cell === 1) {
					return <WallShadow />;
				}

				break;
			case "SQUARE_GAP":
				if (cell === 2) {
					return <Wall />;
				} else if (cell === 1) {
					return <WallShadow />;
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
				onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
				onMouseLeave={() => handleMouseLeave(rowIndex, colIndex)}
				onClick={() => handleGapClick(rowIndex, colIndex)}
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
			<div
				key={colIndex}
				onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
				onMouseLeave={() => handleMouseLeave(rowIndex, colIndex)}
				onClick={() => handleGapClick(rowIndex, colIndex)}
				className={` ${BG_GAP_COLOR} w-2 h-2`}
			>
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
				{board[0].map((cell, colIndex) => (
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
					{board.map((row, rowIndex) => (
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

export default Board;
