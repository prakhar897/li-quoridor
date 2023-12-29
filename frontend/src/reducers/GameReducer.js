const initialState = {
	boardId: null,
	noOfPlayers: 2,
	players: [
		{
			handle: "username1",
			elo: 1000,
			profile_pic: "img_link",
			pawn_design: {
				color: "white",
			},
		},
		{
			handle: "username2",
			elo: 1000,
			profile_pic: "img_link",
			pawn_design: {
				color: "black",
			},
		},
	],
	myPlayerId: null,
};

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case "START_GAME": {
			return { ...state, myPlayerId: action.payload.myPlayerId };
		}

		case "END_GAME": {
			return state;
		}

		default:
			return state;
	}
};

export default gameReducer;
