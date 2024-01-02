const initialState = {
	id: "Disconnected-Board-Id",
	black: {
		handle: "Computer_Black",
		elo: 1000,
		profile_pic: "img_link",
	},
	white: {
		handle: "Computer_White",
		elo: 1000,
		profile_pic: "img_link",
	},
	status: "disconnected",
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
