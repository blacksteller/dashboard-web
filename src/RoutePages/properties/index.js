/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiEdit, FiTrash } from "react-icons/fi";
import { IoBonfireOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { LocationsContext } from "../locations/locationsContext";
import SearchOverlay from "./searchOverlay";
import { deletePropertyImages } from "./shared-utils/deletePropertyImages";
import { ContainerContext } from "../../contexts/Container";
import { PropertiesContext } from "./propertiesContext";

export default function PropertiesPage() {
	const [openSearchOverlay, setOpenSearchOverlay] = useState(false);

	const { properties, fetchProperties, setAppTitle } =
		useContext(ContainerContext);
	const { showPlot, setShowPlot } = useContext(PropertiesContext);
	const { locationData } = useContext(LocationsContext);
	const { current, locations, setLocation } = locationData;

	let [only8Locations, setOnly8Locations] = useState([]);
	let [after8Locations, setAfter8Locations] = useState([]);
	let [dropDownOne, setDropDownOne] = useState(null);

	/**
	 *
	 * @param {string:key} id
	 * @param {array} urls
	 * @returns
	 */
	const deleteProperty = async (id, urls) => {
		const confirmDeletion = window.confirm(
			"It will be deleted permanently\nAre you sure to delete?"
		);

		if (confirmDeletion) {
			await deletePropertyImages(id, urls)
				.then(async (res) => {
					console.log(res);

					const deletePropertyRef = doc(db, "properties", id);
					await deleteDoc(deletePropertyRef)
						.then(() => {
							alert("Property Deleted Successfully");
							fetchProperties();
						})
						.catch((error) => console.error(error));
				})
				.catch((error) => {
					alert("Failed to delete images from storage");

					console.error(error);
				});
		} else {
			return;
		}
	};

	useEffect(() => {
		let _only = [];
		let _after = [];
		locations.forEach(function (_loc, i) {
			if (i > 5) {
				_after.push(_loc);
			} else {
				_only.push(_loc);
			}
		});

		setAppTitle("Properties");
		setOnly8Locations([..._only]);
		setAfter8Locations([..._after]);

		return () => null;
	}, []);

	return (
		<>
			<div className="relative w-full h-full overflow-hidden">
				{/* Absolute search box container */}
				{openSearchOverlay && (
					<SearchOverlay closeOverlay={() => setOpenSearchOverlay(false)} />
				)}

				{/* Top AppBar with Min Height 48px */}
				<div className="w-full h-12 min-h-[3rem]">
					<div className="w-full h-full flex">
						<div className="w-full h-full px-4 shadow">
							<div className="w-full h-full flex items-center justify-between">
								<div className="relative p-1 rounded-full bg-gray-100 flex items-center gap-4">
									<div className="flex items-center gap-0 font-robotoUIMedium text-xs uppercase">
										<div
											className={
												"px-3 py-1 rounded-full cursor-pointer duration-200 ease-linear " +
												(showPlot
													? "bg-gray-200 text-gray-800"
													: "bg-transparent text-gray-500")
											}
											onClick={() => setShowPlot(true)}>
											Plot
										</div>

										<div
											className={
												"px-3 py-1 rounded-full cursor-pointer duration-200 ease-linear " +
												(showPlot
													? "bg-transparent text-gray-500"
													: "bg-gray-200 text-gray-800")
											}
											onClick={() => setShowPlot(false)}>
											Houses
										</div>
									</div>

									<div className="relative rounded-full w-auto min-w-[1.5rem] px-2 h-6 text-xs bg-gray-200 flex items-center justify-center overflow-hidden">
										<span className="font-robotoUIBold text-blue-500">
											{properties.length ?? 0}
										</span>
									</div>
								</div>

								{/* Locations Map */}
								<div className="relative p-1 rounded-full bg-gray-100 flex items-center gap-1">
									<div
										onClick={() => setLocation("Show All")}
										className={
											"text-xs duration-200 ease-linear px-3 py-1 rounded-full cursor-pointer " +
											(current == "Show All"
												? "text-blue-400 font-robotoUIMedium bg-gray-200"
												: "text-gray-700 hover:text-blue-400")
										}>
										{"Show All"}
									</div>

									{only8Locations.length > 0
										? only8Locations.map((loc, id) => (
												<div
													key={id}
													onClick={() => setLocation(loc.title ?? "All")}
													className={
														"text-xs duration-200 ease-linear px-3 py-1 rounded-full cursor-pointer " +
														(loc.titleKey.indexOf(current.toLowerCase()) > -1
															? "text-blue-400 font-robotoUIMedium bg-gray-200"
															: "text-gray-700 hover:text-blue-400")
													}>
													{loc.title ?? ""}
												</div>
										  ))
										: locations.map((loc, id) => (
												<div
													key={id}
													className={
														"text-xs duration-200 ease-linear px-3 py-1 rounded-full cursor-pointer " +
														(loc.titleKey.indexOf(current.toLowerCase()) > -1
															? "text-blue-400 font-robotoUIMedium bg-gray-200"
															: "text-gray-700 hover:text-blue-400")
													}
													onClick={() => setLocation(loc.title)}>
													{loc.title ?? ""}
												</div>
										  ))}

									{after8Locations.length > 0 && (
										<div className="relative w-auto h-auto flex items-center justify-center group">
											<div
												className={
													"relative w-auto h-auto text-xs duration-200 ease-linear pl-3 pr-1 py-1 rounded-full cursor-pointer flex items-center justify-center gap-2 " +
													(dropDownOne
														? dropDownOne
																.toLowerCase()
																.indexOf(current.toLowerCase()) > -1
															? "text-blue-400 font-robotoUIMedium bg-gray-200"
															: "text-gray-800 hover:text-blue-400"
														: "text-gray-800 hover:text-blue-400")
												}>
												<span>{dropDownOne ?? "More"}</span>

												<div className="relative">
													<div className="w-auto h-auto flex items-center justify-center duration-200 text-gray-600">
														<FiChevronDown size={16} />
													</div>
												</div>
											</div>

											{/* Show a dropdown menu when the locations length is more than|equalTo 8 */}
											{/* Absolute DropDown Menu */}
											<div className="absolute left-0 top-6 z-50 w-auto h-auto hidden group-hover:grid gap-1 p-1 rounded-xl bg-gray-100 duration-200">
												{after8Locations.map((loc, id) => (
													<div
														key={id}
														className={
															"text-xs duration-200 ease-linear px-3 py-1 rounded-lg cursor-pointer " +
															(loc.titleKey.indexOf(current.toLowerCase()) > -1
																? "text-blue-400 font-robotoUIMedium bg-gray-200"
																: "text-gray-700 hover:text-blue-400")
														}
														onClick={() => {
															setLocation(loc.title);
															setDropDownOne(loc.title);
														}}>
														{loc.title ?? ""}
													</div>
												))}
											</div>
										</div>
									)}
								</div>

								<div
									className="relative w-auto h-auto px-3 py-1 rounded-full dark-light-bg-normal border dark-border-normal flex items-center justify-center gap-3 duration-200 ease-in-out text-gray-700 text-xs cursor-pointer"
									onClick={() => setOpenSearchOverlay(true)}>
									<IoIosSearch
										size={20}
										strokeWidth={2}
									/>

									<span>Search</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* All the properties lists */}
				<div className="relative w-full h-[calc(100%-3rem)] bg-transparent overflow-auto">
					{properties.length > 0 ? (
						<>
							{/* Properties Grid */}
							<div className="relative w-full h-auto grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1">
								{properties.map((property, index) => (
									<div
										key={property.id ?? index}
										className={
											"relative w-full h-auto p-2 flex gap-4 duration-100 ease-in-out cursor-pointer overflow-hidden border-b dark:border-gray-700/60 group " +
											(property.plot
												? "bg-indigo-500/30 hover:bg-indigo-500/40"
												: "bg-gray-800/5 hover:bg-gray-800/10")
										}>
										{/* Absolute options */}
										<div className="absolute z-30 right-0 top-0 h-auto w-auto overflow-hidden rounded-bl-xl shadow-2xl border bg-white flex gap-0 divide-x duration-200 ease-linear opacity-0 invisible group-hover:visible group-hover:opacity-100">
											<Link
												to={"update/" + property.id}
												className="relative px-4 py-2 flex items-center justify-start gap-4 duration-50 hover:bg-gray-50">
												<div className="relative w-auto h-auto flex items-center justify-center text-indigo-600">
													<FiEdit size={20} />
												</div>

												<div className="text-xs font-robotoUIMedium">
													<span>Edit</span>
												</div>
											</Link>

											<div
												className="relative px-4 py-2 flex items-center justify-start gap-4 duration-100 hover:bg-gray-50"
												onClick={() =>
													deleteProperty(property.id, property.images)
												}>
												<div className="w-auto h-auto flex items-center justify-center text-indigo-600">
													<FiTrash size={20} />
												</div>

												<div className="text-xs font-robotoUIMedium">
													<span>Delete</span>
												</div>
											</div>
										</div>

										<div className="relative w-32 h-32 rounded-xl dark:bg-gray-800 overflow-hidden flex items-center justify-center">
											<img
												src={property.images[0] ?? "/images/placeholder.jpg"}
												alt=""
												className="relative w-full h-full rounded-xl object-cover object-center brightness-75 overflow-hidden bg-gray-50 flex items-center justify-center"
											/>

											{/* Absolute property images count */}
											{property.images.length > 1 && (
												<div className="absolute z-10 bottom-2 px-2 py-1 rounded-lg bg-gray-700/50 backdrop-blur-2xl text-[10px] text-gray-200">
													<span>+ {property.images.length - 1}</span>
													{/* {file.labeledSize ?? ""} */}
												</div>
											)}
										</div>

										<div className="relative w-[calc(100%-8rem)] h-full">
											<div className="relative h-auto grid gap-2 justify-items-start">
												<div className="relative w-full h-auto grid gap-0">
													<div className="relative w-full flex items-center justify-between">
														<div className="text-base dark:text-white inline-flex gap-2">
															<span>
																{property.propertyName ?? "Property Name"}
															</span>

															<div className="relative rounded w-5 h-5 dark:bg-gray-800 bg-gray-200 text-xs flex items-center justify-center">
																{property.plot ? "🅿️" : "🏠"}
															</div>
														</div>

														<div className="text-xs font-robotoUIMedium">
															<span>
																{/* {formatDate(
															property.createdAt.seconds,
															property.createdAt.nanoseconds
														)} */}
															</span>
														</div>
													</div>

													<div className="relative flex items-center gap-4">
														<div className="text-xs dark:text-white/80">
															<span>📌 {property.locationName ?? ""}</span>
														</div>

														<div className="relative px-2 h-6 flex items-center justify-center gap-2 divide-x-2 dark:divide-gray-700 divide-gray-300 dark:bg-gray-800 bg-gray-200 rounded-full">
															<div className="text-xs dark:text-white/80">
																<span>{property.coordinates.lat ?? ""}</span>
															</div>

															<div className="text-xs dark:text-white/80 pl-2">
																<span>{property.coordinates.lon ?? ""}</span>
															</div>
														</div>
													</div>
												</div>

												<div className="text-xs dark:text-white/80">
													<span>🗺️ {property.landmark ?? ""}</span>
												</div>

												<div className="relative w-full flex gap-2 flex-wrap">
													{property.ammenities.map((ammenity, index) => (
														<div
															key={index}
															className="relative px-2 h-5 rounded-full cursor-pointer text-xs dark:bg-gray-800 dark:text-gray-400 bg-gray-200 hover:shadow-2xl flex items-center justify-center">
															<span>{ammenity ?? ""}</span>
														</div>
													))}
												</div>

												<div className="relative w-full flex gap-2 flex-wrap">
													<div className="relative text-xs dark:text-white">
														<span>{property.bhk} BHK , </span>
													</div>

													<div className="relative text-xs dark:text-white">
														<span>{property.story} Story , </span>
													</div>

													<div className="relative text-xs dark:text-white">
														<span>Rs. {property.price}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							<div className="relative w-full h-full flex items-center justify-center">
								<div className="h-auto grid gap-6 justify-items-center">
									<div className="relative w-auto h-auto flex items-center justify-center text-violet-700">
										<IoBonfireOutline size={100} />
									</div>

									<div className="text-sm font-robotoUIMedium">
										<span>You don't have any properties</span>
									</div>

									<Link
										to={"add"}
										className="relative text-sm text-white font-medium uppercase px-4 py-2 rounded-full duration-200 ease-linear transition-all bg-gradient-to-l from-violet-500 to-violet-700 hover:bg-gradient-to-r">
										<span>Add New Property</span>
									</Link>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
