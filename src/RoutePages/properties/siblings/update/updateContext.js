import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../../../firebase-config";

// Context for the update component
export const UpdateContext = createContext();

export function UpdateContextProvider({ children }) {
	const [properties, setProperties] = useState([]);
	const [updating, setUpdating] = useState(false);
	const [loading, setLoading] = useState(false);
	const [updatingInfo, setUpdatingInfo] = useState("");

	const fetchProperties = async () => {
		const propertiesCollectionRef = collection(db, "properties");

		const queried = query(
			propertiesCollectionRef,
			orderBy("createdAt", "desc")
		);

		await getDocs(queried)
			.then(({ docs }) => {
				setProperties(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchProperties();

		return () => setProperties([]);
	}, []);

	return (
		<UpdateContext.Provider
			value={{
				properties,
				setProperties,
				updating,
				setUpdating,
				loading,
				setLoading,
				updatingInfo,
				setUpdatingInfo,
			}}>
			{children}
		</UpdateContext.Provider>
	);
}
