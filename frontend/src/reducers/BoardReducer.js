import CONSTANTS from "../constants";
import {
	getValidPawnMoves,
	getValidWallMoves,
	convertPawnMoveToNotation,
	convertAddingWalltoNotation,
} from "../helpers/BoardHelpers";

import {
	convertPGNToMoves,
	convertNotationToPawnMove,
	convertNotationtoAddingWalls,
} from "../helpers/SidebarHelpers";

const initialState = {
	pawns: {
		"16,8": {
			id: 0,
			position: {
				rowIndex: 16,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: false,
			goalRow: 0,
			wallCount: 10,
		},
		"0,8": {
			id: 1,
			position: {
				rowIndex: 0,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: false,
			goalRow: 16,
			wallCount: 10,
		},
	},
	walls: {},
	moves: [],
	currentMoveNo: 0,
};

// var sampleState = {
// 	moves: ["e2", "e8", "e1", "e7", "e4h", "h6v", "h5v"],
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
//          wallOwner: 1
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

// var initialState = sampleState;

const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case "PAWN_TOGGLE": {
			let parentPieceKey =
				action.payload.rowIndex + "," + action.payload.colIndex;

			if (
				!state.pawns[parentPieceKey] ||
				state.pawns[parentPieceKey].id !== state.currentMoveNo % 2
			) {
				return state;
			}

			const validPawnMoves = getValidPawnMoves(state.pawns, state.walls, {
				rowIndex: action.payload.rowIndex,
				colIndex: action.payload.colIndex,
			});

			const newPawns = { ...state.pawns };

			for (const [rowIndex, colIndex] of validPawnMoves) {
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
							id: newPawns[parentPieceKey].id,
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

			let parentPieceKey =
				newPawns[shadowPieceKey].parentPostion.rowIndex +
				"," +
				newPawns[shadowPieceKey].parentPostion.colIndex;

			const newMoves = [...state.moves].splice(
				0,
				state.currentMoveNo + 1
			);
			console.log(newMoves);
			newMoves.push(
				convertPawnMoveToNotation(
					{
						rowIndex: action.payload.rowIndex,
						colIndex: action.payload.colIndex,
					},
					{
						rowIndex:
							newPawns[shadowPieceKey].parentPostion.rowIndex,
						colIndex:
							newPawns[shadowPieceKey].parentPostion.colIndex,
					}
				)
			);

			if (
				!state.pawns[parentPieceKey] ||
				state.pawns[parentPieceKey].id !== state.currentMoveNo % 2
			) {
				return state;
			}

			let parentId = newPawns[parentPieceKey].id;
			let goalRow = newPawns[parentPieceKey].goalRow;
			let wallCount = newPawns[parentPieceKey].wallCount;
			delete newPawns[parentPieceKey];

			const validPawnMoves = getValidPawnMoves(state.pawns, state.walls, {
				rowIndex: newPawns[shadowPieceKey].parentPostion.rowIndex,
				colIndex: newPawns[shadowPieceKey].parentPostion.colIndex,
			});

			for (const [rowIndex, colIndex] of validPawnMoves) {
				let pieceKey = rowIndex + "," + colIndex;
				delete newPawns[pieceKey];
			}

			newPawns[shadowPieceKey] = {
				id: parentId,

				position: {
					rowIndex: action.payload.rowIndex,
					colIndex: action.payload.colIndex,
				},
				isClicked: false,
				isShadow: false,
				goalRow: goalRow,
				wallCount: wallCount,
				parentPosition: {},
			};

			return {
				...state,
				pawns: newPawns,
				moves: newMoves,
				currentMoveNo: state.currentMoveNo + 1,
			};
		}

		case "ADD_WALL_SHADOW": {
			const validWalls = getValidWallMoves(state.pawns, state.walls, {
				rowIndex: action.payload.rowIndex,
				colIndex: action.payload.colIndex,
			});

			const newWalls = { ...state.walls };

			if (!validWalls) {
				return state;
			}

			for (const [rowIndex, colIndex] of validWalls) {
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
			const validWalls = getValidWallMoves(state.pawns, state.walls, {
				rowIndex: action.payload.rowIndex,
				colIndex: action.payload.colIndex,
			});

			const newWalls = { ...state.walls };

			if (!validWalls) {
				return state;
			}

			for (const [rowIndex, colIndex] of validWalls) {
				const pieceKey = rowIndex + "," + colIndex;
				delete newWalls[pieceKey];
			}

			return {
				...state,
				walls: newWalls,
			};
		}

		case "ADD_WALL": {
			const validWalls = getValidWallMoves(state.pawns, state.walls, {
				rowIndex: action.payload.rowIndex,
				colIndex: action.payload.colIndex,
			});

			if (!validWalls) {
				return state;
			}

			const newWalls = { ...state.walls };
			const onlyNewWalls = {};

			const newPawns = { ...state.pawns };
			for (let pawnKey in newPawns) {
				if (newPawns[pawnKey].id === state.currentMoveNo % 2) {
					if (newPawns[pawnKey].wallCount === 0) {
						return state;
					}
					newPawns[pawnKey] = {
						...newPawns[pawnKey],
						wallCount: newPawns[pawnKey].wallCount - 1,
					};
				}
			}

			for (const [rowIndex, colIndex] of validWalls) {
				const pieceKey = rowIndex + "," + colIndex;
				const newWall = {
					id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
					position: {
						rowIndex,
						colIndex,
					},
					isShadow: false,
					owner: state.currentMoveNo % 2,
				};
				onlyNewWalls[pieceKey] = newWall;
				newWalls[pieceKey] = newWall;
			}

			const wallNotation = convertAddingWalltoNotation(onlyNewWalls);

			const newMoves = [...state.moves].splice(
				0,
				state.currentMoveNo + 1
			);
			console.log(newMoves);

			newMoves.push(wallNotation);

			return {
				...state,
				walls: newWalls,
				pawns: newPawns,
				moves: newMoves,
				currentMoveNo: state.currentMoveNo + 1,
			};
		}

		case "BULK_UPDATE_STATE": {
			const newMoves = action.payload.moves;
			let moveIndex = action.payload.moveIndex;

			const finalPawnPositions = {};

			const newWalls = {};

			for (let pawn in state.pawns) {
				finalPawnPositions[state.pawns[pawn].id] = {
					...state.pawns[pawn],
				};
			}

			console.log(moveIndex);

			for (let index = 0; index < moveIndex; index++) {
				const move = newMoves[index];
				console.log(move);

				if (move.length === 2) {
					let newPos = convertNotationToPawnMove(move);

					finalPawnPositions[index % 2] = {
						...finalPawnPositions[index % 2],
						position: newPos,
					};
				} else {
					let walls = convertNotationtoAddingWalls(move);
					for (let wall of walls) {
						let tempWall = {
							id:
								CONSTANTS.BOARD_SIZE * wall.position.rowIndex +
								wall.position.colIndex,
							position: {
								rowIndex: wall.position.rowIndex,
								colIndex: wall.position.colIndex,
							},
							isShadow: false,
							owner: index % 2,
						};

						newWalls[
							wall.position.rowIndex +
								"," +
								wall.position.colIndex
						] = tempWall;
					}

					finalPawnPositions[index % 2].wallCount -= 1;
				}
			}

			let newPawns = {};
			for (let pawnIndex in finalPawnPositions) {
				let pawn = finalPawnPositions[pawnIndex];
				newPawns[
					pawn.position.rowIndex + "," + pawn.position.colIndex
				] = finalPawnPositions[pawn.id];
			}

			return {
				...state,
				moves: action.payload.moves,
				pawns: newPawns,
				walls: newWalls,
				currentMoveNo: moveIndex,
			};
		}

		case "RESET_BOARD": {
			return {
				...initialState,
			};
		}

		case "IMPORT_BOARD": {
			const newMoves = convertPGNToMoves(action.payload.pgn);
			return { ...state, moves: newMoves };
		}

		default:
			return state;
	}
};

export default boardReducer;
