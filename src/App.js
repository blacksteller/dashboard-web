import { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Page404 from "./404";
import { ContainerContext } from "./contexts/Container";
import MainContainerLayout from "./mainContainerLayout";
import {
	DashboardPageOutlet,
	ProfilesPageOutlet,
	PropertiesPageOutlet,
} from "./RoutePages";
import LocationsPage from "./RoutePages/locations";
import LocationsPageOutlet from "./RoutePages/locations/outlet";
import LocationsPage404 from "./RoutePages/locations/page404";

function App() {
	const { appTitle } = useContext(ContainerContext);

	return (
		<>
			{/* Title of the page */}
			<title>{appTitle}</title>

			{/* Add DarkMode class to the DIV to enable darkMode */}
			<div className="relative w-screen h-screen text-gray-800">
				<Routes>
					<Route
						path="/*"
						element={<MainContainerLayout />}>
						<Route
							index
							element={<div>Dashboard page</div>}></Route>

						<Route
							path="dashboard/*"
							element={<DashboardPageOutlet />}>
							<Route
								index
								element={<div>Dashboard page</div>}></Route>

							<Route
								path="view"
								element={<div> This is views</div>}
							/>

							<Route
								path="analytics"
								element={<div> This is analytics</div>}
							/>
						</Route>

						{/* Notifications Routes */}
						<Route
							path="notifications/*"
							element={
								<div className="w-full h-full">
									<Outlet />
								</div>
							}>
							<Route
								index
								element={<div> This is Notifications Page</div>}
							/>
						</Route>

						{/* Properties Routes */}
						<Route
							path="properties/*"
							element={<PropertiesPageOutlet />}
						/>

						{/* Locations Routes */}
						<Route
							path="locations/*"
							element={<LocationsPageOutlet />}>
							<Route
								index
								element={<LocationsPage />}
							/>

							{/* 404 PageNotFound */}
							<Route
								path="*"
								element={<LocationsPage404 />}
							/>
						</Route>

						{/* Profiles routes */}
						<Route
							path="profiles/*"
							element={<ProfilesPageOutlet />}
						/>

						{/* 404 PageNotFound */}
						<Route
							path="*"
							element={<Page404 />}
						/>
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
