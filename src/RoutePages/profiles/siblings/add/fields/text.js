import React from "react";

export default function TextField({ id, label, min, max, ...rest }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor={id ?? ""}
					className="text-xs font-robotoUIMedium">
					<span>{label ?? ""}</span>
				</label>

				{/* Input field */}
				<div className="w-60 h-9 rounded-lg overflow-hidden bg-gray-200/40">
					<input
						id={id ?? ""}
						type={"text"}
						className="relative w-full h-full rounded-lg outline-none text-xs placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder={label ?? ""}
						minLength={min}
						maxLength={max}
						{...rest}
					/>
				</div>
			</div>
		</>
	);
}
