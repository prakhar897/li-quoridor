import React, { useState } from "react";
import Pawn from "./Pawn";
import Wall from "./Wall";
import PawnShadow from "./PawnShadow";
import log from "../logger";

const BOARD_SIZE = 19; //19;
const TILE_COLOR = "bg-orange-300";
const RECTANGLE_GAP_COLOR = "bg-orange-900";
const SQUARE_GAP_COLOR = "bg-orange-900";

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
		initialBoard[1][3] = 2;
		return initialBoard;
	});

	const [pawnShadowToPawnMap, setPawnShadowToPawnMap] = useState({});

	/* Tile, Rectangular_gap, Square_gap */
	const typeOfTile = (rowIndex, colIndex) => {
		return rowIndex % 2 === 0 && colIndex % 2 === 0
			? "SQUARE_GAP"
			: rowIndex % 2 !== 0 && colIndex % 2 !== 0
			? "TILE"
			: "RECTANGLE_GAP";
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

	const renderTile = (rowIndex, colIndex, cell) => {
		switch (typeOfTile(rowIndex, colIndex)) {
			case "TILE":
				if (cell === 2) {
					return (
						<Pawn
							color="bg-blue-100"
							rowIndex={rowIndex}
							colIndex={colIndex}
							onPawnClick={handlePawnClick}
						/>
					);
				} else if (cell === 1) {
					return (
						<PawnShadow
							color="bg-blue-100"
							rowIndex={rowIndex}
							colIndex={colIndex}
							onPawnShadowClick={handlePawnShadowClick}
						/>
					);
				}
				break;
			case "RECTANGLE_GAP":
				if (rowIndex === 4 && colIndex === 5) {
					return <Wall orientation="horizontal" />;
				}
				break;
			default:
				break;
		}
	};

	const renderVerticalLabels = (rowIndex) => {
		const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			.split("")
			.slice(0, BOARD_SIZE);
		return (
			<div
				className={`border bg-white w-10 ${
					rowIndex % 2 === 0 ? "h-2" : "h-10"
				} flex justify-center items-center`}
			>
				{labels[rowIndex]}
			</div>
		);
	};

	const renderHorizontalLabels = () => {
		return (
			<div className="flex">
				<div className="w-10 h-10"></div>
				{board[0].map((cell, colIndex) => (
					<div
						key={colIndex}
						className={`border bg-white h-10 ${
							colIndex % 2 === 0 ? "w-2" : "w-10"
						} flex justify-center items-center`}
					>
						{colIndex + 1}
					</div>
				))}
			</div>
		);
	};
	const renderBoard = () => {
		return (
			<div className="flex justify-center items-center h-screen">
				<div>
					{board.map((row, rowIndex) => (
						<div key={rowIndex} className="flex">
							{renderVerticalLabels(rowIndex)}
							{row.map((cell, colIndex) => (
								<div
									key={colIndex}
									className={` ${
										rowIndex % 2 === 0 && colIndex % 2 === 0
											? SQUARE_GAP_COLOR
											: rowIndex % 2 !== 0 &&
											  colIndex % 2 !== 0
											? TILE_COLOR
											: RECTANGLE_GAP_COLOR
									} ${rowIndex % 2 === 0 ? "h-2" : "h-10"} ${
										colIndex % 2 === 0 ? "w-2" : "w-10"
									}`}
								>
									{renderTile(rowIndex, colIndex, cell)}
								</div>
							))}
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
