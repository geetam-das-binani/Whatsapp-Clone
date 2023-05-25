import "./App.css";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chats from "./components/Chats";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
	const [{user},dispatch] = useStateValue();

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<BrowserRouter>
						<Sidebar />
						<Routes>
							<Route path="/" element={<Chats />} />
							<Route path="/rooms/:roomId" element={<Chats />} />
						</Routes>
					</BrowserRouter>
				</div>
			)}
		</div>
	);
}

export default App;

