import CONSTANTS from "../constants";
import {
	getValidAdjacentPawnCoords,
	getWallCoords,
} from "../helpers/BoardHelpers";
import log from "../logger";

const initialState = {
	pawns: [
		{
			id: 0,
			position: {
				rowIndex: 0,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: false,
		},
		{
			id: 1,
			position: {
				rowIndex: 16,
				colIndex: 8,
			},
			isClicked: false,
			isShadow: true,
		},
	],
	pawnShadows: [],
	walls: [],
	wallShadows: [],
};

// var sampleState = {
// 	pawns: [
// 		{
// 			id: 0,
// 			position: {
// 				rowIndex: 0,
// 				colIndex: 8,
// 			},
// 			isClicked: false,
// 			isShadow: false,
// 		},
// 		{
// 			id: 1,
// 			position: {
// 				rowIndex: 16,
// 				colIndex: 8,
// 			},
// 			isClicked: false,
// 			isShadow: false,
// 		},
// 		{
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
// 		{
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
// 	],
// 	walls: [
// 		{
// 			id: 0,
// 			position: {
// 				rowIndex: 11,
// 				colIndex: 9,
// 			},
// 			isShadow: false,
// 		},
// 		{
// 			id: 1,
// 			position: {
// 				rowIndex: 14,
// 				colIndex: 9,
// 			},
// 			isShadow: false,
// 		},
// 		{
// 			id: 0,
// 			position: {
// 				rowIndex: 11,
// 				colIndex: 11,
// 			},
// 			isShadow: true,
// 		},
// 		{
// 			id: 1,
// 			position: {
// 				rowIndex: 14,
// 				colIndex: 11,
// 			},
// 			isShadow: true,
// 		},
// 	],
// };

const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_PAWN_SHADOW": {
			const adjacentCoordsList = getValidAdjacentPawnCoords(
				action.payload.rowIndex,
				action.payload.colIndex,
				state.cells
			);

			const newCells = [...state.cells];
			const newPawnShadowParent = { ...state.pawnShadowParent };

			for (let coords in adjacentCoordsList) {
				const [rowIndex, colIndex] = adjacentCoordsList[coords];
				newCells[rowIndex][colIndex] = 1;
				newPawnShadowParent[
					`${rowIndex},${colIndex}`
				] = `${action.payload.rowIndex},${action.payload.colIndex}`;
			}

			return {
				cells: newCells,
				pawnShadowParent: newPawnShadowParent,
			};
		}

		case "REMOVE_PAWN_SHADOW": {
			const adjacentCoordsList = getValidAdjacentPawnCoords(
				action.payload.rowIndex,
				action.payload.colIndex,
				state.cells
			);

			const newCells = [...state.cells];
			const newPawnShadowParent = { ...state.pawnShadowParent };

			for (let coords in adjacentCoordsList) {
				const [rowIndex, colIndex] = adjacentCoordsList[coords];
				newCells[rowIndex][colIndex] = 0;
				delete newPawnShadowParent[`${rowIndex},${colIndex}`];
			}

			return {
				cells: newCells,
				pawnShadowParent: newPawnShadowParent,
			};
		}

		case "PAWN_SHADOW_CLICK": {
			const parentPawnCoords =
				state.pawnShadowParent[
					`${action.payload.rowIndex},${action.payload.rowIndex}`
				].split(",");

			const adjacentCoordsList = getValidAdjacentPawnCoords(
				parseInt(parentPawnCoords[0]),
				parseInt(parentPawnCoords[1]),
				state.cells
			);

			const newCells = [...state.cells];
			const newPawnShadowParent = { ...state.pawnShadowParent };

			for (let coords in adjacentCoordsList) {
				const [rowIndex, colIndex] = adjacentCoordsList[coords];
				newCells[rowIndex][colIndex] = 0;
				delete newPawnShadowParent[`${rowIndex},${colIndex}`];
			}

			newCells[parentPawnCoords[0]][parentPawnCoords[1]] = 0;
			newCells[action.payload.rowIndex][action.payload.colIndex] = 2;

			return {
				cells: newCells,
				pawnShadowParent: {},
			};
		}

		case "ADD_WALL_SHADOW": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newWalls = [...state.walls];
			for (const [rowIndex, colIndex] of wallCoords) {
				const newWall = {
					id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
					position: {
						rowIndex,
						colIndex,
					},
					isShadow: true,
				};
				newWalls.push(newWall);
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

			const newWalls = [...state.walls];

			for (let i = newWalls.length - 1; i >= 0; i--) {
				const item = newWalls[i];
				if (!item.isShadow) continue;

				const shouldRemove = wallCoords.some(
					(w) =>
						w[0] === item.position.rowIndex &&
						w[1] === item.position.colIndex
				);

				if (shouldRemove) {
					newWalls.splice(i, 1); // Remove the item at index i
				}
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

			const newWalls = [...state.walls];

			for (let i = newWalls.length - 1; i >= 0; i--) {
				const item = newWalls[i];
				if (!item.isShadow) continue;

				const shouldRemove = wallCoords.some(
					(w) =>
						w[0] === item.position.rowIndex &&
						w[1] === item.position.colIndex
				);

				if (shouldRemove) {
					newWalls.splice(i, 1); // Remove the item at index i
				}
			}

			for (const [rowIndex, colIndex] of wallCoords) {
				const newWall = {
					id: CONSTANTS.BOARD_SIZE * rowIndex + colIndex,
					position: {
						rowIndex,
						colIndex,
					},
					isShadow: false,
				};
				newWalls.push(newWall);
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
