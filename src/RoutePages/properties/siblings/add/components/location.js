import React from "react";

export default function Location({ setLocation, ...rest }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="location"
					className="text-xs font-robotoUIMedium">
					<span>{"Name of the Location"}</span>
				</label>

				{/* Input field */}
				<div className="w-80 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						type={"text"}
						id="location"
						className="relative w-full h-full rounded-lg outline-none text-xs  placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Name of the Location"
						minLength={3}
						maxLength={20}
						onKeyUp={(evt) => {
							let val = evt.currentTarget.value;
							val = val.trim();

							setLocation(val);
						}}
						required
						{...rest}
					/>
				</div>
			</div>
		</>
	);
}
