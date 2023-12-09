import { convertMovesToPGN } from "../helpers/SidebarHelpers";

const initialState = {
	isImportExportPopupOpen: false,
	pgn: "",
	isPgnCopied: false,
};

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case "TOGGLE_IMPORT_EXPORT_POPUP": {
			return {
				...state,
				isImportExportPopupOpen: !state.isImportExportPopupOpen,
			};
		}

		case "SET_PGN": {
			return {
				...state,
				pgn: action.payload.pgn,
			};
		}

		case "TOGGLE_IS_PGN_COPIED": {
			return {
				...state,
				isPgnCopied: !state.isPgnCopied,
			};
		}

		case "EXPORT_BOARD": {
			const pgn = convertMovesToPGN(action.payload.moves);
			return { ...state, pgn: pgn };
		}

		case "RESET_BOARD": {
			return {
				...initialState,
			};
		}

		default:
			return state;
	}
};

export default sidebarReducer;
