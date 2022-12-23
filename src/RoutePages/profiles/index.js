/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { ContainerContext } from "../../contexts/Container";

const SpaceBetween = () => (
	<>
		<div className="my-2 w-full h-[1px] bg-gray-300"></div>
	</>
);

function Profile({ profile }) {
	return (
		<>
			<div className="w-1/2 h-80 p-1">
				<div className="relative w-full h-full overflow-hidden duration-200 ease-linear hover:bg-gray-100 rounded-xl hover:shadow-2xl">
					{/* Absolute background image */}
					<div className="absolute z-10 w-full h-full left-0 top-0 flex items-center justify-center rounded-xl overflow-hidden">
						<img
							src={profile.url ?? "/images/placeholder.jpg"}
							alt="User profileimage"
							className="w-full h-full overflow-hidden rounded-2xl flex items-center justify-center bg-transparent object-cover object-center"
						/>
					</div>

					<div className="relative z-30 w-full h-full overflow-hidden flex gap-2 bg-white/90 backdrop-blur-3xl rounded-xl">
						<div className="w-1/2 h-full flex items-center justify-center overflow-hidden border-r">
							<img
								src={profile.url ?? "/images/placeholder.jpg"}
								alt="User profileimage"
								className="w-full h-full overflow-hidden flex items-center justify-center bg-transparent object-cover object-center"
							/>
						</div>

						<div className="w-1/2 h-full flex items-center justify-center overflow-hidden p-2 group">
							<div className="w-full h-full grid gap-0 justify-items-start">
								<div className="w-full flex items-center justify-between pr-4">
									<div className="w-auto h-auto grid gap-0">
										<div className="font-robotoUIMedium text-base">
											<h1>{profile.fullname ?? ""}</h1>
										</div>

										<div className="text-xs text-gray-400">
											<h6>{profile.username ?? ""}</h6>
										</div>
									</div>

									<div className="duration-200 ease-linear invisible opacity-0 scale-95 group-hover:scale-100 group-hover:visible group-hover:opacity-100 text-blue-600 cursor-pointer">
										<FiEdit3 size={20} />
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-2">
									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>CreatedAt: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>

									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>UpdatedAt: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-2">
									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Phone: </b>
											<span className="text-opacity-60">
												{profile.phone ?? ""}
											</span>
										</div>
									</div>

									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Address: </b>
											<span className="text-opacity-60">
												{profile.address ?? ""}
											</span>
										</div>
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full inline-flex gap-4 items-center justify-between text-xs">
									<b>Onboard On: </b>
									<span className="text-opacity-60">
										{" "}
										10:45pm | Thu Dec 20, 2020
									</span>
								</div>

								<SpaceBetween />

								<div className="w-full h-auto grid gap-2">
									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Lastpaid: </b>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>

									<div className="grid">
										<div className="inline-flex gap-4 items-center justify-between text-xs">
											<b>Payment History: </b>
											<span className="text-blue-600 cursor-pointer">
												Show All History
											</span>
										</div>
									</div>
								</div>

								<SpaceBetween />

								<div className="w-full inline-flex gap-4 items-center justify-between text-xs">
									<b>Properties: </b>
									<span className="text-blue-600 cursor-pointer">
										Show All Properties
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function ProfilesPage() {
	const { profiles, setAppTitle } = useContext(ContainerContext);

	useEffect(() => {
		setAppTitle("Profiles");
	}, []);

	return (
		<>
			<div className="w-full h-full overflow-auto">
				<div className="w-full h-auto flex flex-wrap gap-0 min-w-fit">
					{profiles.map((profile, index) => (
						<Profile
							key={index}
							profile={profile}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default ProfilesPage;
