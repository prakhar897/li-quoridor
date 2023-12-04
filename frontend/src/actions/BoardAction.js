import { log } from "../logger";

export const handleMouseEnteringGap = (rowIndex, colIndex) => {
	return { type: "ADD_WALL_SHADOW", payload: { rowIndex, colIndex } };
};

export const handleMouseLeavingGap = (rowIndex, colIndex) => {
	return { type: "REMOVE_WALL_SHADOW", payload: { rowIndex, colIndex } };
};

export const handlePawnClick = (rowIndex, colIndex, action) => {
	if (action === "ADD") {
		return {
			type: "ADD_PAWN_SHADOW",
			payload: { rowIndex, colIndex },
		};
	} else {
		return {
			type: "REMOVE_PAWN_SHADOW",
			payload: { rowIndex, colIndex },
		};
	}
};

export const handlePawnShadowClick = (rowIndex, colIndex) => {
	log.info(`Pawn Shadow clicked at row ${rowIndex}, col ${colIndex}`);
	return {
		type: "PAWN_SHADOW_CLICK",
		payload: { rowIndex, colIndex },
	};
};

export const handleGapClick = (rowIndex, colIndex) => {
	return {
		type: "ADD_WALL",
		payload: { rowIndex, colIndex },
	};
};
