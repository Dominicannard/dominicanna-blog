"use client";
import React, { useEffect } from "react";

export default function ScriptClient() {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					entry.target.classList.toggle("out-of-screen", !entry.isIntersecting);
				});
			},
			{
				rootMargin: "200px 0px -100px 0px",
			}
		);

		const cards = document.querySelectorAll(".post-card");
		cards.forEach((card) => {
			observer.observe(card);
		});

		return () => {
			cards.forEach((card) => {
				observer.unobserve(card);
			});
			observer.disconnect();
		};
	}, []);

	return <></>;
}
