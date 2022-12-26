/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TextField } from "./fields";
import { saveProfile, updateProfileUrl } from "./utils/save-profile";
import { ContainerContext } from "../../../../contexts/Container";

function AddBrokerProfile() {
	const {
		setAppTitle,
		fetchProfiles,
		setOpenModal,
		setUploading,
		setUploadingInfo,
	} = useContext(ContainerContext);

	// Profile Image Ref
	const profileImageRef = useRef();

	const [imgErr, setImgErr] = useState(null);
	const [profileImage, setProfileImage] = useState({
		uri: null,
		file: null,
		title: null,
	});

	const [firstname, setFirstname] = useState(null);
	const [middlename, setMiddlename] = useState(null);
	const [lastname, setLastname] = useState(null);
	const [username, setUsername] = useState(null);
	const [address, setAddress] = useState(null);
	const [phone, setPhone] = useState(null);

	/**
	 * Get the text as parameter and capitalize it,
	 * @param {string} t
	 * @returns Capitalized Text : String
	 */
	const capitalize = (t) => {
		const firstLetter = t.charAt(0);
		const remainingLetters = t.slice(1, t.length);

		const capitalizedText =
			firstLetter.toUpperCase() + remainingLetters.toLowerCase();

		return capitalizedText;
	};

	/**
	 *
	 * @param {*e:event} e
	 */
	const handleFileChanged = (e) => {
		const file = e.target.files[0];

		if (file) {
			// Ignore if the file size is greater than 5MB
			if (file.size > 5000000) {
				setImgErr("Invalid Image Size");
			} else {
				// Lets create a reader
				let fileReader = new FileReader();
				fileReader.readAsDataURL(file);

				fileReader.onloadend = (e) => {
					setProfileImage({
						uri: fileReader.result,
						file: file,
						title: file.name,
					});

					setImgErr("");
				};
			}
		} else {
			setImgErr("Image is not selected");
		}
	};

	/**
	 * This is here to clear all field after
	 * successfully uploaded profile data to
	 * firestore
	 */
	const clearAllField = () => {
		setImgErr(null);
		setProfileImage({
			uri: null,
			file: null,
			title: null,
		});
		setFirstname(null);
		setMiddlename(null);
		setLastname(null);
		setUsername(null);
		setPhone(null);
		setAddress(null);
	};

	/**
	 *
	 * @param {e:event} e
	 */
	const createProfile = async (e) => {
		e.preventDefault();

		// Check if the profile image is provided or not
		if (profileImage.file == null) {
			const confirmWithoutProfileImage = window.confirm(
				"Profile image is not provided\nDo you want to continue without it?"
			);

			if (confirmWithoutProfileImage) {
				// One last confirmation before creating profile
				const confirmUpload = window.confirm(
					"Are you sure you want to continue?"
				);

				// Create profile if it is confirmed 👍
				if (confirmUpload) {
					const profileData = {
						firstname,
						lastname,
						middlename,
						username,
						phone,
						address,
						url: "",
					};

					setOpenModal(true);
					setUploading(true);
					setUploadingInfo("Uploading Profile Data 🚀");

					await saveProfile(profileData, profileImage.uri)
						.then(async (res) => {
							setUploadingInfo(res.msg);

							await updateProfileUrl(res.id, res.url)
								.then((response) => {
									setUploadingInfo(response.msg);

									console.log(response);
								})
								.catch((error) => {
									setUploadingInfo(error.msg);

									console.error(error);
								})
								.finally(() => {
									setUploading(false);
									fetchProfiles();
								});

							console.log(res);
						})
						.catch((error) => {
							setUploadingInfo(error.msg);
							setUploading(false);

							console.error(error);
						})
						.finally(() => clearAllField());
				} else {
					return;
				}
			} else {
				profileImageRef.current.click();
			}
		} else {
			// One last confirmation before creating profile
			const confirmUpload = window.confirm(
				"Are you sure you want to continue?"
			);

			// Create profile if it is confirmed 👍
			if (confirmUpload) {
				const profileData = {
					firstname,
					lastname,
					middlename,
					username,
					fullname: `${firstname} ${middlename ?? ""} ${lastname}`,
					phone,
					address,
					url: "",
				};

				setOpenModal(true);
				setUploading(true);
				setUploadingInfo("Uploading Profile Data 🚀");

				await saveProfile(profileData, profileImage.uri)
					.then(async (res) => {
						setUploadingInfo(res.msg);

						await updateProfileUrl(res.id, res.url)
							.then((response) => {
								setUploadingInfo(response.msg);

								console.log(response);
							})
							.catch((error) => {
								setUploadingInfo(error.msg);

								console.error(error);
							})
							.finally(() => {
								setUploading(false);
								fetchProfiles();
							});

						console.log(res);
					})
					.catch((error) => {
						setUploadingInfo(error.msg);
						setUploading(false);

						console.error(error);
					})
					.finally(() => clearAllField());
			} else {
				return;
			}
		}
	};

	// Lets update title
	useEffect(() => {
		setAppTitle("Add Profile");
	}, []);

	return (
		<>
			<form
				onSubmit={createProfile}
				action="#"
				method="POST"
				encType="multipart/form-data"
				className="w-full h-full bg-transparent overflow-auto">
				{/* Profile section */}
				<div className="w-full h-auto p-4 flex items-center justify-center">
					<div className="relative h-auto grid gap-4 justify-items-center">
						<label
							htmlFor="profileImageInput"
							className="relative w-48 h-48 min-w-fit overflow-hidden rounded-full bg-gray-800 duration-100 hover:shadow-2xl hover:bg-gray-700 flex items-center justify-center cursor-pointer">
							{/* Preview Image */}
							{profileImage.file && (
								<div className="absolute z-30 w-full h-full left-0 top-0 bg-gray-800 flex items-center justify-center">
									<img
										src={URL.createObjectURL(profileImage.file)}
										alt={profileImage.title ?? ""}
										title={profileImage.title ?? ""}
										className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full bg-transparent object-cover object-center"
									/>
								</div>
							)}

							<div className="relative h-auto grid gap-4 justify-items-center">
								<div className="text-gray-400 flex items-center justify-center">
									<FiPlus size={35} />
								</div>

								<div className="text-sm text-gray-300">
									<span>Add Profile Image</span>
								</div>
							</div>
						</label>

						{profileImage.file ? (
							<div
								className="relative px-4 h-8 rounded-full cursor-pointer bg-rose-600 text-white text-xs font-robotoUIMedium flex items-center justify-center gap-2"
								onClick={() => {
									setProfileImage({
										uri: null,
										file: null,
										title: "",
									});
								}}>
								<span>Remove</span>
							</div>
						) : (
							<div className="text-xs text-gray-400">
								{imgErr ?? "Size < 5MB"}
							</div>
						)}
					</div>

					{/* File Input */}
					<input
						ref={profileImageRef}
						id="profileImageInput"
						type={"file"}
						accept={"image/*png, image/jpg, image/jpeg"}
						className="hidden"
						onChange={handleFileChanged}
					/>
				</div>

				<div className="relative 2xl:w-9/12 xl:w-9/12 lg:w-9/12 md:w-10/12 w-full h-full mx-auto p-4 mt-4 overflow-auto">
					<div className="relative w-full h-auto grid gap-12">
						<div className="relative w-full flex flex-wrap gap-10">
							{/* Firstname */}
							<TextField
								id={"firstname"}
								label={"Firstname*"}
								value={firstname ?? ""}
								required
								min={3}
								max={25}
								onChange={(evt) => {
									let val = evt.currentTarget.value;
									val = val.trim();
									val = val.replace(/\s\s+/g, " "); // Remove all unnecessory whitespaces
									val = val.replace(/[^a-zA-Z]/g, "");
									val = capitalize(val);

									setFirstname(val);
								}}
							/>

							{/* Middlename */}
							<TextField
								max={15}
								id={"middlename"}
								label={"Middlename"}
								value={middlename ?? ""}
								onChange={(evt) => {
									let val = evt.currentTarget.value;
									val = val.trim();
									val = val.replace(/\s\s+/g, " "); // Remove all unnecessory whitespaces
									val = val.replace(/[^a-zA-Z]/g, "");
									val = capitalize(val);

									setMiddlename(val);
								}}
							/>

							{/* Lastname */}
							<TextField
								min={3}
								max={25}
								required
								id={"lastname"}
								label={"Lastname*"}
								value={lastname ?? ""}
								onChange={(evt) => {
									let val = evt.currentTarget.value;
									val = val.trim();
									val = val.replace(/\s\s+/g, " "); // Remove all unnecessory whitespaces
									val = val.replace(/[^a-zA-Z]/g, "");
									val = capitalize(val);

									setLastname(val);
								}}
							/>
						</div>

						<div className="relative w-full flex flex-wrap gap-10">
							{/* Username */}
							<TextField
								min={3}
								max={25}
								required
								id={"username"}
								label={"Username*"}
								value={username ?? ""}
								onChange={(evt) => {
									let val = evt.currentTarget.value;
									val = val.trim();
									val = val.replace(/\s\s+/g, ""); // Remove all unnecessory whitespaces
									val = val.replace(/[^a-zA-Z0-9.-_-]/g, "");

									setUsername(val);
								}}
							/>

							{/* Address */}
							<TextField
								min={3}
								max={25}
								required
								id={"address"}
								label={"Address*"}
								value={address ?? ""}
								onChange={(evt) => {
									let val = evt.currentTarget.value;
									val = val.replace(/\s\s+/g, " ");
									val = val.replace(/[^a-zA-Z0-9.\s.',']/g, "");

									setAddress(val);
								}}
							/>

							{/* Phone */}
							<div className="h-auto grid gap-2 justify-items-start">
								<label
									htmlFor="phone"
									className="text-xs font-robotoUIMedium">
									<span>{"Phone Number*"}</span>
								</label>

								{/* Input field */}
								<div className="relative w-60 h-9 rounded-lg overflow-hidden bg-gray-200/40">
									{/* Absolute Country code */}
									<div className="absolute z-20 left-0 top-0 h-full w-auto px-2 flex items-center text-xs font-robotoUIMedium text-gray-700">
										<span>{"NP +977"}</span>
									</div>

									<input
										required
										type={"number"}
										id="phone"
										className="relative w-full h-full rounded-lg outline-none text-xs placeholder:text-gray-500 pl-16 pr-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
										placeholder="Phone Number"
										min={9800000000}
										value={phone ?? ""}
										onChange={(evt) => {
											let val = evt.currentTarget.valueAsNumber;

											if (isNaN(val)) {
												val = null;
											} else if (val.toString().length > 10) {
												return;
											}

											setPhone(val);
										}}
									/>
								</div>
							</div>
						</div>

						{/* Submit button */}
						<button
							type={"submit"}
							className="relative w-auto h-10 mx-auto px-10 outline-none border-none rounded-xl bg-[#5d4cc6] hover:bg-[#4d3bc6] duration-200 text-white text-sm flex items-center justify-center">
							<span>Create Profile</span>
						</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default AddBrokerProfile;
