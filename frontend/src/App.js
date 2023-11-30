import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Game />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
