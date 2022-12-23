import React, { useRef } from "react";
import { FiFilePlus } from "react-icons/fi";

export default function SelectImages({ images, setImages }) {
	const fileInputRef = useRef();

	// Listens to the file changed event
	const handleFileChange = async (evt) => {
		const files = evt.target.files;
		const len = files.length;

		let __images = [...images];

		for (let i = 0; i < len; i++) {
			const file = await files[i];
			const name = file.name;
			let size = file.size;
			let labeledSize = "MB";
			const imgFile = {};

			// Skip files which are larger then 5MB
			if (size <= 5000000) {
				if (__images.length >= 10) {
					break;
				} else {
					const reader = new FileReader();
					reader.readAsDataURL(file);

					reader.onloadend = function (e) {
						imgFile.file = reader.result;
					};

					if (size <= 5000000) {
						size = (size / 1000000).toFixed(2);
						labeledSize = `${size} MB`;
					} else {
						size = size / 1000;
						labeledSize = `${size} KB`;
					}
				}
			} else {
				alert("Invalid size, too large");

				continue;
			}

			imgFile.blob = file;
			imgFile.name = name;
			imgFile.labeledSize = labeledSize;

			__images.push(imgFile);
		}

		setImages(__images);
	};

	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<div
					className="relative w-40 h-40 overflow-hidden rounded-xl border-2 border-dashed dark:border-gray-800 bg-transparent dark:hover:bg-gray-700/5 hover:bg-gray-700/10 hover:shadow-2xl duration-200 ease-linear"
					onClick={() => {}}>
					<label
						htmlFor="fileInputField"
						className="relative w-full h-full flex items-center justify-center dark:text-gray-600 cursor-pointer">
						<FiFilePlus size={40} />
					</label>
				</div>

				{/* Hidden file input */}
				<input
					type={"file"}
					id="fileInputField"
					name="fileInput"
					ref={fileInputRef}
					accept="image/png, image/jpg, image/jpeg"
					multiple
					className="relative hidden"
					onChange={handleFileChange}
				/>
			</div>
		</>
	);
}
