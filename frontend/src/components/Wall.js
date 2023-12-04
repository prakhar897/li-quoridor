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

const Wall = ({ id, position, isShadow }) => {
	const shadowColor = isShadow ? "bg-black opacity-30" : "bg-black";

	return <div className={`${shadowColor} w-full h-full`}></div>;
};

export default connect(null, null)(Wall);
