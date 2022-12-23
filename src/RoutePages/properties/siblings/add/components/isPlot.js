import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function IsPlot({ isPlot, updatePlot }) {
	return (
		<>
			<div className="h-auto grid gap-2 justify-items-start">
				<div
					className="text-xs font-robotoUIMedium cursor-pointer"
					onClick={() => updatePlot(true)}>
					<span>Is it a plot?</span>
				</div>
				{/* Custom Buttons*/}
				<div className="relative h-9 flex items-center justify-center gap-6">
					<div
						className={
							"text-xs flex items-center gap-2 cursor-pointer rounded-lg p-2 duration-200 ease-linear " +
							(isPlot
								? "text-green-500 font-robotoUIMedium bg-green-400/10"
								: "text-gray-500 font-robotoUIRegular bg-transparent")
						}
						onClick={() => updatePlot(true)}>
						<span>Yes</span>

						<FiCheckCircle />
					</div>

					<div
						className={
							"text-xs flex items-center gap-2 cursor-pointer rounded-lg p-2 duration-200 ease-linear " +
							(isPlot
								? "text-gray-500 font-robotoUIRegular bg-transparent"
								: "text-rose-500 font-robotoUIMedium bg-red-400/10")
						}
						onClick={() => updatePlot(false)}>
						<span>No</span>

						<FiXCircle />
					</div>
				</div>
			</div>
		</>
	);
}
