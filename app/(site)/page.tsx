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
import BannerAd from "@/app/components/Homepage/BannerAd";

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

	const bannerPosts = homePage?.banner ? posts.filter((post) => homePage.banner.includes(post.slug)) : [];

	// Get category posts and titles
	const cannabisMedicinalCategory = categories.find(cat => cat.slug === "cannabis-medicinal");
	const cannabisMedicinalPosts = posts.filter(post =>
		post.entry.categories && post.entry.categories.includes("cannabis-medicinal")
	);
	const cannabisMedicinalTitle = cannabisMedicinalCategory?.entry?.category || "cannabis-medicinal";

	const saludCategory = categories.find(cat => cat.slug === "salud");
	const saludPosts = posts.filter(post =>
		post.entry.categories && post.entry.categories.includes("salud")
	);
	const saludTitle = saludCategory?.entry?.category || "salud";

	return (
		<div className="homepage pb-12">
			{homePage?.banner && homePage.banner.length > 0 && (
				<section className="p-0">
					<Banner posts={bannerPosts} />
				</section>
			)}
			<FeaturedPost />
			<BannerAd />
			<div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Left column */}
				<div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-8">
					<LatestPost
						posts={posts}
						categories={categories}
					/>
					<CategoryPost
						posts={cannabisMedicinalPosts}
						categories={categories}
						title={cannabisMedicinalTitle}
					/>
					<CategoryPost
						posts={saludPosts}
						categories={categories}
						title={saludTitle}
					/>
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
