import React, { useRef, useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";
import {
	Address,
	Firstname,
	Lastname,
	Middlename,
	Phone,
	Username,
} from "./components";
import { deleteProfile } from "./controller";

const SpaceBetween = () => (
	<>
		<div className="my-2 w-full h-[1px] bg-gray-300"></div>
	</>
);

export default function ViewProfile({ profile, closeModal, setProfiles }) {
	// Profile Image Ref
	const profileImageRef = useRef();

	// const [updating, setUpdating] = useState(false)
	const [deleting, setDeleting] = useState(false);

	const [profileImage, setProfileImage] = useState({
		uri: null,
		file: null,
		title: null,
	});

	/**
	 * @param {*e:Event} e
	 */
	const handleFileChanged = (e) => {
		const file = e.target.files[0];

		if (file) {
			// Ignore if the file size is greater than 5MB
			if (file.size > 5000000) {
				alert("Invalid Image Size");
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
				};
			}
		}
	};

	return (
		<>
			<div className="absolute z-50 left-0 top-0 w-full h-full bg-gray-800/20 flex items-center justify-center overflow-auto">
				<div className="relative w-[750px] min-w-fit h-98 rounded bg-white shadow-2xl">
					{/* Absolute close button */}
					<div
						className="absolute z-10 -top-6 -right-6 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-rose-500 text-lg text-white cursor-pointer"
						onClick={closeModal}>
						<FiX />
					</div>

					<div className="relative w-full h-full rounded bg-transparent flex divide-x overflow-hidden">
						{/* ProfileImage */}
						<section className="relative w-96 h-full">
							<label
								htmlFor="profileImageInput"
								className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-pointer">
								{profileImage.file ? (
									<img
										src={URL.createObjectURL(profileImage.file)}
										alt={profileImage.title ?? ""}
										title={profileImage.title ?? ""}
										className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent object-cover object-center"
									/>
								) : (
									<img
										src={profile.url ?? "images/placeholder.jpg"}
										alt={"Profile"}
										className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent object-cover object-center"
									/>
								)}
							</label>

							{/* File Input */}
							<input
								ref={profileImageRef}
								id="profileImageInput"
								type={"file"}
								accept={"image/*png, image/jpg, image/jpeg"}
								className="hidden"
								onChange={handleFileChanged}
							/>
						</section>

						{/* Details */}
						<section className="w-[calc(100%-24rem)] h-full overflow-auto p-2">
							<div className="w-full h-full grid gap-0">
								<div className="w-full h-auto grid gap-3">
									<Firstname
										firstname={profile.firstname}
										id={profile.id}
									/>

									<Middlename
										middlename={profile.middlename ?? ""}
										id={profile.id}
									/>

									<Lastname
										lastname={profile.lastname}
										id={profile.id}
									/>

									<Username
										username={profile.username}
										id={profile.id}
									/>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-3">
									<Phone
										phone={profile.phone}
										id={profile.id}
									/>

									<Address
										address={profile.address}
										id={profile.id}
									/>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-3">
									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>CreatedAt: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>

									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>UpdatedAt: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full inline-flex gap-4 items-center justify-between text-xs">
									<b>Onboard On: </b>
									<span className="text-opacity-60">
										{" "}
										10:45pm | Thu Dec 20, 2020
									</span>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-3">
									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Lastpaid: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>

									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Payment History: </b>
											<span className="text-blue-600 cursor-pointer">
												Show All History
											</span>
										</div>
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full inline-flex gap-4 items-center justify-between text-xs">
									<b>Properties: </b>
									<span className="text-blue-600 cursor-pointer">
										Show All Properties
									</span>
								</div>

								<SpaceBetween />

								<div className="w-full flex items-center justify-center">
									<button
										type={"submit"}
										onClick={async () => {
											const confirm = window.confirm("Are sure to delete?");

											if (confirm) {
												setDeleting(true);

												await deleteProfile(profile.id)
													.then((res) => {
														setDeleting(false);
														closeModal();

														// Re-fetch profiles from firebase/firestore
														setProfiles();

														alert(`${res.fromStorage}\n${res.fromCollection}`);

														console.log(res);
													})
													.catch((error) => {
														setDeleting(false);
														closeModal();

														alert(error.msg);

														console.error(error);
													});
											} else {
												return;
											}
										}}
										className="relative w-full h-9 mx-auto px-10 outline-none border-none rounded-md bg-[#5d4cc6] hover:bg-[#4d3bc6] duration-200 text-white text-sm flex items-center justify-center">
										{deleting ? (
											<span className="animate-spin duration-300 ease-linear">
												<FiLoader />
											</span>
										) : (
											<span>Delete Profile</span>
										)}
									</button>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}
