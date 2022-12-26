import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../../../firebase-config";

async function __update(data, id) {
	return new Promise(async function (resolve, reject) {
		const updateDocRef = doc(db, "profiles", id);

		await updateDoc(updateDocRef, data)
			.then(() => resolve({ msg: "Payload Updated" }))
			.catch((error) => reject({ msg: "Failed to update", error }));
	});
}

export const update = async (payload, loading) => {
	await __update(payload.data, payload.id)
		.then((res) => {
			console.log(res);

			loading(false);
		})
		.catch(({ msg, error }) => {
			alert(msg);

			console.error(error);
		});
};

/**
 * Takes filename as string and delete corresponds to that filename
 * @param {string} filename
 * @returns
 */
async function deleteProfileImage(filename) {
	return new Promise(async function (resolve, reject) {
		const storageRef = ref(storage, "/images/profiles/" + filename);

		await deleteObject(storageRef)
			.then(() =>
				resolve({ msg: "Image Deleted Successfully of filename " + filename })
			)
			.catch((error) => reject({ msg: "Failed to delete " + filename, error }));
	});
}

/**
 * Takes id and delete the profile corresponds
 * to that id with its profile image
 * @param {string} id
 * @returns
 */
export const deleteProfile = async (id) => {
	const promise = new Promise(async function (resolve, reject) {
		const profileDocRef = doc(db, "profiles", id);

		await deleteProfileImage(`${id}.jpg`)
			.then(async (res) => {
				await deleteDoc(profileDocRef)
					.then(() =>
						resolve({
							fromStorage: res.msg,
							fromCollection: `Profile Doc of ID ${id} Deleted Successfully 🎉`,
						})
					)
					.catch((error) =>
						reject({ msg: "Failed to delete profile with id " + id, error })
					);
			})
			.catch((error) => reject(error));
	});

	return promise;
};
