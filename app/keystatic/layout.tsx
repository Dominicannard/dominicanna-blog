// src/app/keystatic/layout.tsx
import KeystaticApp from "./keystatic";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="keystatic w-full max-w-[1920px] m-auto">
			{children}
		</div>
	);
}
