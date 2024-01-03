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
	status: "disconnected", //disconnected, connected, playing, ended, error
};

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case "START_GAME": {
			return { ...state, myPlayerId: action.payload.myPlayerId };
		}

		case "END_GAME": {
			return state;
		}

		case "START_MATCH": {
			const match = action.payload.match;
			console.log(match);

			const newWhite = {
				handle: match.white.handle,
				elo: match.white.elo,
				profile_pic: match.white.profile_pic,
			};

			const newBlack = {
				handle: match.black.handle,
				elo: match.black.elo,
				profile_pic: match.black.profile_pic,
			};

			return {
				...state,
				id: match.id,
				white: newWhite,
				black: newBlack,
				status: "playing",
			};
		}

		default:
			return state;
	}
};

export default gameReducer;
