import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../firebase-config";

const deleteImage = async (filename) => {
	const promise = new Promise(async function (resolve, reject) {
		const storageRef = ref(storage, "images/" + filename);
		await deleteObject(storageRef)
			.then(() => resolve({ msg: "Successfully deleted " + filename }))
			.catch((error) => reject({ msg: "Failed", error }));
	});

	return promise;
};

export const deletePropertyImages = async (id, urls) => {
	const filenames = [];

	for (let i = 0; i < urls.length; i++) {
		const start = urls[i].indexOf(id);
		const end = urls[i].indexOf("?alt");
		const filename = urls[i].slice(start, end);
		filenames.push(filename);
	}

	const promise = new Promise(function (resolve, reject) {
		filenames.forEach(async (file) => {
			await deleteImage(file)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => console.log(error));
		});

		resolve({ msg: "All Images Deleted Successfully ⛈️", error: "" });
	});

	return promise;
};
