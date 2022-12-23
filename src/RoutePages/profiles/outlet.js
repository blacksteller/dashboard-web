import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilesPage from ".";
import Page404 from "./page404";
import { AddBrokerProfile } from "./siblings";

function ProfilesPageOutlet() {
	return (
		<>
			<div className="w-full h-full bg-transparent">
				<Routes>
					{/* HomePage */}
					<Route
						index
						element={<ProfilesPage />}
					/>

					{/* Add Broker Profile */}
					<Route
						path="add"
						element={<AddBrokerProfile />}
					/>

					{/* 404 PageNotFound */}
					<Route
						path="*"
						element={<Page404 />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default ProfilesPageOutlet;
