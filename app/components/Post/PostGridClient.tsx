"use client";

import React, { useState } from "react";
import { ICategory, IPost } from "@/app/keystatic/interface";
import PostCard from "./PostCard";

interface PostGridClientProps {
  posts: IPost[];
  categories: ICategory[];
  viewMoreButton: boolean;
  viewMoreLimit: number;
}

export default function PostGridClient({
  posts,
  categories,
  viewMoreButton,
  viewMoreLimit,
}: PostGridClientProps) {
  // Use state to manage the number of visible posts
  const [limit, setLimit] = useState(viewMoreLimit);

  // Determine the posts to display based on the limit
  const postsToShow = viewMoreButton ? posts.slice(0, limit) : posts;

  // Check if there are posts left to show
  const hasMorePosts = viewMoreButton && posts.length > limit;

  // Handler to increase the limit
  const handleViewMore = () => {
    // Increase the limit by viewMoreLimit, capped at the total posts length
    setLimit(prevLimit => Math.min(prevLimit + viewMoreLimit, posts.length));
  };

  return (
    <>
      <div className="post-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {postsToShow.map((post) => (
          <PostCard
            post={post}
            categories={categories}
            key={post.slug}
          />
        ))}
      </div>

      {/* RENDER THE VIEW MORE BUTTON */}
      {hasMorePosts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleViewMore}
            className="px-6 py-3 border border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
}