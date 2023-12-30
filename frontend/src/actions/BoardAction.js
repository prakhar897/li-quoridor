export const handleMouseEnteringGap = (rowIndex, colIndex) => {
	return { type: "ADD_WALL_SHADOW", payload: { rowIndex, colIndex } };
};

export const handleMouseLeavingGap = (rowIndex, colIndex) => {
	return { type: "REMOVE_WALL_SHADOW", payload: { rowIndex, colIndex } };
};

export const handleGapClick = (rowIndex, colIndex) => {
	return {
		type: "ADD_WALL",
		payload: { rowIndex, colIndex },
	};
};

export const togglePawn = (rowIndex, colIndex) => {
	return {
		type: "PAWN_TOGGLE",
		payload: { rowIndex, colIndex },
	};
};

export const movePawn = (rowIndex, colIndex) => {
	return {
		type: "PAWN_SHADOW_CLICK",
		payload: { rowIndex, colIndex },
	};
};

export const bulkUpdateState = (moves, moveIndex = -1) => {
	return {
		type: "BULK_UPDATE_STATE",
		payload: {
			moves: moves,
			moveIndex: moveIndex,
		},
	};
};
