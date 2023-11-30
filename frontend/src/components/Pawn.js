import React from "react";

const Pawn = ({ color }) => {
	const pawnColor = color;

	return (
		<div
			className={`w-9 h-9 justify-center items-center rounded-full border-2 border-gray-800 ${pawnColor}`}
		></div>
	);
};

export default Pawn;
