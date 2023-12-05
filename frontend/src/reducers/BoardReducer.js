import CONSTANTS from "../constants";
import {
	getValidAdjacentPawnCoords,
	getWallCoords,
} from "../helpers/BoardHelpers";

const initialState = {
	pawns: {
		"0,8": {
			id: 0,
			position: {
				rowIndex: 0,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: false,
		},
		"16,8": {
			id: 1,
			position: {
				rowIndex: 16,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: false,
		},
	},
	walls: {},
};

// var sampleState = {
// 	pawns: {
// 		"0,8": {
// 			id: 0,
// 			position: {
// 				rowIndex: 0,
// 				colIndex: 8,
// 			},
// 			isClicked: false,
// 			isShadow: false,
// 		},
// 		"16,8": {
// 			id: 1,
// 			position: {
// 				rowIndex: 16,
// 				colIndex: 8,
// 			},
// 			isClicked: false,
// 			isShadow: false,
// 		},
// 		"2,8": {
// 			id: 0,
// 			position: {
// 				rowIndex: 2,
// 				colIndex: 8,
// 			},
// 			isShadow: true,
// 			parentPostion: {
// 				rowIndex: 1,
// 				colIndex: 9,
// 			},
// 		},
// 		"14,8": {
// 			id: 1,
// 			position: {
// 				rowIndex: 14,
// 				colIndex: 8,
// 			},
// 			isShadow: true,
// 			parentPostion: {
// 				rowIndex: 1,
// 				colIndex: 9,
// 			},
// 		},
// 	},
// 	walls: {
// 		"11,9": {
// 			id: 0,
// 			position: {
// 				rowIndex: 11,
// 				colIndex: 9,
// 			},
// 			isShadow: false,
// 		},
// 		"14,9": {
// 			id: 1,
// 			position: {
// 				rowIndex: 14,
// 				colIndex: 9,
// 			},
// 			isShadow: false,
// 		},
// 		"11,11": {
// 			id: 0,
// 			position: {
// 				rowIndex: 11,
// 				colIndex: 11,
// 			},
// 			isShadow: true,
// 		},
// 		"14,11": {
// 			id: 1,
// 			position: {
// 				rowIndex: 14,
// 				colIndex: 11,
// 			},
// 			isShadow: true,
// 		},
// 	},
// };

const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case "PAWN_TOGGLE": {
			const adjacentCoordsList = getValidAdjacentPawnCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newPawns = { ...state.pawns };

			let parentPieceKey =
				action.payload.rowIndex + "," + action.payload.colIndex;

			for (let [rowIndex, colIndex] in adjacentCoordsList) {
				let pieceKey = rowIndex + "," + colIndex;
				if (!newPawns[parentPieceKey].isClicked) {
					const newShadowPawn = {
						id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
						position: {
							rowIndex: rowIndex,
							colIndex: colIndex,
						},
						isShadow: true,
						parentPostion: {
							rowIndex: action.payload.rowIndex,
							colIndex: action.payload.colIndex,
						},
					};
					newPawns[pieceKey] = newShadowPawn;
				} else {
					delete newPawns[pieceKey];
				}
			}

			const newParentPawn = {
				...newPawns[parentPieceKey],
				isClicked: !newPawns[parentPieceKey].isClicked,
			};
			newPawns[parentPieceKey] = newParentPawn;

			return {
				...state,
				pawns: newPawns,
			};
		}

		case "PAWN_SHADOW_CLICK": {
			const newPawns = { ...state.pawns };

			let shadowPieceKey =
				action.payload.rowIndex + "," + action.payload.colIndex;

			const adjacentCoordsList = getValidAdjacentPawnCoords(
				newPawns[shadowPieceKey].parentPostion.rowIndex,
				newPawns[shadowPieceKey].parentPostion.colIndex
			);

			for (let [rowIndex, colIndex] in adjacentCoordsList) {
				let pieceKey = rowIndex + "," + colIndex;
				delete newPawns[pieceKey];
			}

			newPawns[shadowPieceKey] = {
				...newPawns[shadowPieceKey],
				isClicked: false,
				isShadow: false,
				parentPositions: [],
			};

			return {
				...state,
				pawns: newPawns,
			};
		}

		case "ADD_WALL_SHADOW": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newWalls = { ...state.walls };
			for (const [rowIndex, colIndex] of wallCoords) {
				const pieceKey = rowIndex + "," + colIndex;
				const newWall = {
					id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
					position: {
						rowIndex,
						colIndex,
					},
					isShadow: true,
				};
				newWalls[pieceKey] = newWall;
			}

			return {
				...state,
				walls: newWalls,
			};
		}

		case "REMOVE_WALL_SHADOW": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newWalls = { ...state.walls };

			for (const [rowIndex, colIndex] of wallCoords) {
				const pieceKey = rowIndex + "," + colIndex;
				delete newWalls[pieceKey];
			}

			return {
				...state,
				walls: newWalls,
			};
		}

		case "ADD_WALL": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newWalls = { ...state.walls };

			for (const [rowIndex, colIndex] of wallCoords) {
				const pieceKey = rowIndex + "," + colIndex;
				const newWall = {
					id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
					position: {
						rowIndex,
						colIndex,
					},
					isShadow: false,
				};
				newWalls[pieceKey] = newWall;
			}

			return {
				...state,
				walls: newWalls,
			};
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

export default boardReducer;
