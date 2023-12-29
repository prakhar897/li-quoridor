import React from "react";

const Spinner = ({ size = 8, color = "blue" }) => {
	const spinnerClasses = `animate-spin h-${size} w-${size} border-${color}-500 border-4 rounded-full`;

	return (
		<div className="flex justify-center items-center">
			<div className={spinnerClasses}></div>
		</div>
	);
};

export default Spinner;
