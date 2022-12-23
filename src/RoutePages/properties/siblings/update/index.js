/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContainerContext } from "../../../../contexts/Container";
import { UpdateContext } from "./updateContext";
import { formatDate } from "./utils/formatData";

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UpdateProperty() {
	const { setAppTitle } = useContext(ContainerContext);
	const { properties } = useContext(UpdateContext);

	const [propertyId, setPropertyId] = useState(null);

	const query = useQuery();

	useEffect(() => {
		setPropertyId(query.get("id"));

		// Update title
		setAppTitle("Update property");
	}, []);

	return (
		<>
			<div className="relative w-full h-full overflow-hidden bg-transparent">
				<div className="w-full h-10 border-b dark:border-gray-800 px-4 flex items-center justify-between">
					<div className="text-left capitalize text-sm dark:text-gray-300">
						<span>🪐 List of all the Properties</span>
					</div>
				</div>

				<div className="relative w-full h-[calc(100%-2.5rem)] overflow-auto">
					{/* Properties Grid */}
					<div className="relative w-full h-auto grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1">
						{properties.map((property, index) => (
							<Link
								key={property.id ?? index}
								to={"" + property.id}
								className={
									"relative w-full h-auto p-2 flex gap-4 duration-100 ease-in-out cursor-pointer overflow-hidden border-b dark:border-gray-700/60 " +
									(property.plot
										? "dark:bg-indigo-500/10 bg-indigo-500/30 dark:hover:bg-indigo-500/20 hover:bg-indigo-500/40"
										: "dark:bg-gray-800/50 bg-gray-800/5 dark:hover:bg-gray-800/80 hover:bg-gray-800/10")
								}>
								<div className="relative w-32 h-32 rounded-xl dark:bg-gray-800 overflow-hidden flex items-center justify-center">
									<img
										src={property.images[0] ?? ""}
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
													<span>{property.title ?? "Property Name"}</span>

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
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateProperty;
