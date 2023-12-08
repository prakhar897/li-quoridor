export const resetBoard = () => {
	return {
		type: "RESET_BOARD",
	};
};

export const importBoard = (pgn) => {
	return {
		type: "IMPORT_BOARD",
		payload: {
			pgn: pgn,
		},
	};
};

export const exportBoard = (moves) => {
	return {
		type: "EXPORT_BOARD",
		payload: {
			moves: moves,
		},
	};
};

export const toggleImportExportPopup = () => {
	return {
		type: "TOGGLE_IMPORT_EXPORT_POPUP",
	};
};

export const setPgn = (pgn) => {
	return {
		type: "SET_PGN",
		payload: {
			pgn: pgn,
		},
	};
};

export const toggleIsPGNCopied = () => {
	return {
		type: "TOGGLE_IS_PGN_COPIED",
	};
};
