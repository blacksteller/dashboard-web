import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { update } from "../controller";

export default function Phone({ phone, id }) {
	const [val, setVal] = useState(phone);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<form
				action="#"
				method="POST"
				onSubmit={async (e) => {
					e.preventDefault();

					if (val && val.length > 2) {
						setLoading(true);

						update({ data: { phone: val }, id }, setLoading);
					}
				}}
				className="grid">
				<div className="inline-flex gap-4 items-center justify-between text-xs">
					<div className="inline-flex gap-2 items-center">
						<b>Phone: </b>

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
						minLength={10}
						maxLength={10}
						min={9800000000}
						type={"number"}
						placeholder=""
						readOnly
						onClick={(e) => {
							e.currentTarget.readOnly = false;
						}}
						className="simple-input"
						value={val}
						onChange={(evt) => {
							let val = evt.currentTarget.valueAsNumber;

							if (isNaN(val)) {
								val = null;
							} else if (val.toString().length > 10) {
								return;
							}

							setVal(val);
						}}
					/>
				</div>
			</form>
		</>
	);
}
