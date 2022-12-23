import React from "react";
import { Outlet } from "react-router-dom";

function DashboardPageOutlet() {
	return (
		<>
			<div className="w-full h-full bg-transparent">
				<Outlet />
			</div>
		</>
	);
}

export default DashboardPageOutlet;
