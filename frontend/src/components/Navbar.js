import React from "react";
import { connect } from "react-redux";
import { GiftIcon } from "@heroicons/react/outline";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
	return (
		<>
			<nav className="h-full border-r border-gray-700">
				<Link
					className="flex items-center justify-center h-16 bg-gray-800"
					to="/"
				>
					<GiftIcon className="h-1/2 w-1/2 text-blue-500" />
					<span className="text-xl font-bold  text-white">
						Quoridor
					</span>
				</Link>

				<div className="flex flex-col py-4">
					<Link
						to="/play"
						className="px-6 py-2 text-gray-300 hover:bg-gray-700"
					>
						Play
					</Link>

					<Link
						to="/freeboard"
						className="px-6 py-2 text-gray-300 hover:bg-gray-700"
					>
						Free Board
					</Link>

					<Link
						to="/how-to-play"
						className="px-6 py-2 text-gray-300 hover:bg-gray-700"
					>
						How To Play
					</Link>
				</div>
			</nav>
			<Outlet />
		</>
	);
}

export default connect(null, null)(Navbar);
