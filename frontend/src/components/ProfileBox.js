import React from "react";
import { connect } from "react-redux";

const ProfileBox = ({ wallcount, username }) => {
	return (
		<div className="flex items-center justify-between h-16 bg-gray-100 p-4">
			<div className="flex items-center space-x-4">
				<div className="w-12 h-12 rounded-lg border border-amber-300 overflow-hidden">
					<img
						className="w-full h-full object-cover"
						src="https://via.placeholder.com/150"
						alt="profile"
					/>
				</div>
				<div className="flex flex-col">
					<div className="text-sm font-semibold">{username}</div>
					<div className="flex items-center space-x-1">
						<div className="w-4 h-4 rounded-sm overflow-hidden">
							<img
								className="w-full h-full object-cover"
								width="48"
								height="48"
								src="https://img.icons8.com/color/48/georgia-circular.png"
								alt="georgia-circular"
							/>
						</div>

						<span className="text-xs">1500</span>
					</div>
				</div>
			</div>

			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-1">
					<span className="text-xs">Walls:</span>
					<span className="text-xs">{wallcount}</span>
				</div>
				<div className="flex items-center space-x-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 fill-current text-gray-600"
						viewBox="0 0 20 20"
					>
						<path d="M5.48,9a.93.93,0,0,0-.3.71v.58a.94.94,0,0,0,.3.71,1,1,0,0,0,.71.3h4.58a1,1,0,0,0,.71-.3.94.94,0,0,0,.29-.71V9.7A.92.92,0,0,0,11.48,9a1,1,0,0,0-.71-.27H6.19A1,1,0,0,0,5.48,9Z"></path>
						<path d="M19.22,6.1a9.9,9.9,0,0,0-2.14-3.18A10.23,10.23,0,0,0,13.9.78,9.76,9.76,0,0,0,10,0,9.86,9.86,0,0,0,6.1.78,10,10,0,0,0,.78,6.1,9.81,9.81,0,0,0,0,10a9.81,9.81,0,0,0,.78,3.9A10,10,0,0,0,6.1,19.22,9.86,9.86,0,0,0,10,20a9.76,9.76,0,0,0,3.89-.78,10.23,10.23,0,0,0,3.18-2.14,9.9,9.9,0,0,0,2.14-3.18A9.81,9.81,0,0,0,20,10,9.81,9.81,0,0,0,19.22,6.1ZM17.07,13a7.65,7.65,0,0,1-1.65,2.42A7.81,7.81,0,0,1,13,17.06a7.46,7.46,0,0,1-3,.6,7.51,7.51,0,0,1-3-.6,7.74,7.74,0,0,1-2.43-1.65A8,8,0,0,1,2.94,13a7.46,7.46,0,0,1-.6-3,7.46,7.46,0,0,1,.6-3A8,8,0,0,1,4.58,4.59,7.74,7.74,0,0,1,7,2.94a7.51,7.51,0,0,1,3-.6,7.45,7.45,0,0,1,3,.6,7.74,7.74,0,0,1,2.43,1.65A7.65,7.65,0,0,1,17.07,7a7.46,7.46,0,0,1,.6,3A7.46,7.46,0,0,1,17.07,13Z"></path>
					</svg>
					<span className="text-xs">12:34</span>
				</div>
			</div>
		</div>
	);
};

export default connect(null, null)(ProfileBox);
