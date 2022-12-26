/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { FiClock, FiCloudSnow, FiEdit3, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ContainerContext } from "../../contexts/Container";
import ViewProfile from "./siblings/view";

const SpaceBetween = () => (
	<>
		<div className="my-2 w-full"></div>
	</>
);

function Profile({ profile, onChoose }) {
	return (
		<>
			<div className="w-72 h-auto p-2">
				<div className="relative w-full h-full overflow-hidden duration-200 ease-linear hover:bg-gray-100 rounded-md hover:shadow-2xl border">
					{/* Absolute background image */}
					<div className="absolute z-10 w-full h-full left-0 top-0 flex items-center justify-center rounded-md overflow-hidden">
						<img
							src={profile.url ?? "/images/placeholder.jpg"}
							alt="User profileimage"
							className="w-full h-full overflow-hidden rounded-2xl flex items-center justify-center bg-transparent object-cover object-center"
						/>
					</div>

					<div className="relative z-30 w-full h-full overflow-hidden bg-white/90 backdrop-blur-3xl rounded-md">
						<div className="w-full h-60 flex items-center justify-center overflow-hidden border-b rounded-t-md">
							<img
								src={profile.url ?? "/images/placeholder.jpg"}
								alt="User profileimage"
								className="w-full h-full overflow-hidden rounded-t-md flex items-center justify-center bg-transparent object-cover object-center"
							/>
						</div>

						<div className="w-full h-[calc(100%-15rem)] grid overflow-hidden p-2 group">
							<div className="w-full h-full grid gap-0 justify-items-start">
								<div className="w-full flex items-center justify-between pr-4">
									<div className="w-auto h-auto grid gap-0">
										<div className="font-robotoUIMedium text-base">
											<h1 className="inline-flex items-center gap-1">
												<span>{profile.firstname ?? ""}</span>
												<span>{profile.middlename ?? ""}</span>
												<span>{profile.lastname ?? ""}</span>
											</h1>
										</div>

										<div className="text-xs text-gray-500">
											<h6>{profile.username ?? ""}</h6>
										</div>
									</div>

									<div
										className="duration-200 ease-linear invisible opacity-0 scale-95 group-hover:scale-100 group-hover:visible group-hover:opacity-100 text-blue-600 cursor-pointer"
										onClick={() => onChoose(profile.id)}>
										<FiEdit3 size={20} />
									</div>
								</div>

								<SpaceBetween />

								<div className="inline-flex gap-2 items-center text-xs">
									<span className="text-blue-600">
										<FiPackage size={20} />
									</span>
									<span className="text-opacity-60">
										{" "}
										10:45pm | Thu Dec 20, 2020
									</span>
								</div>

								<SpaceBetween />

								<div className="h-auto grid">
									<div className="grid">
										<div className="inline-flex gap-2 items-center text-xs">
											<span className="text-gray-700">
												<FiClock size={20} />
											</span>
											<span className="text-opacity-60">
												{" "}
												10:45pm | Thu Dec 20, 2020
											</span>
										</div>
									</div>

									<SpaceBetween />

									<div className="grid">
										<div className="inline-flex gap-2 items-center justify-between text-xs">
											<b>Total Properties </b>
											<span className="text-blue-600 cursor-pointer font-extrabold">
												{profile.properties.length}
											</span>
										</div>
									</div>
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
	const { profiles, setAppTitle, fetchProfiles } = useContext(ContainerContext);
	const [viewProfile, setViewProfile] = useState({
		view: false,
		id: null,
	});

	useEffect(() => {
		setAppTitle("Profiles");
	}, []);

	return (
		<>
			<div className="relative w-full h-full overflow-auto">
				{/* Absolute profile view content */}
				{viewProfile.view && (
					<ViewProfile
						profile={profiles.find((p) => p.id === viewProfile.id)}
						closeModal={() => {
							setViewProfile({ view: false, id: null });
						}}
						setProfiles={() => fetchProfiles()}
					/>
				)}

				{profiles.length > 0 ? (
					<>
						<div className="relative w-full h-auto flex flex-wrap gap-0 min-w-fit">
							{profiles.map((profile, index) => (
								<Profile
									key={index}
									profile={profile}
									onChoose={(id) => setViewProfile({ view: true, id })}
								/>
							))}
						</div>
					</>
				) : (
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
										<span>
											Go and first create atleast one profile at first.
										</span>
									</div>
								</div>

								<Link
									to={"create"}
									className="relative text-sm text-white font-medium uppercase px-4 py-2 rounded-full duration-200 ease-linear transition-all bg-gradient-to-l from-violet-500 to-violet-700 hover:bg-gradient-to-r">
									<span>Create a Profile</span>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default ProfilesPage;
