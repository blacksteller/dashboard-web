import React, { useState } from "react";

export default function AddLocationModal({ closeModal }) {
	const [location, setLocation] = useState(null);

	return (
		<>
			<div className="absolute z-40 left-0 top-0 w-full h-full duration-200 ease-linear bg-gray-800/60 flex items-center justify-center">
				{/* Absolute div to close modal */}
				<div
					className="absolute z-10 w-full h-full left-0 top-0 bg-transparent"
					onClick={closeModal}></div>

				<div className="relative z-20 w-[500px] h-auto rounded-3xl min-w-fit bg-gray-900 border border-gray-800">
					<div className="w-full flex items-center justify-center p-2">
						<div className="w-9/12 h-8 px-4 rounded-lg bg-gray-700/10 flex items-center justify-center">
							<div className="text-xs text-gray-400 text-center uppercase font-robotoUIMedium tracking-wide">
								<span>Add Location which is in your properties lists</span>
							</div>
						</div>
					</div>

					{/* Form */}
					<form
						action="#"
						method="POST"
						onSubmit={(e) => e.preventDefault()}
						className="relative w-full h-auto p-6 grid gap-10 justify-items-center">
						<div className="w-full h-auto grid gap-2 justify-items-center">
							<label
								htmlFor="location"
								className="text-xs text-gray-300">
								<span>{"Name of the Location"}</span>
							</label>

							{/* Input field */}
							<div className="w-80 h-9 rounded-lg overflow-hidden bg-gray-800/40">
								<input
									required
									type={"text"}
									id="location"
									className="relative w-full h-full rounded-lg outline-none text-xs text-gray-200 placeholder:text-gray-500 px-4 text-left bg-transparent border border-gray-700/20 duration-100 focus:border-2 focus:border-blue-500"
									placeholder="Name of the Location"
									minLength={3}
									maxLength={20}
									value={location ?? ""}
									onChange={(evt) => {
										let val = evt.currentTarget.value;
										val = val.trim();
										val = val.replace(/\s\s+/g, " ");

										setLocation(val);
									}}
								/>
							</div>
						</div>

						{/* Info */}
						<div className="text-xs text-gray-500 font-robotoUIMedium">
							<span>
								Coordinates (ie. Latitude & Longitude) of the location are{" "}
								<br />
								automatically picked from that location from the properties.
							</span>
						</div>

						<button
							type={"submit"}
							className="relative outline-none border-none rounded-xl bg-blue-500 hover:bg-blue-600 duration-200 text-white text-sm uppercase px-10 py-2 flex">
							<span>Add Location</span>
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
