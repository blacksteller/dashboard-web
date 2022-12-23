/* eslint-disable eqeqeq */
import React from "react";

function Lon({ lon, setLon }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="longitude"
					className="text-xs font-robotoUIMedium">
					<span>{"Longitude"}</span>
				</label>

				{/* Input field */}
				<div className="w-40 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						type={"number"}
						step={".000000000000000001"}
						id="longitude"
						className="relative w-full h-full rounded-lg outline-none text-xs  placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Longitude"
						defaultValue={
							lon == undefined || lon == null || lon == isNaN ? "" : lon
						}
						required
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setLon(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default Lon;
