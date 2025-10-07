import type { Metadata } from "next";
import { Inter, Anton, Lobster, Great_Vibes, Style_Script, Calistoga, Rowdies, Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { cookies, draftMode } from 'next/headers';
import DraftModeIndicator from './components/DraftModeIndicator';
import { PostHogProvider } from './providers'

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

// const roboto = Roboto({
// 	weight: ["300", "400", "500", "700"],
// 	subsets: ["latin"],
// 	variable: "--roboto",
// });

export const metadata: Metadata = {
	title: "Dominicanna - Dominicanna es la primera revista dominicana dedicada al mundo del cannabis.",
	description: "Dominicanna es la primera revista dominicana dedicada al mundo del cannabis.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || "https://www.dominicanna.net"),
	alternates: {
		canonical: "/",
	},
};

const lobster = Lobster({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--lobster",
});

const great_vibes = Great_Vibes({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--great_vibes",
});

const style_script = Style_Script({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--style_script",
});

const heading_font = Calistoga({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--heading_font",
});

const fontVariables = `${heading_font.variable} ${lobster.variable} ${great_vibes.variable} ${style_script.variable}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled } = draftMode();
	return (
		<html lang="en">
			<head>
				<script
					async
					src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
					crossOrigin="anonymous"
				></script>
			</head>
			<body className={`${inter.className} ${fontVariables} `}>
					<Suspense fallback={<Loading text="Loading..." />}>
						<PostHogProvider>
							{children}
						</PostHogProvider>
						{isEnabled && <DraftModeIndicator branch={cookies().get('ks-branch')?.value} />}
					</Suspense>
			</body>
		</html>
	);
}
