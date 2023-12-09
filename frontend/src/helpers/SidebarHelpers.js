export const convertMovesToPGN = (moves) => {
	let pgn = "";
	for (let i = 0; i < moves.length; i++) {
		if (i % 2 === 0) {
			pgn += i / 2 + 1 + ". ";
		}
		pgn += moves[i] + " ";
	}
	return pgn;
};

export const convertPGNToMoves = (pgn) => {
	let pgnArray = pgn.trim().split(" ");
	let moves = [];
	for (let i = 0; i < pgnArray.length; i++) {
		if (i % 3 === 0) continue;
		moves.push(pgnArray[i]);
	}
	return moves;
};

export const convertNotationToMove = (notation) => {
	let move = {
		type: "",
		payload: {
			rowIndex: -1,
			colIndex: -1,
		},
	};

	if (notation.length === 2) {
		move.type = "PAWN";
		move.payload = convertNotationToPawnMove(notation);
	} else {
		move.type = "WALL";
		move.payload = convertNotationtoAddingWalls(notation);
	}
	return move;
};

export const convertNotationToPawnMove = (notation) => {
	let colIndex = notation.charCodeAt(0) - 97;
	let rowIndex = 9 - parseInt(notation[1]);

	return {
		colIndex: colIndex * 2,
		rowIndex: rowIndex * 2,
	};
};

export const convertNotationtoAddingWalls = (notation) => {
	let alphabet = notation.charAt(0);
	let numeral = parseInt(notation.charAt(1));
	let direction = notation.charAt(2);

	let rowIndex, colIndex;
	let walls = [];

	if (direction === "h") {
		rowIndex = (9 - numeral) * 2;
		colIndex = (alphabet.charCodeAt(0) - 97) * 2;
		walls.push({
			position: { rowIndex: rowIndex - 1, colIndex: colIndex },
		});

		walls.push({
			position: { rowIndex: rowIndex - 1, colIndex: colIndex + 1 },
		});
		walls.push({
			position: { rowIndex: rowIndex - 1, colIndex: colIndex + 2 },
		});
	} else if (direction === "v") {
		rowIndex = (9 - numeral) * 2;
		colIndex = (alphabet.charCodeAt(0) - 97) * 2;
		walls.push({
			position: { rowIndex: rowIndex, colIndex: colIndex + 1 },
		});
		walls.push({
			position: { rowIndex: rowIndex - 2, colIndex: colIndex + 1 },
		});
		walls.push({
			position: { rowIndex: rowIndex - 1, colIndex: colIndex + 1 },
		});
	}

	return walls;
};
