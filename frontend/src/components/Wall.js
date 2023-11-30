import React from "react";

const Wall = ({ orientation }) => {
	const wallStyle = orientation === "horizontal" ? "h-2 w-10" : "w-2 h-10";

	return <div className={`bg-purple-700 ${wallStyle}`}></div>;
};

export default Wall;
