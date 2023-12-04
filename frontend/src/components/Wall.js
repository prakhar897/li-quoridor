import React from "react";
import { connect } from "react-redux";

import {
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
} from "../actions/BoardAction";

const Wall = ({
	rowIndex,
	colIndex,
	isShadow,
	handleGapClick,
	handleMouseEnteringGap,
	handleMouseLeavingGap,
}) => {
	const shadowColor = isShadow ? "bg-black opacity-30" : "bg-black";

	return (
		<div
			className={`${shadowColor} w-full h-full`}
			onClick={() => handleGapClick(rowIndex, colIndex)}
			onMouseEnter={() => handleMouseEnteringGap(rowIndex, colIndex)}
			onMouseLeave={() => handleMouseLeavingGap(rowIndex, colIndex)}
		></div>
	);
};

const mapDispatchToProps = {
	handleGapClick: handleGapClick,
	handleMouseEnteringGap: handleMouseEnteringGap,
	handleMouseLeavingGap: handleMouseLeavingGap,
};

export default connect(null, mapDispatchToProps)(Wall);
