import React, { useState } from "react";

export default function Username({ username }) {
	const [val, setVal] = useState(username);

	return (
		<>
			<form
				action="#"
				method="POST"
				onSubmit={(e) => e.preventDefault()}
				className="grid">
				<div className="inline-flex gap-4 items-center justify-between text-xs">
					<b>Username: </b>

					{/* Input field */}
					<input
						required
						minLength={3}
						maxLength={25}
						type={"text"}
						placeholder=""
						className="simple-input"
						value={val}
						onChange={(evt) => {
							let val = evt.currentTarget.value;
							val = val.trim();
							val = val.replace(/\s\s+/g, ""); // Remove all unnecessory whitespaces
							val = val.replace(/[^a-zA-Z0-9.-_-]/g, "");

							setVal(val);
						}}
					/>
				</div>
			</form>
		</>
	);
}
