/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { storage } from "./utils/storage";
import { AddContext } from "./addContext";
import {
	Landmark,
	Ammenities,
	IsPlot,
	Story,
	Bhk,
	Price,
	Lat,
	Lon,
	SelectImages,
	Area,
} from "./components";
import { addLocation, saveProperties } from "./utils/firestore";
import { ContainerContext } from "../../../../contexts/Container";
import TextField from "../sharedComponents/textField";

function AddProperties() {
	const {
		setAppTitle,
		setOpenModal,
		setUploading,
		setUploadingInfo,
		setClearStorage: containerClearStorage,
	} = useContext(ContainerContext);

	const { setReload } = useContext(AddContext);

	const formRef = useRef();

	const [clearStorage, setClearStorage] = useState(false);

	// const [propertyName, setPropertyName] = useState("");
	// const [location, setLocation] = useState("");
	// const [landmark, setLandmark] = useState("");
	// const [ammenities, setAmmenities] = useState([]);
	// const [bhk, setBhk] = useState(0);
	// const [story, setStory] = useState(0);
	// const [area, setArea] = useState(undefined);
	// const [price, setPrice] = useState(undefined);
	// const [lat, setLat] = useState(undefined);
	// const [lon, setLon] = useState(undefined);
	// const [isPlot, setIsPlot] = useState(true);
	const [images, setImages] = useState([]);

	// Default values for debugging
	const [propertyName, setPropertyName] = useState("Mero Sano Ghar");
	const [location, setLocation] = useState("Damak");
	const [landmark, setLandmark] = useState("Near subba chowk");
	const [ammenities, setAmmenities] = useState(["damak", "sano-ghar"]);
	const [bhk, setBhk] = useState(5);
	const [area, setArea] = useState(1200.0);
	const [story, setStory] = useState(3);
	const [price, setPrice] = useState(7500000);
	const [lat, setLat] = useState(26.8738343);
	const [lon, setLon] = useState(87.242342324);
	const [isPlot, setIsPlot] = useState(false);

	const validateForm = () => {
		let isValid = false;

		// Check if the ammenities is provided or not,
		// If not then focus the user to the ammenities input field
		if (ammenities.length <= 0) {
			const ammenitiesField = document.getElementById("ammenities");

			alert("Ammenities should not be empty 😐🤨");

			ammenitiesField.focus();
		}
		// Check if the images is provided or not
		else if (images.length <= 0) {
			const confirmed = window.confirm(
				"You haven't selected any images. \n Do you want to continue ?"
			);

			// If the user confirmed to go without images then
			if (confirmed) {
				isValid = true;
			} else {
				isValid = false;
				// Otherwise suggest to select images
				const fileInputField = document.getElementById("fileInputField");

				fileInputField.click();
			}
		} else {
			isValid = true;
		}

		return isValid;
	};

	const uploadFormData = async (e) => {
		e.preventDefault();

		const isValid = validateForm();

		if (isValid) {
			// One last confirmation before submitting to firestore
			const confirmed = window.confirm("Are you sure you want to continue ?");

			if (confirmed) {
				const data = {
					propertyName,
					locationName: location,
					landmark,
					ammenities,
					bhk,
					story,
					area,
					price,
					lat,
					lon,
					isPlot,
					images,
				};

				setOpenModal(true);
				setUploading(true);

				await saveProperties(data, setUploadingInfo)
					.then(async function (res) {
						setUploadingInfo(res.msg);

						const confirmAddLocation = window.confirm(
							"Do you want to add it to locations?"
						);

						if (confirmAddLocation) {
							await addLocation({ lat, lon }, location)
								.then((data) => {
									console.log(data);

									setUploadingInfo(data.msg);
								})
								.catch((error) => console.log(error))
								.finally(() => containerClearStorage(true));
						} else {
						}
					})
					.catch((error) => console.log(error))
					.finally(() => {
						setUploading(false);
					});
			} else {
				return;
			}
		}
	};

	const restore = () => {
		const datas = {
			propertyName: storage.get("propertyName") ?? propertyName,
			location: storage.get("location") ?? location,
			landmark: storage.get("landmark") ?? landmark,
			ammenities: storage.get("ammenities") ?? ammenities,
			bhk: storage.get("bhk") ?? bhk,
			story: storage.get("story") ?? story,
			area: storage.get("area") ?? area,
			price: storage.get("price") ?? price,
			lat: storage.get("lat") ?? lat,
			lon: storage.get("lon") ?? lon,
			isPlot: storage.get("isPlot") == null ? isPlot : storage.get("isPlot"),
		};

		setPropertyName(datas.propertyName);
		setLocation(datas.location);
		setLandmark(datas.landmark);
		setAmmenities(datas.ammenities);
		setBhk(datas.bhk);
		setStory(datas.story);
		setArea(datas.area);
		setPrice(datas.price);
		setLat(datas.lat);
		setLon(datas.lon);
		setIsPlot(datas.isPlot);
	};

	useEffect(() => {
		// Restore values at first run
		restore();

		setAppTitle("Add Property");

		return () => {
			setAppTitle("Dashboard");
		};
	}, []);

	// Show clear localstorage if any of the value changes
	useEffect(() => {
		const isAdded = storage.get("black-steller");
		const storageLen = localStorage.length > 1 ? true : false;

		if (isAdded != null && storageLen) {
			setClearStorage(true);
		} else {
			setClearStorage(false);
		}

		return () => setClearStorage(false);
	}, [
		propertyName,
		location,
		landmark,
		ammenities,
		bhk,
		story,
		area,
		price,
		lat,
		lon,
		images,
		isPlot,
	]);

	return (
		<>
			<div className="w-full h-full overflow-hidden bg-transparent">
				<div className="w-full h-10 border-b dark:border-gray-800 px-4 flex items-center justify-between">
					<div className="text-left capitalize text-sm dark:text-gray-300">
						<span>➕ Add Your Properties</span>
					</div>

					{clearStorage && (
						<div
							className="text-xs text-blue-400 px-2 py-1 rounded-lg dark:hover:bg-gray-800/50 hover:bg-gray-100 cursor-pointer duration-100"
							onClick={() => {
								// Check if the images is added or not,
								// If, then confirm reload otherwise images will have to select again
								if (images.length <= 0) {
									const confirmed = window.confirm(
										"Are you sure you want to reload? 🥲"
									);

									if (confirmed) {
										localStorage.clear();

										setReload(true);
									} else {
										return;
									}
								} else {
									const confirmed = window.confirm(
										"Selected images will get lost and have to select again. \n Are you sure you want to reload? 🤔"
									);

									if (confirmed) {
										localStorage.clear();

										setReload(true);
									} else {
										return;
									}
								}
							}}>
							<span>Clear Storage ⚠️</span>
						</div>
					)}
				</div>

				<div className="relative w-full h-[calc(100%-40px)]">
					{/* Form for the property details */}
					<form
						ref={formRef}
						action=""
						method="POST"
						encType="multipart/form-data"
						className="relative w-full h-full flex justify-center"
						onSubmit={(event) => uploadFormData(event)}>
						<div className="relative w-full h-full p-4 pb-14 overflow-auto">
							<div className="relative w-full h-auto grid gap-5">
								<div className="relative flex items-center gap-5 flex-wrap">
									{/* Name of the property */}
									<TextField
										id={"propertyName"}
										title={"Name of the Property ( < 50 )"}
										setVal={(val) => {
											setPropertyName(val);

											// Remove all spaces and replace spaces to '-'
											let tag = val.toLowerCase().replace(/\s\s+/g, " ");
											tag = tag.replace(/\s/g, "-");
											ammenities[0] = tag;
											setAmmenities([...ammenities]);

											storage.set("propertyName", val);
										}}
										defaultValue={propertyName}
										required
										minLength={3}
										maxLength={50}
									/>

									{/* Location of the property where it is located */}
									<TextField
										id={"location"}
										title={"Name of the Location"}
										setVal={(val) => {
											setLocation(val);

											// Remove all spaces and replace spaces to '-'
											let tag = val.toLowerCase().replace(/\s\s+/g, " ");
											tag = tag.replace(/\s/g, "-");
											ammenities[1] = tag;
											setAmmenities([...ammenities]);

											storage.set("location", val);
										}}
										defaultValue={location}
										minLength={3}
										maxLength={20}
										required
									/>
								</div>

								<div className="relative flex items-start gap-5 flex-wrap">
									{/* Landmark or the info of the property */}
									<Landmark
										setLandmark={(val) => {
											setLandmark(val);

											storage.set("landmark", val);
										}}
										defaultValue={landmark}
									/>

									{/* Set if the property is plot or a house false:house && viceversa */}
									<IsPlot
										isPlot={isPlot}
										updatePlot={(plot) => {
											setIsPlot(plot);

											storage.set("isPlot", plot);
										}}
									/>
								</div>

								{/* Ammenities */}
								<div className="h-auto grid gap-2 justify-items-start">
									<label
										htmlFor="ammenities"
										className="text-xs font-robotoUIMedium">
										<span>{"Ammenities or Tags"}</span>
									</label>

									{/* Ammenities */}
									<div className="relative w-1/2 flex gap-2 flex-wrap">
										{ammenities.map((a, id) => (
											<div
												key={id}
												className="relative px-2 py-1 rounded cursor-pointer text-xs dark:bg-gray-800/40 bg-gray-200 dark:text-gray-400 hover:shadow-2xl"
												onClick={() => {
													// Remove that ammenities
													ammenities.splice(id, 1);
													setAmmenities([...ammenities]);
												}}>
												{a ?? ""}
											</div>
										))}
									</div>

									{/* Input field for ammenities or the search tags for properties */}
									<Ammenities
										ammenities={ammenities}
										setAmmenities={(val) => {
											if (ammenities.length < 10) {
												ammenities.push(val);
												setAmmenities([...ammenities]);

												storage.set("ammenities", ammenities);
											}
										}}
									/>
								</div>

								<div className="relative flex items-center gap-5 flex-wrap">
									{isPlot ? (
										<>
											{/* Area of the field */}
											<Area
												setArea={(val) => {
													setArea(val);

													storage.set("area", val);
												}}
												area={area}
											/>
										</>
									) : (
										<>
											{/* Input field for bhk */}
											<Bhk
												setBhk={(val) => {
													setBhk(val);

													storage.set("bhk", val);
												}}
												bhk={bhk}
											/>

											{/* Input field for story */}
											<Story
												setStory={(val) => {
													setStory(val);

													storage.set("story", val);
												}}
												story={story}
											/>
										</>
									)}

									{/* Input field for price */}
									<Price
										setPrice={(val) => {
											setPrice(val);

											storage.set("price", val);
										}}
										price={price}
									/>

									{/* Input field for latitude */}
									<Lat
										setLat={(val) => {
											setLat(val);

											storage.set("lat", val);
										}}
										lat={lat}
									/>

									{/* Input filed for longitude */}
									<Lon
										setLon={(val) => {
											setLon(val);

											storage.set("lon", val);
										}}
										lon={lon}
									/>
								</div>

								{/* Add Images */}
								<div className="h-auto grid gap-2 justify-items-start">
									<div className="text-xs inline-flex gap-2 dark:text-gray-300">
										<span>{"Property Images "}</span>
										<span className="dark:text-white">
											<span className="text-gray-500">{"("}</span>
											<b>{" Note :"}</b>
										</span>
										<span className="text-gray-500">
											{"Image Size should be < 5MB and <= 10 images )"}
										</span>

										<span className="dark:text-red-300 text-red-400 uppercase">
											Don't refresh the page ⚠️
										</span>

										{/* Clear all selected images */}
										{images.length > 0 && (
											<div
												className="text-blue-400 font-robotoUIMedium cursor-pointer"
												onClick={() => setImages([])}>
												Clear All
											</div>
										)}
									</div>

									<div className="relative w-auto h-auto flex flex-wrap gap-2">
										{images.map((file, index) => (
											<div
												key={index}
												className="relative w-40 h-40 overflow-hidden rounded-xl bg-transparent hover:bg-gray-700/5 hover:shadow-2xl duration-200 ease-linear group flex items-center justify-center">
												{/* Absolute cross icon */}
												<div className="absolute z-30 top-0 right-0 w-12 h-12 bg-transparent flex items-center justify-center cursor-pointer invisible group-hover:visible duration-200">
													<div
														className="relative flex items-center justify-center w-6 h-6 rounded-full bg-transparent group-hover:bg-gray-800 duration-100 ease-linear text-gray-400 scale-0 group-hover:scale-100"
														onClick={() => {
															images.splice(index, 1);

															setImages([...images]);
														}}>
														<FiX size={15} />
													</div>
												</div>

												<img
													src={URL.createObjectURL(file.blob)}
													alt={file.name ?? "Property Images"}
													title={file.name ?? "Property Images"}
													className="relative w-full h-full flex items-center bg-transparent rounded-xl object-cover object-center cursor-pointer group-hover:opacity-50 duration-200"
												/>

												{/* Absolute file size */}
												<div className="absolute z-40 bottom-2 px-2 py-1 rounded-lg bg-gray-700 text-[10px] text-gray-200">
													{file.labeledSize ?? ""}
												</div>
											</div>
										))}
									</div>
								</div>

								{images.length < 10 ? (
									<SelectImages
										images={images}
										setImages={(payload) => setImages([...payload])}
									/>
								) : null}
							</div>
						</div>

						{/* Finally Submit button */}
						<div className="absolute z-40 left-0 bottom-0 w-full h-auto bg-gray-800/50 backdrop-blur-3xl flex flex-wrap">
							<button
								type={"submit"}
								id="submitForm"
								className="relative outline-none border-none bg-blue-500 w-full px-6 h-10 flex items-center justify-center font-robotoUIMedium text-sm text-gray-200 duration-100 hover:text-white hover:bg-blue-600">
								<span>Submit Data</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default AddProperties;
