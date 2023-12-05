import { connect } from "react-redux";
import log from "../logger";
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
const Pawn = ({ id, position, isShadow, isClicked, parentPosition }) => {
	const shadowColor = isShadow
		? "bg-white opacity-50"
		: "bg-white opacity-100";

	const handleClick = () => {
		log.info(
			`Pawn clicked at row ${position.rowIndex}, col ${position.colIndex}`
		);
		if (isShadow) {
			handlePawnShadowClick(
				position.rowIndex,
				position.colIndex,
				parentPosition.rowIndex,
				parentPosition.colIndex
			);
		} else {
			handlePawnClick(position.rowIndex, position.colIndex);
		}
	};

	return (
		<div
			className={`w-9 h-9 mx-auto rounded-full border-2 border-black ${shadowColor}`}
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
