/* eslint-disable eqeqeq */
import React from "react";

export default function Price({ price, setPrice }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="price"
					className="text-xs font-robotoUIMedium">
					<span>Price of the Propery 💲</span>
				</label>

				{/* Input field */}
				<div className="relative w-64 h-9 flex items-center rounded-lg overflow-hidden bg-gray-100/40">
					<div className="absolute z-20 left-0 w-9 text-center text-gray-500 text-sm font-semibold">
						<span>Rs</span>
					</div>

					<input
						type={"number"}
						id="price"
						className="relative w-full h-full rounded-lg outline-none text-xs dark:text-gray-200 placeholder:text-gray-500 pl-9 pr-4 text-left bg-transparent border border-gray-700/20 duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Price > Rs.1000"
						defaultValue={price > 0 ? price : ""}
						min={1000}
						required
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setPrice(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}
