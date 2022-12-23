import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiPackage } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import NavItem from "./item";

export default function Navs({ navItem }) {
	const [openSiblings, setOpenSiblings] = useState(false);

	let [matched, setMatched] = useState(false);
	const location = useLocation();

	useEffect(() => {
		let to = navItem.to ?? "/";

		if (location.pathname === to || location.pathname.indexOf(to) > -1) {
			setMatched(true);
			setOpenSiblings(true);
		}

		return function () {
			setMatched(false);
			setOpenSiblings(false);
		};
	}, [location.pathname, navItem]);

	return (
		<nav className="w-full h-auto px-2">
			<div className="h-auto grid">
				<Link
					to={navItem.to ?? "/"}
					className={
						"w-full h-9 flex items-center group " +
						(matched
							? "text-indigo-500"
							: "text-gray-700 hover:text-indigo-500")
					}
					onClick={() => setOpenSiblings(!openSiblings)}>
					<div className="w-9 h-full flex items-center justify-center cursor-pointer">
						<div className="w-auto h-auto flex items-center justify-start duration-200">
							{navItem.icon ?? <FiPackage size={18} />}
						</div>
					</div>

					<div className="w-[calc(100%-2.25rem)]">
						<div className="flex items-center justify-between">
							<div className="font-robotoUIBold capitalize text-xs duration-200">
								{navItem.title ?? ""}
							</div>

							{navItem.siblings.length > 0 && (
								<div
									className={
										"relative " +
										(openSiblings ? "visible" : "invisible group-hover:visible")
									}>
									{openSiblings ? (
										<div className="relative w-auto h-auto -bottom-1 group-hover:bottom-0 flex items-center justify-center duration-200 text-gray-600 ease-in opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
											<FiChevronUp />
										</div>
									) : (
										<div className="relative w-auto h-auto -top-1 group-hover:top-0 flex items-center justify-center duration-200 text-gray-600 ease-in opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
											<FiChevronDown />
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</Link>

				<div
					className={
						"w-full " +
						(openSiblings ? "h-auto" : "h-0") +
						" flex items-center overflow-hidden"
					}>
					<div className="w-9 h-full flex items-center justify-center">
						<div className="relative w-[1px] h-full bg-gray-200"></div>
					</div>

					<div className="w-[calc(100%-2.25rem)]">
						<ul className="h-auto grid gap-1 list-none">
							{navItem.siblings.map((nav, id) => (
								<NavItem
									key={id}
									to={`${navItem.to}/${nav.toLowerCase()}`}
									title={nav}
								/>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
