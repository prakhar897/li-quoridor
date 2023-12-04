import CONSTANTS from "../constants";
import {
	getValidAdjacentPawnCoords,
	getWallCoords,
} from "../helpers/BoardHelpers";

const createInitialCells = () => {
	let initialBoard = [];

	// Initialize the board with 0s for empty spaces
	for (let i = 0; i < CONSTANTS.BOARD_SIZE; i++) {
		initialBoard.push(new Array(CONSTANTS.BOARD_SIZE).fill(0));
	}
	initialBoard[2][2] = 2;

	initialBoard[1][3] = 2;
	initialBoard[1][4] = 2;
	initialBoard[1][5] = 2;

	initialBoard[3][3] = 1;
	initialBoard[3][4] = 1;
	initialBoard[3][5] = 1;
	return initialBoard;
};

const initialState = {
	/*
		Board array has the following data: 
		 if its a tile: 0 = empty, 1: shadow-pawn, 2: your-pawn, 3: opposite-pawn
		 if its a gap: 0 = empty, 1: shadow-wall, 2: your-wall, 3: opposite-wall
	*/
	cells: createInitialCells(),
	pawnShadowParent: {},
};

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

			const newCells = [...state.cells];
			for (let coords in wallCoords) {
				const [rowIndex, colIndex] = wallCoords[coords];
				newCells[rowIndex][colIndex] = 1;
			}

			return {
				cells: newCells,
				...state,
			};
		}

		case "REMOVE_WALL_SHADOW": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newCells = [...state.cells];
			for (let coords in wallCoords) {
				const [rowIndex, colIndex] = wallCoords[coords];
				newCells[rowIndex][colIndex] = 0;
			}

			return {
				cells: newCells,
				...state,
			};
		}

		case "ADD_WALL": {
			const wallCoords = getWallCoords(
				action.payload.rowIndex,
				action.payload.colIndex
			);

			const newCells = [...state.cells];
			for (let coords in wallCoords) {
				const [rowIndex, colIndex] = wallCoords[coords];
				newCells[rowIndex][colIndex] = 2;
			}

			return {
				cells: newCells,
				...state,
			};
		}

		case "RESET_BOARD": {
			return {
				cells: createInitialCells(),
				pawnShadowParent: {},
			};
		}

		default:
			return state;
	}
};

export default boardReducer;
