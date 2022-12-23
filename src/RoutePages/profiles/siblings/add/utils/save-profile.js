import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../../../../firebase-config";

/**
 *
 * @param {string} id
 * @param {string} url
 * @returns
 */
export async function updateProfileUrl(id, url) {
	const promise = new Promise(async function (resolve, reject) {
		const profileDoc = doc(db, "profiles", id);

		await updateDoc(profileDoc, {
			url: url,
		})
			.then(() => resolve({ msg: "Profile image updated", error: "" }))
			.catch((error) =>
				reject({
					msg: "Something went wrong, failed to update profile image url",
					error,
				})
			);
	});

	return promise;
}

/**
 *
 * @param {string: base64 image data} uri
 * @param {string} id
 * @returns
 */
async function saveProfileImage(uri, id) {
	const promise = new Promise(async function (resolve, reject) {
		const filename = `${id}.jpg`;
		const storageRef = ref(storage, "/images/profiles/" + filename);

		await uploadString(storageRef, uri, "data_url")
			.then(async ({ ref }) => {
				await getDownloadURL(ref)
					.then((url) => {
						resolve({
							msg: "Profile Data saved successfully ✅",
							url,
							error: "",
							id,
						});
					})
					.catch((error) =>
						reject({ msg: "Failed to download profile image url ⚠️", error })
					);
			})
			.catch((error) =>
				reject({ msg: "Failed to save profile image ⚠️", error })
			);
	});

	return promise;
}

/**
 * Here we get profile data with base64 image data
 *
 * @param {object} payload
 * @param {base64 image data file} profileImage
 * @returns
 */
export const saveProfile = async (payload, profileImage) => {
	const promise = new Promise(async function (resolve, reject) {
		// Firstly creating a firestore collectionRef for profiles
		const profilesCollectionRef = collection(db, "profiles");

		// Add profile doc with unique id which is automatically created by firebase/firestore
		await addDoc(profilesCollectionRef, {
			...payload,
			onboard: [],
			properties: [],
			paymentHistory: [],
			lastpaid: serverTimestamp(),
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		})
			.then(async ({ id }) => {
				if (profileImage) {
					await saveProfileImage(profileImage, id)
						.then((res) => {
							resolve(res);
						})
						.catch((error) => reject(error));
				} else {
					resolve({ msg: "Profile Data saved successfully ✅", error: "" });
				}
			})
			.catch((error) => reject({ msg: "Failed to save profile ⚠️", error }));
	});

	return promise;
};
