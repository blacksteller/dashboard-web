import React, { useContext } from "react";
import AppName from "./components/appName";
import Navs from "./components/navs";
import { Outlet } from "react-router-dom";
import { SidebarContext } from "./contexts/sidebarContext";
import { ContainerContext } from "./contexts/Container";
import { IoIosSync, IoIosCheckmarkCircle } from "react-icons/io";

export default function MainContainerLayout() {
	const {
		openModal,
		setOpenModal,
		uploading,
		uploadingInfo,
		clearStorage,
		setClearStorage,
	} = useContext(ContainerContext);
	const { sideNavs } = useContext(SidebarContext);

	return (
		<>
			<div className="relative w-full h-full flex overflow-hidden bg-white text-gray-800">
				{/* Uploading Info */}
				<div
					className={
						"fixed left-0 top-0 w-full h-full flex items-center justify-center bg-gray-800/30 duration-200 ease-linear " +
						(openModal
							? "z-50 visible opacity-100"
							: "-z-10 invisible opacity-0")
					}>
					<div className="relative rounded-3xl shadow-2xl bg-white p-20 h-auto grid gap-10 justify-items-center">
						<div className="text-2xl text-[slateblue] font-robotoUIBlack">
							{uploadingInfo ?? ""}
						</div>

						{uploading ? (
							<div className="relative w-auto h-auto flex items-center justify-center transition-all ease-linear animate-spin text-blue-500">
								<IoIosSync size={30} />
							</div>
						) : (
							<>
								<div className="h-auto grid gap-10 justify-items-center">
									<div className="relative w-auto h-auto flex items-center justify-center transition-all ease-linear text-green-500">
										<IoIosCheckmarkCircle size={80} />
									</div>

									<div
										className="rounded-full px-4 py-2 text-white text-sm duration-200 ease-linear transition-all bg-gradient-to-l from-violet-500 to-violet-700 hover:bg-gradient-to-r cursor-pointer"
										onClick={() => setOpenModal(false)}>
										<span>Close & Continue</span>
									</div>
								</div>
							</>
						)}

						{clearStorage && (
							<div className="flex items-center gap-6">
								<div
									className="rounded-full px-4 py-2 text-white text-sm bg-[slateblue] cursor-pointer"
									onClick={() => {
										localStorage.clear();

										setClearStorage(false);
										setOpenModal(false);

										window.location.reload();
									}}>
									<span>Clear LocalStorage</span>
								</div>

								<div
									className="rounded-full px-4 py-2 text-white text-sm bg-[tomato] cursor-pointer"
									onClick={() => setOpenModal(false)}>
									<span>Continue</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Dashboard Sidebar [192px] */}
				<div className="w-48 min-w-[12rem] h-full shadow-3xl border-r border-gray-100">
					<div className="w-full h-full overflow-hidden">
						<div className="w-full h-10 flex items-center px-4">
							{/* AppName */}
							<AppName />
						</div>

						<div className="ml-4 h-[1px] bg-gray-200 w-32"></div>

						{/* Remaining without appname and a hr */}
						<div className="h-[calc(100%-41px)]">
							<div className="w-full h-full overflow-auto">
								<div className="h-auto grid gap-0">
									{sideNavs.map((sideNav, index) => (
										<div
											key={index}
											className="h-auto grid gap-0">
											{/* Parent Title */}
											<div className="relative w-full h-9 flex items-center px-4">
												<span className="uppercase font-robotoUIMedium text-xs text-blue-500">
													{sideNav.parentTitle ?? "Menu"}
												</span>
											</div>

											{/* Siblings */}
											{sideNav.childrens.map((children, id) => (
												<Navs
													key={id}
													navItem={children}
												/>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Remaining width container */}
				<div className="w-[calc(100%-12rem)] h-full bg-transparent">
					<Outlet />
				</div>
			</div>
		</>
	);
}
