import React from "react";
import { connect } from "react-redux";
import { resetBoard } from "../actions/SidebarAction";

const Sidebar = ({ resetBoard }) => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<p>Board Sidebar</p>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded active:translate-y-1"
				onClick={() => resetBoard()}
			>
				Play
			</button>
		</div>
	);
};

const mapDispatchToProps = {
	resetBoard: resetBoard,
};

export default connect(null, mapDispatchToProps)(Sidebar);
