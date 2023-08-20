"use client";

import React from "react";
import {
	Navbar,
	NavbarBrand,
	Image,
	NavbarContent,
	NavbarItem,
	Link,
} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { FaSuitcase } from "react-icons/fa";

export default function Nav() {
	return (
		<div className="w-full flex items-center justify-between font-serif font-extrabold text-inherit text-3xl py-6 px-24 bg-zinc-900">
			<p className="flex items-center gap-4">
				<FaSuitcase size={48} /> Grand Circle Travel
			</p>
			<p>
				<span className="text-rose-500">AI</span> enabled Prototype GCT by{" "}
				<span className="text-rose-500">BI Solutions</span>
			</p>
		</div>
	);
}
