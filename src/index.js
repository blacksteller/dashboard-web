import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Container from "./contexts/Container";
import { BrowserRouter } from "react-router-dom";
import SidebarContextProvider from "./contexts/sidebarContext";
import LocationsContextProvider from "./RoutePages/locations/locationsContext";
import PropertiesContextProvider from "./RoutePages/properties/propertiesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* Lets wrap into a BrowserRouter to use Routes */}
		<BrowserRouter>
			{/* Lets wrap into a Container  */}
			<Container>
				{/* Locations Context Provider */}
				<LocationsContextProvider>
					{/* Properties Context Provider */}
					<PropertiesContextProvider>
						{/* Lets wrap into a SideBarContextProvider */}
						<SidebarContextProvider>
							{/* Finally App */}
							<App />
						</SidebarContextProvider>
					</PropertiesContextProvider>
				</LocationsContextProvider>
			</Container>
		</BrowserRouter>
	</React.StrictMode>
);
