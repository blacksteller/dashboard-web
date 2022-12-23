/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ContainerContext } from "../../contexts/Container";

export const LocationsContext = createContext();

export default function LocationsContextProvider({ children }) {
	const { checkOnline } = useContext(ContainerContext);
	const [locations, setLocations] = useState([]);
	const [location, setLocation] = useState("All");
	const [checking, setChecking] = useState(false);

	/**
	 * Get all locations from the firestore
	 */
	const fetchLocations = async () => {
		const locationsRef = collection(db, "locations");

		await getDocs(locationsRef).then(({ docs }) =>
			setLocations(docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	};

	/**
	 *
	 * @param {string} loc
	 * @param {object|array} properties
	 * @returns
	 */
	const checkIfExists = (loc, properties) => {
		return properties.some(
			(p) => p.locationName.toLowerCase() === loc.titleKey
		);
	};

	/**
	 *
	 * @param {string} id
	 * @returns Promise
	 */
	const deleteLocation = async (id) => {
		const promise = new Promise(async function (resolve, reject) {
			const delLocationRef = doc(db, "locations", id);
			await deleteDoc(delLocationRef)
				.then((res) =>
					resolve({ msg: "Successfully updated locations 🚀", res })
				)
				.catch((error) => reject({ msg: "Failed to delete location", error }));
		});

		return promise;
	};

	/**
	 * Here we loop through each ids of locations which are exists in properties,
	 * And simply delete the location from firestore database
	 *
	 * @param {[array of ids]} ids
	 * @returns
	 */
	const deleteLocationsIfNotExists = async (ids) => {
		const promise = new Promise(async function (resolve, reject) {
			let res = [];
			try {
				for (let i = 0; i < ids.length; i++) {
					const response = await deleteLocation(ids[i]);

					res.push(response);
				}

				resolve(res);
			} catch (error) {
				reject({ msg: "Failed to update locations", error });
			}
		});

		return promise;
	};

	/**
	 * Here we loop through every location and send it to check if it exists or not
	 *
	 * @param {object} properties
	 * @returns
	 */
	const checkEachEveryLocationsInProperties = async (properties) => {
		let __ids = [];
		const promise = new Promise(async function (resolve, reject) {
			for (let i = 0; i < locations.length; i++) {
				const loc = locations[i];
				const exists = await checkIfExists(loc, properties);

				if (exists) {
					continue;
				} else {
					__ids.push(loc.id);
				}
			}

			resolve(__ids);
		});

		return promise;
	};

	/**
	 *
	 * Here we check locations if it is exists in properties or not
	 * If not exists in properties, we just find the ids which are not existed
	 * and lastly we deleted each locations which does not exits
	 *
	 */
	const updateLocations = async () => {
		setChecking(true);
		const promise = new Promise(async function (resolve, reject) {
			const propertiesRef = collection(db, "properties");
			await getDocs(propertiesRef)
				.then(async (res) => {
					const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
					await checkEachEveryLocationsInProperties(data)
						.then((response) => {
							resolve(response);
						})
						.catch((error) => reject(error));
				})
				.catch((error) => reject({ msg: "Faile to update locations", error }));
		});

		return promise;
	};

	useEffect(() => {
		fetchLocations();
		checkOnline();
	}, []);

	useEffect(() => {
		if (locations.length > 0) {
			setLocation(locations[0] ? locations[0].title : "All");
		}

		// Cleanup function
		return () => setLocation("All");
	}, [locations]);

	return (
		<>
			<LocationsContext.Provider
				value={{
					locationData: {
						count: locations.length,
						current: location,
						locations: locations,
						setLocation,
						setLocations,
					},
					fetchLocations,
					updateLocations,
					deleteLocationsIfNotExists,
					checking,
					setChecking,
				}}>
				{children}
			</LocationsContext.Provider>
		</>
	);
}
