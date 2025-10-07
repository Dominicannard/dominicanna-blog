import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Reader } from "@/app/keystatic/utils";

export const metadata: Metadata = {
	title: "Mapa del Sitio - Dominicanna",
	description: "Mapa del sitio de Dominicanna. Navega fácilmente por todas las secciones de nuestra revista sobre cannabis.",
	alternates: {
		canonical: "/mapa-del-sitio",
	},
};

async function getSitemapData() {
  const reader = await Reader();
  const [posts, categories, authors] = await Promise.all([
    reader.collections.posts.all(),
    reader.collections.categories.all(),
    reader.collections.authors.all(),
  ]);

  return {
    posts: posts.map(post => ({
      title: post.entry.title,
      slug: post.slug,
      publishDate: post.entry.publishDate
    })),
    categories: categories.map(cat => ({
      title: cat.entry.category,
      slug: cat.slug
    })),
    authors: authors.map(author => ({
      title: author.entry.name,
      slug: author.slug
    }))
  };
}

export default async function MapaDelSitioPage() {
  const data = await getSitemapData();

  const staticPages = [
    { title: "Inicio", url: "/" },
    { title: "Sobre Nosotros", url: "/sobre-nosotros" },
    { title: "Política de Privacidad", url: "/politicas-privacidad" },
    { title: "Política de Cookies", url: "/politicas-cookies" },
    { title: "Anuncios", url: "/anuncios" },
    { title: "Mapa del Sitio", url: "/mapa-del-sitio" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans" suppressHydrationWarning>
      {/* Header */}
      <div className="mb-2 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h1 className="text-white text-xl font-bold tracking-wide">Mapa del Sitio</h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="py-5">
        <p className="text-gray-600 text-lg mb-8">
          Navega fácilmente por todas las secciones de Dominicanna
        </p>
      </div>

      {/* Páginas Estáticas */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Páginas Principales</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            {staticPages.map((page) => (
              <Link
                key={page.url}
                href={page.url}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 p-3 rounded transition-colors block"
              >
                <span className="font-semibold text-gray-800">{page.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Categorías</h2>
          </div>
        </div>
        <div className="py-5 space-y-3">
          {data.categories.map((category) => (
            <div key={category.slug} className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
              <Link href={`/post/category/${category.slug}`} className="block">
                <span className="font-semibold text-black">{category.title}</span>
              </Link>
            </div>
          ))}
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <Link href="/post" className="block">
              <span className="font-semibold text-black">Todas las Publicaciones</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Publicaciones Recientes */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Publicaciones Recientes</h2>
          </div>
        </div>
        <div className="py-5 space-y-3" suppressHydrationWarning>
          {data.posts.slice(0, 10).map((post) => (
            <div key={post.slug} className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors" suppressHydrationWarning>
              <Link href={`/post/${post.slug}`} className="block">
                <h3 className="font-semibold text-black mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600">
                  {post.publishDate ? new Date(post.publishDate).toLocaleDateString('es-ES') : 'Sin fecha'}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Autores */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Autores</h2>
          </div>
        </div>
        <div className="py-5 space-y-3">
          {data.authors.map((author) => (
            <div key={author.slug} className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
              <Link href={`/author/${author.slug}`} className="block">
                <span className="font-semibold text-black">{author.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Búsqueda */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Búsqueda</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <Link href="/post/search" className="block">
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 font-bold tracking-wide transition-colors">
              Buscar Publicaciones
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
