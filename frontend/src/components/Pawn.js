import { connect } from "react-redux";
import log from "../logger";
import { handlePawnClick, handlePawnShadowClick } from "../actions/BoardAction";

const Pawn = ({
	rowIndex,
	colIndex,
	isShadow,
	isPawnClicked,
	pawnShadowParent,
}) => {
	const shadowColor = isShadow
		? "bg-white opacity-100"
		: "bg-white opacity-50";

	const handleClick = () => {
		log.info(`Pawn clicked at row ${rowIndex}, col ${colIndex}`);
		if (isShadow) {
			log.info(`Pawn Shadow clicked at row ${rowIndex}, col ${colIndex}`);
			const parentPawnCoords =
				pawnShadowParent[`${rowIndex},${colIndex}`].split(",");
			handlePawnShadowClick(
				rowIndex,
				colIndex,
				parseInt(parentPawnCoords[0]),
				parseInt(parentPawnCoords[1])
			);
		} else {
			if (isPawnClicked) {
				handlePawnClick(rowIndex, colIndex, "REMOVE");
			} else {
				handlePawnClick(rowIndex, colIndex, "ADD");
			}
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
