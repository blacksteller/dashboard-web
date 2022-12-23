/* eslint-disable eqeqeq */
import React from "react";

export default function Story({ story, setStory }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<label
					htmlFor="story"
					className="text-xs font-robotoUIMedium">
					<span>Story</span>
				</label>

				{/* Input field */}
				<div className="w-40 h-9 rounded-lg overflow-hidden bg-gray-100/40">
					<input
						type={"number"}
						id="story"
						className="relative w-full h-full rounded-lg outline-none text-xs  placeholder:text-gray-500 px-4 text-left bg-transparent border duration-100 focus:border-2 focus:border-blue-500"
						placeholder="Story"
						defaultValue={story > 0 ? story : ""}
						min={0}
						required
						onKeyUp={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = 0;
							}

							setStory(val);
						}}
					/>
				</div>
			</div>
		</>
	);
}
