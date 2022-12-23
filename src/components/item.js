import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function NavItem({ to, title }) {
	let [matched, setMatched] = useState(false);
	const location = useLocation();

	useEffect(() => {
		let _to = to ?? "/";

		if (location.pathname === _to || location.pathname.indexOf(_to) > -1) {
			setMatched(true);
		}

		return function () {
			setMatched(false);
		};
	}, [location.pathname, to]);

	return (
		<li>
			<Link
				to={to ?? "/"}
				className={
					"w-full h-8 px-2 flex items-center justify-between group " +
					(matched ? "bg-gray-50" : "hover:bg-gray-50") +
					" duration-100 ease-in rounded-md"
				}>
				<div className="text-gray-700 font-robotoUIMedium capitalize text-xs group-hover:text-blue-500 duration-200">
					{title ?? ""}
				</div>

				<div className="relative invisible group-hover:visible">
					<div className="relative w-auto h-auto -left-1 group-hover:left-0 flex items-center justify-center duration-200 text-gray-600 ease-in opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
						<FiChevronRight />
					</div>
				</div>
			</Link>
		</li>
	);
}
