import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { update } from "../controller";
import { capitalize } from "./capitalize";

export default function Middlename({ middlename, id }) {
	const [val, setVal] = useState(middlename);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<form
				action="#"
				method="POST"
				onSubmit={(e) => {
					e.preventDefault();

					setLoading(true);

					update({ data: { middlename: val }, id }, setLoading);
				}}
				className="grid">
				<div className="inline-flex gap-4 items-center justify-between text-xs">
					<div className="inline-flex gap-2 items-center">
						<b>Middlename: </b>

						{/* Show loading icon when updating */}
						{loading && (
							<>
								<span className="animate-spin duration-300 ease-linear text-blue-600 text-sm">
									<FiLoader />
								</span>
							</>
						)}
					</div>

					{/* Input field */}
					<input
						type={"text"}
						readOnly
						onClick={(e) => {
							e.currentTarget.readOnly = false;
						}}
						minLength={3}
						maxLength={25}
						placeholder=""
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
