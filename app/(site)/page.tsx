import dynamic from "next/dynamic";
import React from "react";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import Banner from "@/app/components/Homepage/Banner";
import PostGrid from "@/app/components/Post/PostGrid";
import Discovery from "@/app/components/Homepage/Discovery";
import FeaturedPost from "@/app/components/Homepage/FeaturedPost";
import Technology from "@/app/components/Homepage/Technology";
import LatestPost from "../components/Homepage/LatestPost";
import Widget from "../components/Post/Widgets";
import CategoryPost from "../components/Homepage/CategoryPost";
import Ads from "../components/Ads";

export default async function HomePage() {
	const homePage = await Reader().singletons.homepage.read();
	const lastNumber = homePage?.latestPost || 6;

	let posts = await Reader().collections.posts.all();
	posts = posts.filter((post) => !post.entry.draft);
	posts = sortPostsByPublishDate(posts);
	const latestPost = posts?.slice(0, lastNumber);
	const categories = await Reader().collections.categories.all();

	const widgetPosts = latestPost.map((post) => ({
		slug: post.slug,
		title: post.entry.title,
	}));

	return (
		<div className="homepage pb-12">
			{homePage?.banner && homePage.banner.length > 0 && (
				<section className="p-0">
					<Banner props={homePage.banner} />
				</section>
			)}
			<FeaturedPost />
			<div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Left column */}
				<div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-8">
					<LatestPost />
					<CategoryPost categorySlug="cannabis-medicinal" />
					<CategoryPost categorySlug="salud" />
				</div>

				{/* Right column - Sticky Widget */}
				<div className="col-span-1 md:col-span-1 lg:col-span-1">
					<div className="sticky top-14">
						<Widget title="Destacados" posts={widgetPosts || []} footerLink="/" />
						<div className="ads">
							<Ads />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}