import React from "react";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import ProfileBox from "../components/ProfileBox";
const FreeBoard = () => {
	return (
		<div className="grid grid-cols-10 h-screen">
			<div className="col-span-1 bg-gray-600">
				<div className="h-full flex items-center justify-center">
					{/* Content for navigation bar */}
					<p>Navigation Bar</p>
				</div>
			</div>

			<div className="col-span-6 bg-gray-400 h-screen w-full">
				<div className="grid grid-rows-10 w-full h-screen bg-gray-400">
					<div className="row-span-1">
						<ProfileBox />
					</div>

					<div className="row-span-8">
						<Board />
					</div>

					<div className="row-span-1 align-bottom">
						<ProfileBox />
					</div>
				</div>
			</div>
			<div className="col-span-3 bg-gray-600">
				<Sidebar />
			</div>
		</div>
	);
};

export default FreeBoard;
