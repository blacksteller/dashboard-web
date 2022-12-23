import React, { createContext, useState } from "react";

export const PropertiesContext = createContext();

export default function PropertiesContextProvider({ children }) {
	const [showPlot, setShowPlot] = useState(true);

	return (
		<>
			<PropertiesContext.Provider
				value={{
					showPlot,
					setShowPlot,
				}}>
				{children}
			</PropertiesContext.Provider>
		</>
	);
}
