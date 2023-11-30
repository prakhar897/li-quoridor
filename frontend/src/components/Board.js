import React from "react";
import Pawn from "./Pawn";
import Wall from "./Wall";

const BOARD_SIZE = 19;
const TILE_COLOR = "bg-orange-300";
const RECTANGLE_GAP_COLOR = "bg-orange-900";
const SQUARE_GAP_COLOR = "bg-orange-900";

const Board = () => {
	const createBoard = () => {
		const newBoard = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			const row = [];
			for (let j = 0; j < BOARD_SIZE; j++) {
				row.push(0); // 0 represents empty space
			}
			newBoard.push(row);
		}
		return newBoard;
	};

	const renderBoard = () => {
		const board = createBoard();
		const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			.split("")
			.slice(0, BOARD_SIZE);

		return (
			<div className="flex justify-center items-center h-screen">
				<div>
					{board.map((row, rowIndex) => (
						<div key={rowIndex} className="flex">
							<div
								className={`border bg-white w-10 ${
									rowIndex % 2 === 0 ? "h-2" : "h-10"
								} flex justify-center items-center`}
							>
								{labels[rowIndex]}
							</div>
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
									{/* Add condition to place pawn on a specific square */}
									{rowIndex === 5 && colIndex === 5 && (
										<Pawn color="bg-blue-100" />
									)}
									{/* Add condition to place a wall on a specific position */}
									{rowIndex === 4 && colIndex === 5 && (
										<Wall orientation="horizontal" />
									)}
								</div>
							))}
						</div>
					))}
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
				</div>
			</div>
		);
	};

	return <>{renderBoard()}</>;
};

export default Board;
