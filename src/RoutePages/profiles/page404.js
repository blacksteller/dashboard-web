/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../contexts/sidebarContext";

function Page404() {
	const { sideNavs } = useContext(SidebarContext);
	const [siblings, setSiblings] = useState([]);

	const propertiesSiblings = () => {
		try {
			const data = sideNavs.find(
				(e) => e.parentTitle.toLowerCase() === "profiles"
			);

			return setSiblings(data.childrens[0].siblings);
		} catch (error) {
			return setSiblings([]);
		}
	};

	useEffect(() => {
		propertiesSiblings();

		return () => setSiblings([]);
	}, []);

	return (
		<>
			<div className="w-full h-full bg-transparent flex items-center justify-center">
				{/* Centered Grids */}
				<div className="h-auto grid justify-items-center gap-14">
					{/* Penguin GIF Image */}
					<img
						src="/images/404/penguin-hi-404.gif"
						alt="penguin-hi-404"
						className="w-52 h-auto flex items-center justify-center"
					/>

					<div className="h-auto grid gap-6">
						{/* 404 Large Heading */}
						<div className="flex items-center gap-5">
							<div className="heading-404">404</div>
							<div className="text-5xl dark:text-gray-400 text-gray-700 font-robotoUIBlack">
								Page Not Found
							</div>
						</div>

						{/* Back To HomePage Button */}
						<div className="h-auto grid gap-2 justify-items-center">
							<p>
								<span className="dark:text-gray-300 text-gray-800 font-robotoUIMedium">
									Hey,
								</span>{" "}
								<span className="dark:text-gray-400 text-gray-700 capitalize text-sm">
									You got lost{" "}
								</span>
							</p>
							<p>
								<span className="text-rose-500 font-robotoUIMedium capitalize text-sm">
									Here are available pages 👇😃
								</span>
							</p>

							{/* Link to HomePage */}
							<div className="w-auto h-11 rounded-3xl px-5 dark:bg-gray-700 bg-gray-200 flex items-center gap-8 justify-center text-sm font-robotoUIRegular">
								{siblings.map((s, index) => (
									<Link
										key={index}
										to={s.toLowerCase()}
										className="dark:hover:text-gray-100 dark:text-gray-400 hover:text-gray-800 text-gray-600 uppercase duration-200 ease-in">
										<span>{s ?? ""}</span>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page404;
