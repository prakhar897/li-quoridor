import { connect } from "react-redux";
import { togglePawn, movePawn } from "../actions/BoardAction";

/*
Sample Prop
{
	id: 0,
	position: {
		rowIndex: 0,
		colIndex: 8,
	},
	isClicked: false,
	isShadow: true,
	parentPostion: {
		rowIndex: 1,
		colIndex: 9
	}
}
*/
const Pawn = ({
	id,
	position,
	isShadow,
	turn,
	togglePawn,
	movePawn,
	pawnDesign,
}) => {
	const turnHighlight = turn === id ? "border-2 border-amber-200" : "";

	const renderShadowPawn = () => {
		return (
			<div
				className={`w-7 h-7 mx-auto rounded-full bg-slate-50 ${turnHighlight} opacity-50`}
				onClick={() => movePawn(position.rowIndex, position.colIndex)}
			></div>
		);
	};

	const renderPawn = () => {
		return (
			<div
				className={`w-8 h-8 mx-auto rounded-full ${
					"bg-" + pawnDesign.color
				} ${turnHighlight} opacity-100`}
				onClick={() => togglePawn(position.rowIndex, position.colIndex)}
			></div>
		);
	};

	return isShadow ? renderShadowPawn() : renderPawn();
};

const mapDispatchToProps = {
	togglePawn: togglePawn,
	movePawn: movePawn,
};

export default connect(null, mapDispatchToProps)(Pawn);
