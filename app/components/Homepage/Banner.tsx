// Import the new client component that will handle the slider
import BannerSliderClient from "./BannerSliderClient";
// Import the Reader utility from Keystatic
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";

// Define a type that matches what Keystatic reader returns
// This should be compatible with IPostResolved from your utils
interface PostEntry {
    title: string;
    summary: string;
    authors?: readonly string[];
    image?: string;
    heroImage?: string | null;
    categories?: readonly string[];
    draft?: boolean;
    isFeatured?: boolean;
    postType?: string;
    publishDate: string;
}

interface Post {
    slug: string;
    entry: PostEntry;
}

// Define the type for BannerSliderClient
interface BannerPost {
    slug: string;
    title: string;
    summary: string;
    authors?: string[];
    link: string;
    image?: string;
    heroImage?: string;
    categories?: string[];
    draft?: false;
    isFeatured?: false;
    postType?: string;
    publishDate: string;
}

// This component will now be a Server Component
// It will fetch data using Keystatic reader and pass it to a client component that renders the slider.
export default async function Banner({ posts }: { posts: Post[] }) {
    const sortedPosts = sortPostsByPublishDate(posts as any) as Post[];

    // If there's no posts, render appropriate message or fallback
    if (sortedPosts.length === 0) {
        return <div className="w-full h-64 flex items-center justify-center">No posts found for the banner.</div>;
    }

    // Map the posts to the format expected by BannerSliderClient
    const bannerPosts: BannerPost[] = sortedPosts.map(post => ({
        slug: post.slug,
        title: post.entry.title,
        summary: post.entry.summary,
        authors: post.entry.authors ? [...post.entry.authors] : [],
        link: `/post/${post.slug}`,
        image: post.entry.image,
        heroImage: post.entry.heroImage || undefined,
        categories: post.entry.categories ? [...post.entry.categories] : [],
        draft: post.entry.draft as false,
        isFeatured: post.entry.isFeatured as false,
        postType: post.entry.postType,
        publishDate: post.entry.publishDate,
    }));

    // Render the client component, passing the fetched data
    return (
        <div className="w-full bg-white">
            <div className="w-full max-w-full" style={{ marginBottom: -5 }}>
                <BannerSliderClient postsData={bannerPosts} />
            </div>
        </div>
    );
}
