import React from "react";

export default function Landmark({ setLandmark, ...rest }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="landmark"
					className="text-xs font-robotoUIMedium">
					<span>{"Landmark of the Property ( < 150 )"}</span>
				</label>

				{/* Input field */}
				<div className="w-80 h-auto rounded-lg overflow-hidden bg-gray-100/40">
					<textarea
						id="landmark"
						className="relative w-full h-full rounded-lg outline-none text-xs dark:text-gray-200 placeholder:text-gray-500 px-4 py-2 text-left bg-transparent border border-gray-700/20 duration-100 focus:border-2 focus:border-blue-500 resize-none"
						placeholder="Landmark of the Property"
						minLength={6}
						maxLength={150}
						rows={3}
						required
						onKeyUp={(evt) => {
							let val = evt.currentTarget.value;
							val = val.trim();

							setLandmark(val);
						}}
						{...rest}
					/>
				</div>
			</div>
		</>
	);
}
