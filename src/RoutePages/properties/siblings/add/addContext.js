import { createContext, useEffect, useState } from "react";

export const AddContext = createContext();

export function AddContextProvider({ children }) {
	const [reload, setReload] = useState(false);

	useEffect(() => {
		if (reload) setReload(false);
	}, [reload]);

	return (
		<AddContext.Provider
			value={{
				setReload,
			}}>
			{reload ? null : children}
		</AddContext.Provider>
	);
}
