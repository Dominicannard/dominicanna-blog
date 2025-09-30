"use client";

import React, { useEffect, useState } from "react";

interface ICategory {
  slug: string;
  name: string;
}

interface IPostEntry {
  title: string;
  summary?: string;
  heroImage?: string;
  publishDate: string;
  authors?: string[];
  categories?: string[];
}

interface IPost {
  slug: string;
  entry: IPostEntry;
}

export const Loading = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <svg 
      className="animate-spin h-6 w-6 text-red-600 mb-3" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

export default function FeaturedPost() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = "../"; 
        const resPost = await fetch(`${apiUrl}api/posts/featured`);
        const resCate = await fetch(`${apiUrl}api/posts/category`);
        const dataPost = await resPost.json();
        const dataCate = await resCate.json();
        
        setPosts(dataPost);
        setCategories(dataCate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.entry.categories?.includes(activeTab));

  // Get exactly 6 posts
  const displayPosts = filteredPosts.slice(0, 6);
  
  return (
    <>
      {loading ? (
        <div className="min-h-32 flex items-center justify-center">
          <Loading text="Loading Featured Post" />
        </div>
      ) : (
        <section className="featured-post bg-black py-4 font-sans">
          <div className="w-full">
            {/* Header with Title */}
            <div className="text-center mb-4">
              <h2 className="text-white text-md font-bold">Noticias Destacadas</h2>
            </div>
            
            {/* Fixed Grid of 6 Posts */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
              {displayPosts.map((post: IPost) => (
                <a 
                  href={`/post/${post.slug}`} 
                  key={post.slug}
                  className="group relative border-r border-black last:border-r-0"
                >
                  <article className="bg-white h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500">
                      {post.entry.heroImage ? (
                        <img
                          src={post.entry.heroImage}
                          alt={post.entry.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {post.entry.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Plus Icon Button */}
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md z-10"
                        title="Add to reading list"
                      >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>

                      {/* Site Badge */}
                      {post.entry?.categories && post.entry?.categories.length > 0 && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-80 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase">
                          {post.entry?.categories[0]}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 bg-white flex-grow flex flex-col">
                      <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-4">
                        {post.entry.title}
                      </p>
                    </div>
                  </article>
                </a>
              ))}

              {/* Fill empty slots to keep grid balance */}
              {displayPosts.length < 6 &&
                Array.from({ length: 6 - displayPosts.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="bg-gray-800 h-full border-r border-black last:border-r-0"
                  ></div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}