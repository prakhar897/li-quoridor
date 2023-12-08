import { connect } from "react-redux";
import { togglePawn, handlePawnShadowClick } from "../actions/BoardAction";

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
	isClicked,
	parentPosition,
	turn,
	togglePawn,
	handlePawnShadowClick,
}) => {
	//const shadowColor = isShadow
	//	? "opacity-50 !important"
	//	: "opacity-100 !important";

	const turnHighlight =
		turn === id ? "border-2 border-amber-200" : "border-2 border-black";

	const color =
		id === 0 ? "bg-cyan-500" : id === 1 ? "bg-rose-500" : "bg-slate-50";

	const handleClick = () => {
		if (isShadow) {
			handlePawnShadowClick(position.rowIndex, position.colIndex);
		} else {
			togglePawn(position.rowIndex, position.colIndex);
		}
	};

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full ${color}  ${turnHighlight}`}
			style={{ opacity: isShadow ? 0.8 : 1 }}
			onClick={handleClick}
		></div>
	);
};

const mapStateToProps = (state) => ({
	pawnShadowParent: state.board.pawnShadowParent,
});

const mapDispatchToProps = {
	togglePawn: togglePawn,
	handlePawnShadowClick: handlePawnShadowClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pawn);
