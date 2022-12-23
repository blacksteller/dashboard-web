/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContainerContext } from "../../../../../contexts/Container";

export default function Update() {
	const { setAppTitle } = useContext(ContainerContext);

	const [id, setId] = useState(null);

	const { id: propertyId } = useParams();

	useEffect(() => {
		setId(propertyId);

		// Update title
		setAppTitle("Update property : " + propertyId);
	}, []);

	return (
		<>
			<div className="relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
				<span className="text-6xl font-robotoUIBlack text-gray-200">
					{id ?? "PropertyId"}
				</span>
			</div>
		</>
	);
}
