import React from "react";
import { connect } from "react-redux";

const MoveList = ({ moves }) => {
	return (
		<div id="move-list-component" className="overflow-auto max-h-96">
			<div className="flex flex-col gap-2">
				{moves.map((move, index) => {
					if (index % 2 === 0) {
						const nextMove = moves[index + 1] || "";
						return (
							<div
								key={index}
								className="flex justify-between p-1 bg-gray-100"
							>
								<span className="w-1/2 text-center">
									{index / 2 + 1}
								</span>
								<span className="w-1/2 text-center">
									{move}
								</span>
								<span className="w-1/2 text-center">
									{nextMove}
								</span>
							</div>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	moves: state.board.moves,
});

export default connect(mapStateToProps, null)(MoveList);
