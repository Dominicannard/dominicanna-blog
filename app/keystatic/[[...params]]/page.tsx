import { Metadata } from "next";
import React from "react";
import KeystaticApp from "../keystatic";

export const metadata: Metadata = {
	title: "KeyStatic Admin UI",
	description: "KeyStatic admin ui description",
};

export default function Page() {
	return <KeystaticApp />;
}
