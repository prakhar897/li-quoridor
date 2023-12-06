import React from "react";
import { connect } from "react-redux";

/*
	button animation not happen on trackpad.
*/
const Infobar = ({ resetBoard }) => {
	return (
		<div className="flex items-center justify-center">
			<div className="flex">
				<div className="mr-4">
					<span className="text-black">TURN</span>
					<span className="text-white ml-2">WHITE</span>
				</div>

				<div className="mr-4">
					<span className="text-white">WHITE</span>
					<span className="text-black ml-2">10</span>
				</div>

				<div>
					<span className="text-white">BLACK</span>
					<span className="text-black ml-2">8</span>
				</div>
			</div>
		</div>
	);
};

export default connect(null, null)(Infobar);
