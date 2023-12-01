// Pawn.js
import React, { useState } from "react";

const Pawn = ({ color, onPawnClick, rowIndex, colIndex }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handlePawnClick = () => {
		setIsClicked(!isClicked);
		onPawnClick && onPawnClick(rowIndex, colIndex, isClicked); // Pass rowIndex and colIndex to the Board component
	};

	const pawnColor = color;

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full border-2 border-gray-800 ${pawnColor} ${
				isClicked ? "opacity-50" : ""
			}`}
			onClick={handlePawnClick}
		></div>
	);
};

export default Pawn;
