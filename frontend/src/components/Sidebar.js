import React from "react";
import { connect } from "react-redux";
import {
	resetBoard,
	importBoard,
	exportBoard,
	toggleImportExportPopup,
	setPgn,
	toggleIsPGNCopied,
} from "../actions/SidebarAction";

import { bulkUpdateState } from "../actions/BoardAction";

import { convertPGNToMoves } from "../helpers/SidebarHelpers";
import MoveList from "../components/MoveList";
import { XIcon } from "@heroicons/react/solid";

const Sidebar = ({
	resetBoard,
	importBoard,
	exportBoard,
	isImportExportPopupOpen,
	toggleImportExportPopup,
	pgn,
	isPgnCopied,
	setPgn,
	toggleIsPGNCopied,
	moves,
	bulkUpdateState,
}) => {
	const handleImport = () => {
		const newMoves = convertPGNToMoves(pgn);
		resetBoard();
		bulkUpdateState(newMoves);
	};
	// todo: copy clipboard doesnt work
	const handleExport = () => {
		exportBoard(moves);
		navigator.clipboard.writeText(pgn);
		toggleIsPGNCopied();

		setTimeout(() => {
			toggleIsPGNCopied();
		}, 2000);
	};

	return (
		<>
			<MoveList />
			<div className="h-fit flex flex-col items-center justify-center mt-6">
				<button
					className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-1 mb-1"
					onClick={() => resetBoard()}
				>
					Reset Board
				</button>
				<button
					className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-1 mb-1"
					onClick={() => toggleImportExportPopup()}
				>
					Import/Export
				</button>

				{isImportExportPopupOpen && (
					<div className="fixed inset-0 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg w-1/2 h-1/2 relative">
							<button
								className="absolute top-0 right-0"
								onClick={() => toggleImportExportPopup()}
							>
								<XIcon className="h-6 w-6 text-gray-500" />
							</button>
							<textarea
								className="w-full h-64 p-2 border rounded"
								value={pgn}
								onChange={(e) => setPgn(e.target.value)}
							/>
							<div className="flex justify-end mt-4">
								<button
									className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
									onClick={handleImport}
								>
									Import
								</button>
								<button
									className="bg-red-500 text-white px-4 py-2 rounded"
									onClick={handleExport}
								>
									Export
								</button>
							</div>
						</div>
					</div>
				)}
				{isPgnCopied && (
					<div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
						Copied to clipboard!
					</div>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		pgn: state.sidebar.pgn,
		isImportExportPopupOpen: state.sidebar.isImportExportPopupOpen,
		isPgnCopied: state.sidebar.isPgnCopied,
		moves: state.board.moves,
	};
};
const mapDispatchToProps = {
	resetBoard: resetBoard,
	importBoard: importBoard,
	exportBoard: exportBoard,
	toggleImportExportPopup: toggleImportExportPopup,
	setPgn: setPgn,
	toggleIsPGNCopied: toggleIsPGNCopied,
	bulkUpdateState: bulkUpdateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
