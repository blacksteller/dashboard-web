import {
	collection,
	addDoc,
	serverTimestamp,
	doc,
	updateDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from "../../../../../firebase-config";

async function saveImages(id, images) {
	let urls = [];

	const result = await Promise.all(
		images.map(async function (file) {
			return new Promise(async (resolve, reject) => {
				const date = new Date();
				const imgId = date.getTime();
				const __loc = `images/${id}-${imgId}.jpg`;

				const storageRef = ref(storage, __loc);

				await uploadString(storageRef, file.file, "data_url")
					.then(async function (res) {
						await getDownloadURL(res.ref).then(async function (url) {
							urls.push(url);
						});
					})
					.catch((error) => {
						console.log(error);

						reject(error);
					});

				resolve(urls);
			});
		})
	);

	return result;
}

export const saveProperties = async (
	{
		propertyName,
		locationName,
		landmark,
		ammenities,
		isPlot,
		story,
		bhk,
		area,
		price,
		lat,
		lon,
		images,
	},
	setUploadingInfo
) => {
	let data = {};

	if (isPlot) {
		data = {
			propertyName,
			landmark,
			locationName,
			plot: true,
			area,
			price,
			ammenities,
			coordinates: {
				lat,
				lon,
			},
		};
	} else {
		data = {
			title: propertyName,
			landmark,
			locationName,
			plot: false,
			story,
			bhk,
			price,
			ammenities,
			coordinates: {
				lat,
				lon,
			},
		};
	}

	const promise = new Promise(async function (resolve, reject) {
		// Creating firestore properties ref
		const propertiesCollectionRef = collection(db, "properties");

		await addDoc(propertiesCollectionRef, {
			...data,
			images: [],
			createdAt: serverTimestamp(),
		})
			.then(async function (value) {
				setUploadingInfo("Property saved successfully");

				if (images.length > 0) {
					setUploadingInfo("Saving images to Storage 🪐");

					await saveImages(value.id, images)
						.then(async function (response) {
							let urls = [];

							response.map(function (url, i) {
								return urls.push(url[i]);
							});

							const property = doc(db, "properties", value.id);
							await updateDoc(property, {
								images: urls,
							})
								.then(function () {
									setUploadingInfo("Images updated successfully 🚀");

									setTimeout(() => {
										setTimeout(() => {
											resolve({ msg: "Successfully Uploaded ✅⛈️", error: "" });
										}, 500);
									}, 500);
								})
								.catch((err) => {
									console.error(err);
									reject({
										msg: "Failed to save images to firestore",
										error: err,
									});
								});
						})
						.catch((err) => {
							console.log(err);

							reject({ msg: "Failed to save images to storage", error: err });
						});
				} else {
					setTimeout(() => {
						resolve({ msg: "Successfully Uploaded ✅⛈️", error: "" });
					}, 500);
				}
			})
			.catch(function (error) {
				console.error(error);
				setUploadingInfo("Failed to save properties.");

				reject({ msg: "Failed to save properties", error });
			});
	});

	return promise;
};

async function checkIfAlreadyExistsThatLocation(titleKey) {
	const promise = new Promise(async function (resolve, reject) {
		const locationsRef = collection(db, "locations");
		const queryLocation = query(
			locationsRef,
			where("titleKey", "==", titleKey)
		);

		await getDocs(queryLocation)
			.then((res) =>
				resolve({
					empty: res.empty,
					data: res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
				})
			)
			.catch((error) => reject({ error }));
	});

	return promise;
}

export const addLocation = async ({ lat, lon }, title) => {
	const promise = new Promise(async function (resolve, reject) {
		await checkIfAlreadyExistsThatLocation(title.toLowerCase()).then(
			async ({ empty, data }) => {
				if (empty) {
					const locationRef = collection(db, "locations");
					await addDoc(locationRef, {
						lat,
						lon,
						title,
						titleKey: title.toLowerCase(),
						addedAt: serverTimestamp(),
						updatedAt: serverTimestamp(),
					})
						.then(function () {
							setTimeout(() => {
								resolve({ error: "", msg: "Location Added" });
							}, 500);
						})
						.catch(function (error) {
							reject({ error, msg: "Failed to add location" });
						});
				} else {
					const confirm = window.confirm(
						"Location already exists\nDo you want to replace with new lat, lon?"
					);
					if (confirm) {
						// Get the doc with the previous location id and update with new [lat, lon] value
						const locationRef = doc(db, "locations", data[0].id);
						await updateDoc(locationRef, {
							lat: lat,
							lon: lon,
							updatedAt: serverTimestamp(),
						})
							.then(function () {
								setTimeout(() => {
									resolve({ error: "", msg: "Location Updated" });
								}, 500);
							})
							.catch(function (error) {
								reject({ error, msg: "Failed to Update location" });
							});
					} else {
						resolve({ error: "", msg: "Location Updated" });
					}
				}
			}
		);
	});

	return promise;
};
