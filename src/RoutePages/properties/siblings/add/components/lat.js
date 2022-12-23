/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
import React from "react";

function Lat({ lat, setLat }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="latitude"
					className="text-xs font-robotoUIMedium">
					<span>{"Latitude"}</span>
				</label>

				{/* Input field */}
				<div className="w-40 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						required
						type={"number"}
						id="latitude"
						step={".000000000000000001"}
						className="relative w-full h-full rounded-lg outline-none text-xs  placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Latitude"
						defaultValue={
							lat == undefined || lat == null || lat == isNaN ? "" : lat
						}
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setLat(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default Lat;
