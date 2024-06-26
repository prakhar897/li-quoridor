import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FreeBoard from "./pages/FreeBoard";
import Play from "./pages/Play";
import HowToPlay from "./pages/HowToPlay";

import { connect } from "react-redux";
import "./App.css";

const App = ({ socketConnected, socketDisconnected }) => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<FreeBoard />} />
					<Route path="/play" element={<FreeBoard />} />
					<Route path="/how-to-play" element={<HowToPlay />} />
					<Route path="/freeboard" element={<FreeBoard />} />
				</Routes>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	game: state.game,
	board: state.board,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
