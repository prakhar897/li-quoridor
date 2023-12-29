import React from "react";
import Rules from "../components/Rules";

import { connect } from "react-redux";

import looping_gif from "../assets/looping_gif.gif";

import Navbar from "../components/Navbar";
const HowToPlay = () => {
	return (
		<div className="grid grid-cols-10 h-max">
			<div className="col-span-1 bg-gray-600">
				<div className="h-max flex items-center justify-center">
					<Navbar />
				</div>
			</div>

			<div className="col-span-6 bg-gray-400 h-screen w-full">
				<div className="grid grid-rows-10 w-full h-max bg-gray-400">
					<img
						src={looping_gif} // Replace with your GIF file path
						alt="Looping GIF"
						className="w-auto h-auto" // Add appropriate styling
					/>
					<Rules />
				</div>
			</div>
			<div className="col-span-3 bg-gray-600 h-auto"></div>
		</div>
	);
};

export default connect(null, null)(HowToPlay);
