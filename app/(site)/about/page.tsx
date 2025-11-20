import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us - Dominicanna",
	description: "Learn more about Dominicanna, the first Dominican magazine dedicated to the world of cannabis.",
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net"}/about`,
	},
};

export default function AboutPage() {
	return <h1 className="page-title">About Us Page</h1>;
}
