// Pawn.js
import React, { useState } from "react";

const pawnShadowColor = "bg-white";

const PawnShadow = ({ onPawnShadowClick, rowIndex, colIndex }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handlePawnShadowClick = () => {
		setIsClicked(!isClicked);
		onPawnShadowClick && onPawnShadowClick(rowIndex, colIndex);
	};

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full border-2 border-black ${pawnShadowColor} opacity-100`}
			onClick={handlePawnShadowClick}
		></div>
	);
};

export default PawnShadow;
