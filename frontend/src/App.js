import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FreeBoard from "./pages/FreeBoard";
import Play from "./pages/Play";
import HowToPlay from "./pages/HowToPlay";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<FreeBoard />} />
					<Route path="/play" element={<Play />} />
					<Route path="/how-to-play" element={<HowToPlay />} />
					<Route path="/" element={<FreeBoard />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
