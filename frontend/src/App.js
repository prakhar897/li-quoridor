import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FreeBoard from "./pages/FreeBoard";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<FreeBoard />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
