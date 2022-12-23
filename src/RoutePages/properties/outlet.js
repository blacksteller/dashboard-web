import React from "react";
import { Route, Routes } from "react-router-dom";
import PropertiesPage from ".";
import Page404 from "./page404";
import { AddProperties, UpdateProperty } from "./siblings";
import { AddContextProvider } from "./siblings/add/addContext";
import UpdatePropertyOutlet from "./siblings/update/outlet";
import Update from "./siblings/update/slug";
import { UpdateContextProvider } from "./siblings/update/updateContext";

function PropertiesPageOutlet() {
	return (
		<>
			<div className="w-full h-full bg-transparent">
				<Routes>
					{/* HomePage */}
					<Route
						index
						element={<PropertiesPage />}
					/>

					{/* Add Properties */}
					<Route
						path="add"
						element={
							<AddContextProvider>
								<AddProperties />
							</AddContextProvider>
						}
					/>

					{/* Update property */}
					<Route
						path="update/*"
						element={
							<UpdateContextProvider>
								<UpdatePropertyOutlet />
							</UpdateContextProvider>
						}>
						<Route
							index
							element={<UpdateProperty />}
						/>

						<Route
							path=":id"
							element={<Update />}
						/>
					</Route>

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

export default PropertiesPageOutlet;
