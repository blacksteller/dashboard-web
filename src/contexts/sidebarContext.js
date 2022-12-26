import React, { createContext } from "react";

import {
	FiBell,
	FiBookmark,
	FiMapPin,
	FiPackage,
	FiFigma,
} from "react-icons/fi";

export const SidebarContext = createContext();

export default function SidebarContextProvider({ children }) {
	const sideNavs = [
		{
			parentTitle: "Menu",
			childrens: [
				{
					id: 123,
					to: "/dashboard",
					title: "Dashboard",
					icon: <FiPackage size={18} />,
					siblings: ["View", "Analytics"],
				},
				{
					id: 999,
					to: "/notifications",
					title: "Notifications",
					icon: <FiBell size={18} />,
					siblings: [],
				},
			],
		},
		{
			parentTitle: "Properties",
			childrens: [
				{
					id: 456,
					to: "/properties",
					title: "Properties",
					icon: <FiBookmark size={18} />,
					siblings: ["Add"],
				},
			],
		},
		{
			parentTitle: "Locations",
			childrens: [
				{
					id: 789,
					to: "/locations",
					title: "Locations",
					icon: <FiMapPin size={18} />,
					siblings: [],
				},
			],
		},
		{
			parentTitle: "Profiles",
			childrens: [
				{
					id: 101112,
					to: "/profiles",
					title: "Profiles",
					icon: <FiFigma size={18} />,
					siblings: ["Create"],
				},
			],
		},
	];

	return (
		<>
			<SidebarContext.Provider value={{ sideNavs }}>
				{children}
			</SidebarContext.Provider>
		</>
	);
}
