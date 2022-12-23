/* eslint-disable eqeqeq */
import React from "react";

export default function Area({ area, setArea }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="area"
					className="text-xs font-robotoUIMedium">
					<span>Area</span>
				</label>

				{/* Input field */}
				<div className="w-40 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						min={0}
						id="area"
						required
						type={"number"}
						step={".000001"}
						className="relative w-full h-full rounded-lg outline-none text-xs placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Area of the plot"
						defaultValue={
							area == undefined || area == null || area == isNaN ? "" : area
						}
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setArea(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}
