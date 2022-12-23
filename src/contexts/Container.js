import React, { createContext, useEffect, useRef, useState } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

export const ContainerContext = createContext();

export default function Container({ children }) {
	const [appTitle, setAppTitle] = useState("Dashboard");
	const [openModal, setOpenModal] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [uploadingInfo, setUploadingInfo] = useState("");
	const [clearStorage, setClearStorage] = useState(false);
	const [online, setOnline] = useState(false);
	const bgRemoveApi = useRef("https://api.remove.bg/v1.0/removebg");

	/**
	 * Fetching profiles from firebase/firestore
	 */
	const [profiles, setProfiles] = useState([]);
	const fetchProfiles = async () => {
		const profilesCollectionRef = collection(db, "profiles");

		await getDocs(profilesCollectionRef).then((res) =>
			setProfiles(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	};

	/**
	 * Fetch Properties from firebase/firestore
	 */
	const [properties, setProperties] = useState([]);
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
			});
	};

	const checkOnline = () => {
		const _online = window.navigator.onLine;

		setOnline(_online);
	};

	useEffect(() => {
		checkOnline();
		fetchProfiles();
		fetchProperties();
	}, []);

	return (
		<>
			<ContainerContext.Provider
				value={{
					bgRemoveApi: bgRemoveApi.current,
					appTitle,
					setAppTitle: (newTitle) => {
						setAppTitle("Dashboard | " + newTitle);
					},
					openModal,
					setOpenModal,
					uploading,
					setUploading,
					uploadingInfo,
					setUploadingInfo,
					clearStorage,
					setClearStorage,
					online,
					checkOnline,
					properties,
					setProperties,
					fetchProperties,
					profiles,
					setProfiles,
					fetchProfiles,
				}}>
				{children}
			</ContainerContext.Provider>
		</>
	);
}
