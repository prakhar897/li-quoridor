import React from "react";
import { connect } from "react-redux";

const Wall = ({ rowIndex, colIndex, isShadow }) => {
	const shadowColor = isShadow ? "bg-black opacity-30" : "bg-black";

	return <div className={`${shadowColor} w-full h-full`}></div>;
};

export default connect(null, null)(Wall);
