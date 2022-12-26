import React from "react";
import { FiCloudSnow } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProfileNotCreated() {
	return (
		<>
			<div className="relative w-full h-full flex items-center justify-center">
				<div className="h-auto grid gap-6 justify-items-center">
					<div className="relative w-auto h-auto flex items-center justify-center text-violet-700">
						<FiCloudSnow size={100} />
					</div>

					<div className="h-auto grid gap-0 justify-items-center">
						<div className="text-2xl font-robotoUIBold text-rose-600">
							<span>You haven't created any profile yet.</span>
						</div>

						<div className="text-sm font-semibold text-gray-600">
							<span>Go and first create atleast one profile at first.</span>
						</div>
					</div>

					<Link
						to={"/profiles/create"}
						className="relative text-sm text-white font-medium uppercase px-4 py-2 rounded-full duration-200 ease-linear transition-all bg-gradient-to-l from-violet-500 to-violet-700 hover:bg-gradient-to-r">
						<span>Create a Profile</span>
					</Link>
				</div>
			</div>
		</>
	);
}
