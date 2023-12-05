import React from "react";
import { connect } from "react-redux";
import { resetBoard } from "../actions/SidebarAction";

/*
	button animation not happen on trackpad.
*/
const Sidebar = ({ resetBoard }) => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<p>Board Sidebar</p>
			<button
				className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
				onClick={() => resetBoard()}
			>
				Reset Board
			</button>
		</div>
	);
};

const mapDispatchToProps = {
	resetBoard: resetBoard,
};

export default connect(null, mapDispatchToProps)(Sidebar);
