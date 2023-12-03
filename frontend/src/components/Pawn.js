// Pawn.js
import React, { useState } from "react";

const PAWN_COLOR_WHITE = "bg-white";
//const PAWN_COLOR_BLACK = "bg-black";

const Pawn = ({ onPawnClick, rowIndex, colIndex }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handlePawnClick = () => {
		setIsClicked(!isClicked);
		onPawnClick && onPawnClick(rowIndex, colIndex, isClicked); // Pass rowIndex and colIndex to the Board component
	};

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full border-2 border-black ${PAWN_COLOR_WHITE} ${
				isClicked ? "opacity-50" : "opacity-100"
			}`}
			onClick={handlePawnClick}
		></div>
	);
};

export default Pawn;
