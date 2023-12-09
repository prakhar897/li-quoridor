const initialState = {
	boardId: null,
	noOfPlayers: 2,
	players: {
		username1: {
			handle: "username1",
			elo: 1000,
			profile_pic: "img_link",
		},
		username2: {
			handle: "username2",
			elo: 1000,
			profile_pic: "img_link",
		},
	},
	pawnPlayerMap: {
		0: "username1",
		1: "username2",
	},
};

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default gameReducer;
