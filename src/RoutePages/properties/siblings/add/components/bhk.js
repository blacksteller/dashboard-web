/* eslint-disable eqeqeq */
import React from "react";

export default function Bhk({ bhk, setBhk }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="bhk"
					className="text-xs font-robotoUIMedium">
					<span>BHK</span>
				</label>

				{/* Input field */}
				<div className="w-40 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						type={"number"}
						id="bhk"
						className="relative w-full h-full rounded-lg outline-none text-xs placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="BHK"
						defaultValue={bhk > 0 ? bhk : ""}
						min={0}
						required
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setBhk(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}
