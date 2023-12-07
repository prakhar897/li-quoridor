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
