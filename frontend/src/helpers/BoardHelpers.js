import CONSTANTS from "../constants";

export const getValidPawnMoves = (pawns, walls, currentPawn) => {
	const adjacentTileList = [
		[-2, 0],
		[2, 0],
		[0, 2],
		[0, -2],
	];

	const adjacentWallList = [
		[-1, 0],
		[1, 0],
		[0, 1],
		[0, -1],
	];

	const adjacentCoordsList = [];

	for (let index = 0; index < adjacentTileList.length; index++) {
		let newTileRowIndex = currentPawn.rowIndex + adjacentTileList[index][0];
		let newTileColIndex = currentPawn.colIndex + adjacentTileList[index][1];

		// Check if shadow is going out of bounds
		if (!IsValidCell(newTileRowIndex, newTileColIndex)) {
			continue;
		}

		// Checking if walls is blocking the movement
		let newWallRowIndex = currentPawn.rowIndex + adjacentWallList[index][0];
		let newWallColIndex = currentPawn.colIndex + adjacentWallList[index][1];
		const wallKey = newWallRowIndex + "," + newWallColIndex;
		if (walls[wallKey]) {
			continue;
		}

		// Checking If opponent pawn is blocking
		let tileKey = newTileRowIndex + "," + newTileColIndex;
		if (pawns[tileKey] && !pawns[tileKey].isShadow) {
			// If not blocked by a wall behind opponent pawn
			if (
				!walls[
					newTileRowIndex +
						adjacentWallList[index][0] +
						"," +
						(newTileColIndex + adjacentWallList[index][1])
				]
			) {
				newTileRowIndex += adjacentTileList[index][0];
				newTileColIndex += adjacentTileList[index][1];
			} else {
				continue;
			}
		}

		adjacentCoordsList.push([newTileRowIndex, newTileColIndex]);
	}

	return adjacentCoordsList;
};

export const isEdgeCell = (rowIndex, colIndex) => {
	if (
		typeOfCell(rowIndex, colIndex) === "RECTANGLE_GAP" &&
		typeOfRectangularCell(rowIndex, colIndex) === "VERTICAL" &&
		rowIndex === CONSTANTS.BOARD_SIZE - 1
	) {
		return true;
	} else if (
		typeOfCell(rowIndex, colIndex) === "RECTANGLE_GAP" &&
		typeOfRectangularCell(rowIndex, colIndex) === "HORIZONTAL" &&
		colIndex === CONSTANTS.BOARD_SIZE - 1
	) {
		return true;
	}

	return false;
};

export const getWallCoords = (rowIndex, colIndex) => {
	if (typeOfCell(rowIndex, colIndex) === "RECTANGLE_GAP") {
		if (typeOfRectangularCell(rowIndex, colIndex) === "VERTICAL") {
			if (rowIndex === CONSTANTS.BOARD_SIZE - 1) {
				return [
					[rowIndex, colIndex],
					[rowIndex - 1, colIndex],
					[rowIndex - 2, colIndex],
				];
			} else {
				return [
					[rowIndex, colIndex],
					[rowIndex + 1, colIndex],
					[rowIndex + 2, colIndex],
				];
			}
		} else {
			if (colIndex === CONSTANTS.BOARD_SIZE - 1) {
				return [
					[rowIndex, colIndex],
					[rowIndex, colIndex - 1],
					[rowIndex, colIndex - 2],
				];
			} else {
				return [
					[rowIndex, colIndex],
					[rowIndex, colIndex + 1],
					[rowIndex, colIndex + 2],
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
		return [];
	}
};

export const getValidWallMoves = (pawns, walls, currentCell) => {
	const wallCoords = getWallCoords(
		currentCell.rowIndex,
		currentCell.colIndex
	);

	return wallCoords;
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

export const IsValidCell = (rowIndex, colIndex) => {
	if (
		rowIndex < 0 ||
		rowIndex >= CONSTANTS.BOARD_SIZE ||
		colIndex < 0 ||
		colIndex >= CONSTANTS.BOARD_SIZE
	) {
		return false;
	}
	return true;
};

export const convertPawnMoveToNotation = (
	endPawnPosition,
	startPawnPosition
) => {
	console.log(startPawnPosition);
	console.log(endPawnPosition);

	let alphabet = String.fromCharCode(97 + endPawnPosition.colIndex / 2);
	let numeral = 9 - endPawnPosition.rowIndex / 2;
	return alphabet + "" + numeral;
};

export const convertAddingWalltoNotation = (newlyBuiltWalls) => {
	console.log(newlyBuiltWalls);

	let rows = [];
	let cols = [];

	Object.keys(newlyBuiltWalls).forEach((key) => {
		let rowIndex = newlyBuiltWalls[key].position.rowIndex;
		let colIndex = newlyBuiltWalls[key].position.colIndex;
		rows.push(rowIndex);
		cols.push(colIndex);
	});

	rows.sort(function (a, b) {
		return a - b;
	});
	cols.sort(function (a, b) {
		return a - b;
	});

	let alphabet;
	let numeral;
	let direction;

	if (rows[0] === rows[2]) {
		direction = "h";
		alphabet = String.fromCharCode(97 + cols[0] / 2);
		numeral = Math.floor(9 - rows[2] / 2);
	} else {
		direction = "v";
		alphabet = String.fromCharCode(97 + cols[2] / 2);
		numeral = Math.floor(9 - rows[2] / 2);
	}

	return alphabet + "" + numeral + "" + direction;
};
