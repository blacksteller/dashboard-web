/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
	IoIosBasketball,
	IoIosCloseCircle,
	IoIosSearch,
	IoIosSync,
} from "react-icons/io";
import { ContainerContext } from "../../contexts/Container";
import { LocationsContext } from "./locationsContext";
import AddLocationModal from "./siblings/add";

export default function LocationsPage() {
	const {
		locationData: { count, locations },
		fetchLocations,
		updateLocations,
		deleteLocationsIfNotExists,
		checking,
		setChecking,
	} = useContext(LocationsContext);

	const { setAppTitle } = useContext(ContainerContext);

	const [tempLists, setTempLists] = useState([]);

	const searchTextFieldRef = useRef();
	const [searchText, setSearchText] = useState("");

	// Siblings operations
	const [showAddModal, setShowAddModal] = useState(false);

	/**
	 *
	 * @param {*int} id
	 * @param {*string} key
	 * @returns
	 */
	const deleteLocation = async (id, key) => {
		const confirmed = window.confirm(
			"Are you sure, you want to delete this location?"
		);

		if (confirmed) {
			tempLists.splice(id, 1);
			setTempLists([...tempLists]);
		} else {
			return;
		}
	};

	useEffect(() => {
		setAppTitle("Locations");
		fetchLocations();
	}, []);

	useEffect(() => {
		setTempLists([...locations]);
	}, [locations]);

	useEffect(() => {
		if (searchText.length > 0) {
			try {
				const filteredLists = tempLists
					.filter(
						(l) => l.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
					)
					.reverse();

				setTempLists([...filteredLists]);
			} catch (error) {
				console.log(error);
			}
		} else {
			setTempLists([...locations]);
		}
	}, [searchText]);

	return (
		<>
			{/* Modals */}
			{showAddModal && (
				<AddLocationModal closeModal={() => setShowAddModal(false)} />
			)}

			<div className="w-full h-12 flex items-center justify-between gap-10 px-4 border-b border-gray-100 dark:border-gray-700">
				<div className="relative p-1 rounded-full text-sm flex items-center gap-4">
					<div className=" dark:text-gray-400 text-gray-700 ml-1">
						List Of All Locations
					</div>

					{/* Total */}
					<div className="relative rounded-full w-auto min-w-[1.5rem] px-1 h-6 text-xs dark:bg-gray-700 bg-gray-200 flex items-center justify-center overflow-hidden">
						<span className="font-robotoUIBold text-blue-500">
							{count ?? 0}
						</span>
					</div>
				</div>

				<div className="relative h-12 w-80 flex items-center">
					{/* Absolute search icon */}
					<div className="absolute z-20 w-auto left-0 flex items-center justify-center dark:text-gray-400 text-gray-700">
						<IoIosSearch size={24} />
					</div>

					<input
						ref={searchTextFieldRef}
						className="relative w-full h-full px-10 py-1 outline-none bg-transparent font-robotoUIMedium placeholder:font-robotoUIRegular text-xs dark:text-gray-200 text-gray-700 duration-200 ease-linear border-b border-gray-100 dark:border-gray-700 focus:dark:border-gray-500 focus:border-gray-300 placeholder:text-gray-500"
						placeholder="Search Locations"
						onKeyUp={(e) => setSearchText(e.nativeEvent.target.value.trim())}
					/>

					{/* Clear search field */}
					<div
						className={
							"absolute z-20 w-auto right-0 flex items-center justify-center dark:text-gray-400 text-gray-700 duration-200 ease-in-out cursor-pointer " +
							(searchText.length > 0
								? "visible opacity-100 scale-100"
								: "scale-0 invisible opacity-0")
						}
						onClick={() => {
							searchTextFieldRef.current.value = "";
							setSearchText("");

							searchTextFieldRef.current.focus();
						}}>
						<IoIosCloseCircle size={22} />
					</div>
				</div>

				<div className="relative"></div>
				<div className="relative"></div>
			</div>

			{/* Info bar */}
			<div className="h-10 flex items-center justify-center gap-4 border-b border-gray-100 dark:border-gray-800">
				<div className="text-xs text-gray-400 font-robotoUIMedium">
					<span>
						All the locations are automatically added when you add properties.
					</span>
				</div>

				{count > 0 && (
					<>
						<div
							onClick={async () => {
								await updateLocations()
									.then(async (ids) => {
										await deleteLocationsIfNotExists(ids)
											.then(async (res) => {
												await fetchLocations();

												console.log(res);
											})
											.catch((error) => console.log(error))
											.finally(() => setChecking(false));
									})
									.catch((error) => console.error(error));
							}}
							className="relative px-3 py-1 rounded-full bg-indigo-600 text-white text-sm cursor-pointer inline-flex gap-2 items-center"
							title="This is required when you deleted the property and it may not exists that location anymore.">
							Re-update Locations{" "}
							{checking ? (
								<span className="ease-linear transition-all animate-spin">
									<IoIosSync size={18} />
								</span>
							) : (
								"🚀"
							)}
						</div>
					</>
				)}
			</div>

			<div className="w-full h-[calc(100%-5.5rem)] overflow-auto">
				{count > 0 ? (
					<>
						<div className="relative w-full h-auto grid flex-wrap justify-start row-auto 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 grid-cols-3">
							{tempLists.map((loc, id) => (
								<div
									key={id}
									className="relative w-full h-48 p-4 overflow-hidden">
									<div className="relative w-full h-full rounded-2xl overflow-hidden dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700/20 hover:bg-gray-200 duration-200 ease-in cursor-pointer dark:hover:shadow-2xl p-4 group">
										<div className="h-auto font-robotoUIBold text-xl dark:text-gray-200 text-gray-700 overflow-clip text-ellipsis">
											{loc.title ?? ""}
										</div>

										{/* Absolute */}
										<div className="absolute z-20 w-full left-0 -bottom-4 h-9 overflow-hidden flex bg-gray-800 border-t border-gray-700 divide-x divide-gray-700 invisible opacity-0 duration-200 ease-linear">
											{/* group-hover:opacity-100 group-hover:bottom-0 group-hover:visible */}
											<div
												className="relative w-full h-full flex items-center justify-center text-rose-500 text-sm hover:bg-gray-700/50 duration-200 cursor-pointer"
												onClick={() => deleteLocation(id)}>
												<span>Remove</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				) : (
					<>
						<div className="relative w-full h-full flex items-center justify-center p-10">
							<div className="h-auto grid gap-6 justify-items-center">
								<div className="w-auto h-auto flex items-center justify-center text-orange-500">
									<IoIosBasketball size={150} />
								</div>

								<div className="text-sm font-robotoUIMedium">
									<span>Locations are empty</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
