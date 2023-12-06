import React, { useState } from "react";
import { connect } from "react-redux";
import { resetBoard } from "../actions/SidebarAction";
import MoveList from "../components/MoveList";
import { XIcon } from "@heroicons/react/solid";

/*
	button animation not happen on trackpad.
*/
const Sidebar = ({ resetBoard }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	//pgn = portable game notation
	const [pgn, setPgn] = useState("sample pgn");
	const [copied, setCopied] = useState(false);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const handleImport = () => {
		// Implement your import logic here
		console.log("Importing PGN:", pgn);
		closePopup();
	};

	const handleExport = () => {
		// Implement your export logic here
		navigator.clipboard.writeText("sample pgn");
		console.log("Exporting PGN:", "sample pgn");
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<>
			<MoveList />
			<div className="h-full flex flex-col items-center justify-center">
				<button
					className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
					onClick={() => resetBoard()}
				>
					Reset Board
				</button>
				<button
					className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600
							border-b-[4px] hover:brightness-110 mx-auto w-80
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
					onClick={openPopup}
				>
					Import/Export
				</button>

				{isPopupOpen && (
					<div className="fixed inset-0 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg w-1/2 h-1/2 relative">
							<button
								className="absolute top-0 right-0"
								onClick={closePopup}
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
				{copied && (
					<div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
						Copied to clipboard!
					</div>
				)}
			</div>
		</>
	);
};

const mapDispatchToProps = {
	resetBoard: resetBoard,
};

export default connect(null, mapDispatchToProps)(Sidebar);
