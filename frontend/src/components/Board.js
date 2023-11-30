import React from "react";

const BOARD_SIZE = 9;

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
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="grid grid-cols-9 gap-1">
					{createBoard().map((row, rowIndex) => (
						<div key={rowIndex}>
							{row.map((cell, colIndex) => (
								<div
									key={colIndex}
									className="w-10 h-10 border border-black bg-gray-300"
								></div>
							))}
						</div>
					))}
				</div>
			</div>
		);
	};

	return <>{renderBoard()}</>;
};

export default Board;
