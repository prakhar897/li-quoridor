import { connect } from "react-redux";
import { handlePawnClick, handlePawnShadowClick } from "../actions/BoardAction";

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
	handlePawnClick,
	handlePawnShadowClick,
}) => {
	const shadowColor = isShadow
		? "bg-white opacity-50"
		: "bg-white opacity-100";

	const turnHighlight =
		turn === id ? "border border-amber-200" : "border-2 border-black";

	const handleClick = () => {
		if (isShadow) {
			handlePawnShadowClick(position.rowIndex, position.colIndex);
		} else {
			handlePawnClick(position.rowIndex, position.colIndex);
		}
	};

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full ${shadowColor} ${turnHighlight}`}
			onClick={handleClick}
		></div>
	);
};

const mapStateToProps = (state) => ({
	pawnShadowParent: state.board.pawnShadowParent,
});

const mapDispatchToProps = {
	handlePawnClick: handlePawnClick,
	handlePawnShadowClick: handlePawnShadowClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pawn);
