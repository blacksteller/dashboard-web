import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { update } from "../controller";
import { capitalize } from "./capitalize";

export default function Lastname({ lastname, id }) {
	const [val, setVal] = useState(lastname);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<form
				action="#"
				method="POST"
				onSubmit={(e) => {
					e.preventDefault();

					if (val && val.length > 2) {
						setLoading(true);

						update({ data: { lastname: val }, id }, setLoading);
					}
				}}
				className="grid">
				<div className="inline-flex gap-4 items-center justify-between text-xs">
					<div className="inline-flex gap-2 items-center">
						<b>Lastname: </b>

						{/* Show loading icon when updating */}
						{loading && (
							<>
								<span className="animate-spin duration-300 ease-linear text-blue-600 text-sm">
									<FiLoader />
								</span>
							</>
						)}
					</div>

					<input
						required
						minLength={3}
						maxLength={25}
						type={"text"}
						placeholder=""
						readOnly
						onClick={(e) => {
							e.currentTarget.readOnly = false;
						}}
						className="simple-input"
						value={val}
						onChange={(evt) => {
							let val = evt.currentTarget.value;
							val = val.trim();
							val = val.replace(/\s\s+/g, " "); // Remove all unnecessory whitespaces
							val = val.replace(/[^a-zA-Z]/g, "");
							val = capitalize(val);

							setVal(val);
						}}
					/>
				</div>
			</form>
		</>
	);
}
