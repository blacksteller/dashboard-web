import React from "react";
import { Outlet } from "react-router-dom";

function LocationsPageOutlet() {
	return (
		<>
			<div className="relative w-full h-full bg-transparent">
				<Outlet />
			</div>
		</>
	);
}

export default LocationsPageOutlet;
