import React, { useRef } from "react";

function Ammenities({ ammenities, setAmmenities }) {
	const ref = useRef();

	return (
		<>
			{/* Input field */}
			<div className="w-60 h-9 rounded-lg overflow-hidden bg-gray-100/40">
				<input
					type={"text"}
					ref={ref}
					id="ammenities"
					className="relative w-full h-full rounded-lg outline-none text-xs placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
					placeholder="Ammenities or Tags"
					minLength={3}
					maxLength={50}
					onFocus={() => {
						const submitBtn = document.getElementById("submitForm");

						submitBtn.setAttribute("type", "button");
					}}
					onBlur={() => {
						const submitBtn = document.getElementById("submitForm");

						submitBtn.setAttribute("type", "submit");
					}}
					onKeyUp={(evt) => {
						let val = evt.currentTarget.value;
						val = val.trim();
						val = val.replace(/\s\s+/g, " ");
						val = val.replace(/\s/g, "-");

						const { key, keyCode } = evt;

						if ((key === "Enter" || keyCode === 13) && val.length >= 2) {
							setAmmenities(val);

							evt.currentTarget.value = "";
						}
					}}
				/>
			</div>
		</>
	);
}

export default Ammenities;
