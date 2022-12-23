/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";

export default function SearchOverlay({ closeOverlay }) {
	const searchTextFieldRef = useRef();
	const [searchText, setSearchText] = useState("");

	// Listen for ESC command
	const closeOverlayByEsc = ({ keyCode, key }) => {
		if (keyCode == 27 && key === "Escape") {
			closeOverlay();
		} else {
			return;
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", closeOverlayByEsc);

		return () => window.removeEventListener("keydown", closeOverlayByEsc);
	}, []);

	return (
		<>
			<div className="absolute left-0 top-0 w-full h-full z-40 bg-transparent duration-200">
				<div className="relative w-full h-full flex justify-end bg-gray-400/20 duration-200 ease-in-out">
					{/* Absolute box to close overlay */}
					<div
						className="absolute left-0 top-0 w-full h-full bg-transparent z-10"
						onClick={closeOverlay}></div>

					<div className="relative h-full w-80 z-30 border-l bg-white shadow-2xl shadow-gray-900 duration-200 ease-in">
						{/* Top Search Input Field */}
						<div className="relative w-full h-12 overflow-hidden flex items-center">
							<div className="absolute z-20 w-10 left-0 flex items-center justify-center text-gray-700">
								<IoIosSearch size={24} />
							</div>

							<input
								ref={searchTextFieldRef}
								className="relative w-full h-full outline-none bg-transparent border-b border-gray-100 focus:border-gray-300 duration-200 font-robotoUIMedium ease-in px-10 text-sm text-gray-800 placeholder:text-gray-400 placeholder:font-robotoUIRegular"
								placeholder="Search Properties"
								autoFocus
								onKeyUp={(e) =>
									setSearchText(e.nativeEvent.target.value.trim())
								}
							/>

							{/* Clear search field */}
							<div
								className={
									"absolute z-20 w-10 right-0 flex items-center justify-center text-gray-700 duration-200 ease-in-out cursor-pointer " +
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

						{/* Remaining after search field */}
						<div className="relative w-full h-[calc(100%-3rem)] overflow-auto"></div>
					</div>
				</div>
			</div>
		</>
	);
}
