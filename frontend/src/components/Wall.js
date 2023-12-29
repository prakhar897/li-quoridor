import React from "react";
import { connect } from "react-redux";

// Sample Props
// 		{
// 			id: 0,
// 			position: {
// 				rowIndex: 11,
// 				colIndex: 9,
// 			},
// 			isShadow: false,
// 		},

const Wall = ({ pawnDesign, isShadow }) => {
	const wallColor = isShadow
		? "bg-black bg-opacity-40"
		: "bg-opacity-80 bg-" + pawnDesign.color;

	return <div className={`${wallColor} w-full h-full`}></div>;
};

export default connect(null, null)(Wall);
