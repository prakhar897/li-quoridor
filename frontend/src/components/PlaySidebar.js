import React from "react";
import { connect } from "react-redux";
import { joinQueue } from "../actions/socketActions";
import Spinner from "./Spinner";

const PlaySideBar = ({ joinQueue }) => {
	const [showSpinner, setShowSpinner] = React.useState(false);
	const handlePlayClick = () => {
		setShowSpinner(true);
		joinQueue();
	};

	return (
		<>
			<button
				className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
				onClick={handlePlayClick}
			>
				Play
			</button>
			{showSpinner && <Spinner />}
		</>
	);
};

const mapDispatchToProps = {
	joinQueue: joinQueue,
};

export default connect(null, mapDispatchToProps)(PlaySideBar);
