import CONSTANTS from "../constants";

export const getValidAdjacentPawnCoords = (rowIndex, colIndex, cells) => {
	const adjacentList = [
		[-2, 0],
		[2, 0],
		[0, 2],
		[0, -2],
	];

	const adjacentCoordsList = [];

	for (var coords in adjacentList) {
		let newRowIndex = rowIndex + adjacentList[coords][0];
		let newColIndex = colIndex + adjacentList[coords][1];

		if (
			newRowIndex < 0 ||
			newRowIndex >= CONSTANTS.BOARD_SIZE ||
			newColIndex < 0 ||
			newColIndex >= CONSTANTS.BOARD_SIZE
		) {
			continue;
		}

		adjacentCoordsList.push([newRowIndex, newColIndex]);
	}

	return adjacentCoordsList;
};

export const getWallCoords = (rowIndex, colIndex) => {
	rowIndex = parseInt(rowIndex);
	colIndex = parseInt(colIndex);
	if (typeOfCell(rowIndex, colIndex) === "RECTANGLE_GAP") {
		console.log("rect gap");
		if (typeOfRectangularCell(rowIndex, colIndex) === "VERTICAL") {
			console.log("vertical");
			if (rowIndex === CONSTANTS.BOARD_SIZE - 1) {
				console.log("endofboard");
				return [
					[
						[rowIndex, colIndex],
						[rowIndex - 1, colIndex],
						[rowIndex - 2, colIndex],
					],
				];
			} else {
				return [
					[
						[rowIndex, colIndex],
						[rowIndex + 1, colIndex],
						[rowIndex + 2, colIndex],
					],
				];
			}
		} else {
			if (colIndex === CONSTANTS.BOARD_SIZE - 1) {
				return [
					[
						[rowIndex, colIndex],
						[rowIndex, colIndex - 1],
						[rowIndex, colIndex - 2],
					],
				];
			} else {
				return [
					[
						[rowIndex, colIndex],
						[rowIndex, colIndex + 1],
						[rowIndex, colIndex + 2],
					],
				];
			}
		}
	} else if (typeOfCell(rowIndex, colIndex) === "SQUARE_GAP") {
		return [
			[rowIndex, colIndex - 1],
			[rowIndex, colIndex],
			[rowIndex, colIndex + 1],
		];
	} else {
		return null;
	}
};

export const typeOfCell = (rowIndex, colIndex) => {
	return rowIndex % 2 === 1 && colIndex % 2 === 1
		? "SQUARE_GAP"
		: rowIndex % 2 !== 1 && colIndex % 2 !== 1
		? "TILE"
		: "RECTANGLE_GAP";
};

export const typeOfRectangularCell = (rowIndex, colIndex) => {
	return rowIndex % 2 === 1 && colIndex % 2 === 0 ? "HORIZONTAL" : "VERTICAL";
};
