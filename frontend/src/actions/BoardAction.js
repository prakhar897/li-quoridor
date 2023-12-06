import log from "../logger";

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

export const handlePawnClick = (rowIndex, colIndex) => {
	return {
		type: "PAWN_TOGGLE",
		payload: { rowIndex, colIndex },
	};
};

export const handlePawnShadowClick = (rowIndex, colIndex) => {
	return {
		type: "PAWN_SHADOW_CLICK",
		payload: { rowIndex, colIndex },
	};
};
