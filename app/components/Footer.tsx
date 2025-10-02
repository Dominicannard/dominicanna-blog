import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Reader } from "../keystatic/utils";

export default async function Footer() {
	const menuLinks = await Reader().singletons.menuLinks.read();
	const categories = await Reader().collections.categories.all();
	const socialLinks = await Reader().singletons.socialLinks.read();

	return (
		<footer className="bg-black text-white">
			{/* Legal Disclaimer */}
			<div className="bg-yellow-400 text-black text-center py-3 px-6 border-t-4 border-red-600">
				<p className="font-bold text-lg uppercase tracking-wide">
					⚠️ EL CONSUMO Y POSESIÓN DE MARIHUANA ES ILEGAL BAJO LA LEY N° 50-88 DE LA REPÚBLICA DOMINICANA
				</p>
				<p className="text-sm mt-1 font-semibold">
					Las violaciones a esta ley pueden conllevar penas de prisión y multas significativas. No promuevemos ni facilitamos el consumo o posesión de sustancias controladas.
					<br />
					<i>este sitio web es de carácter exclusivamente informativo y educativo sobre legislación, cultura, políticas públicas y debates internacionales sobre la planta Cannabis Sativa L.</i>
				</p>
			</div>

			<div className="container mx-auto px-6 py-6">
				{/* Social Icons - Top Right */}
				<div className="flex justify-end mb-8">
					<div className="flex gap-4 text-white">
						{socialLinks && socialLinks.instagram && (
							<Link
								href={`https://instagram.com/${socialLinks.instagram}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-70 transition-opacity"
								aria-label="Instagram"
							>
								<Instagram size={18} />
							</Link>
						)}
						{socialLinks && socialLinks.twitter && (
							<Link
								href={`https://twitter.com/${socialLinks.twitter}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-70 transition-opacity"
								aria-label="Twitter"
							>
								<Twitter size={18} />
							</Link>
						)}
						{socialLinks && socialLinks.facebook && (
							<Link
								href={`https://facebook.com/${socialLinks.facebook}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-70 transition-opacity"
								aria-label="Facebook"
							>
								<Facebook size={18} />
							</Link>
						)}
						{socialLinks && socialLinks.mail && (
							<Link
								href={`mailto:${socialLinks.mail}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:opacity-70 transition-opacity"
								aria-label="Email"
							>
								<Mail size={18} />
							</Link>
						)}
					</div>
				</div>

				{/* Footer Columns */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
					{/* Column 1 - Menu Links */}
					<div className="text-sm [&_h3]:hidden [&_ul]:space-y-2 [&_a]:text-white [&_a:hover]:opacity-70">
						{menuLinks && menuLinks.items.length > 0 && (
							<div className="block-content space-y-2 text-sm">
								{menuLinks.items.map((item, index) => (
									<div key={index} className={`category py-2 ${index > 0 ? "" : ""}`}>
										<Link
											className="alink"
											href={item?.url || "/"}
										>
											{item.menu}
										</Link>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Column 1 - Menu Links */}
					<div className="text-sm [&_h3]:hidden [&_ul]:space-y-2 [&_a]:text-white [&_a:hover]:opacity-70">
						{categories && categories.length > 0 && (
							<div className="block-content space-y-2 text-sm">
								{categories.slice(0, 6).map((item, index) => (
									<div key={index} className={`category py-2 ${index > 0 ? "" : ""}`}>
										<Link
											className="alink"
											href={`/post/category/${item.slug}`}
										>
											{item?.entry?.category}
										</Link>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Column 3 - Additional Links */}
					<div className="text-sm [&_h3]:hidden [&_ul]:space-y-2 [&_a]:text-white [&_a:hover]:opacity-70">
						<div className="block-content space-y-2 text-sm">
							<div className="category py-2">
								<Link className="alink" href="/anuncios">Anuncia en Dominicanna</Link>
							</div>
							<div className="category py-2">
								<Link className="alink" href="/sobre-nosotros">Sobre Dominicanna</Link>
							</div>
							<div className="category py-2">
								<Link className="alink" href="/mapa-del-sitio">Mapa del Sitio</Link>
							</div>
							<div className="category py-2">
								<Link className="alink" href="/politicas-privacidad">Políticas de Privacidad</Link>
							</div>
							<div className="category py-2">
								<Link className="alink" href="/politicas-cookies">Política de Cookies</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="text-right text-xs text-white">
					<p>Copyright © 2025.</p>
					<p>Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
