"use client";
// NOTE: IPost and ICategory interfaces are assumed to be defined externally, 
// but external imports like next/image and next/link must be replaced for 
// guaranteed compilation in this environment.

// Mock interfaces for clarity since we can't import them:
interface ICategory {
  slug: string;
  name: string;
}

interface IPostEntry {
  title: string;
  summary?: string;
  heroImage?: string; // string URL
  publishDate: string;
  authors?: string[];
  categories?: string[]; // Array of category slugs
}

interface IPost {
  slug: string;
  entry: IPostEntry;
}


import React, { useEffect, useState } from "react";

// --- START: Self-contained Loading Component (Kept for compilation) ---
const Loading = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl">
    <svg 
      className="animate-spin h-6 w-6 text-red-600 mb-3" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-sm font-medium text-gray-700">{text}...</p>
  </div>
);
// --- END: Self-contained Loading Component ---


// Helper function for display time elapsed since post date
const formatTimeAgo = (dateString: string): string => {
  try {
      const postDate = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 24) {
          return `${diffInHours} hours ago`;
      } else if (diffInHours < 24 * 30) {
          const diffInDays = Math.floor(diffInHours / 24);
          return `${diffInDays} days ago`;
      } else {
          return postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      }
  } catch (e) {
      // Fallback for invalid date strings
      return 'N/A';
  }
};

export default function FeaturedPost() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // RESTORED: Use the original relative API path
        const apiUrl = "../"; 
        
        const resPost = await fetch(`${apiUrl}api/posts/featured`);
        const resCate = await fetch(`${apiUrl}api/posts/category`);
        
        const dataPost = await resPost.json();
        const dataCate = await resCate.json();

				console.log('dataCate_ ', dataCate);
				
        
        setPosts(dataPost);
        setCategories(dataCate);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // FIXED: Filtering logic checks if the post's categories array includes the active slug.
  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.entry.categories?.includes(activeTab));

  console.log('post_ ', posts);
    

  return (
    <>
      {loading ? (
        <div className="min-h-32 flex items-center justify-center">
          <Loading text="Loading Featured Post" />
        </div>
      ) : (
        <section className="featured-post bg-gray-50 py-8 font-sans">
          <script src="https://cdn.tailwindcss.com"></script>
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-6">
              {/* Tabs and View Toggle */}
              <div className="flex items-center justify-between border-b border-gray-200 mb-6 pt-4 pb-4 rounded-lg bg-white px-6 rounded-t-lg shadow-md">
                <div className="flex gap-8 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                      activeTab === "all"
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Latest Stories
                    {activeTab === "all" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                    )}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setActiveTab(category.slug)}
                      className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                        activeTab === category.slug
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {category.name}
                      {activeTab === category.slug && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 hidden sm:flex">
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="List View">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Grid View">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {filteredPosts.slice(0, 4).map((post: IPost) => (
                  <a 
                    href={`/post/${post.slug}`} 
                    key={post.slug}
                    className="group"
                  >
                    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-gray-200">
                        {post.entry.heroImage && (
                          <img // Using standard <img> tag
                            src={post.entry.heroImage}
                            alt={post.entry.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {/* Correctly render the Category Badge by checking categories array and returning JSX */}
                        {post.entry.categories && post.entry.categories.length > 0 && (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase z-10">
                            {/* Find the name of the first category by slug, or use the slug itself */}
                            {categories.find(c => c.slug === post.entry.categories![0])?.name || post.entry.categories[0]}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                          {post.entry.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {post.entry.summary || "A brief summary of the post content would go here..."}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {/* Use the date formatter */}
                            <span>{formatTimeAgo(post.entry.publishDate)}</span>
                            <span>•</span>
                            {/* Display authors array correctly */}
                            <span>By {post.entry.authors && post.entry.authors.length > 0 ? post.entry.authors.join(', ') : 'Lucy Hiddleston'}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1">
                            <button 
                              // Prevent default link navigation
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors flex items-center"
                              title="Like"
                            >
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              <span className="text-xs text-gray-600 ml-1">28</span>
                            </button>
                            <button 
                              // Prevent default link navigation
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors flex items-center"
                              title="Share"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                              <span className="text-xs text-gray-600 ml-1">72</span>
                            </button>
                            <button 
                              // Prevent default link navigation
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Bookmark"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                ))}
                {filteredPosts.length === 0 && (
                    <div className="md:col-span-2 text-center py-10 text-gray-500">
                        No featured posts found for this category.
                    </div>
                )}
              </div>

              {/* View More Button */}
              <div className="flex justify-center">
                <button className="px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded hover:bg-red-600 hover:text-white transition-colors">
                  VIEW MORE
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
