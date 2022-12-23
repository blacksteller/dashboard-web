import React, { useRef } from "react";

export default function PropertyName({ id, title, setVal, ...rest }) {
	const ref = useRef();

	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor={id ?? ""}
					className="text-xs font-robotoUIMedium">
					<span>{title ?? "Label for Field"}</span>
				</label>

				{/* Input field */}
				<div className="w-80 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						type={"text"}
						ref={ref}
						id={id ?? ""}
						className="relative w-full h-full rounded-lg outline-none text-xs  placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Name of the Property"
						{...rest}
						onKeyUp={(evt) => {
							let val = evt.currentTarget.value;
							val = val.trim();

							setVal(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}
