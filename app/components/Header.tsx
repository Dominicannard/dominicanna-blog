import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { Reader } from "../keystatic/utils";
import MobileNav from "./MobileNav";
import { ICategory } from "../keystatic/interface";
import ClientHeader from "./ClientHeader";

export interface MenuItem {
	menu: string;
	url: string | null;
}

export default async function Header() {
	const menuLink = await Reader().singletons.menuLinks.read();
	const menuItems: readonly MenuItem[] = menuLink?.items || [];
	const categories: ICategory[] = await Reader().collections.categories.all();

	return (
		<ClientHeader menuItems={[...menuItems]} categories={categories} />
	);
}
