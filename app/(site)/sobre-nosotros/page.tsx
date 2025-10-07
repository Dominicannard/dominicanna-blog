import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sobre Nosotros - Dominicanna",
	description: "Conoce más sobre Dominicanna, la primera revista dominicana dedicada al mundo del cannabis.",
	alternates: {
		canonical: "/sobre-nosotros",
	},
};

export default function SobreNosotrosPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="mb-2 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h1 className="text-white text-xl font-bold tracking-wide">Sobre Dominicanna</h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="py-5">
        <p className="text-gray-600 text-lg mb-8">
          La voz autorizada del cannabis en República Dominicana
        </p>
      </div>

      {/* Nuestra Historia */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Nuestra Historia</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            Dominicanna es la primera revista dominicana en línea dedicada exclusivamente al mundo del cannabis. Con un enfoque informativo y educativo, la revista se posiciona como una plataforma para explorar y discutir diversos aspectos relacionados con esta planta y su impacto en la sociedad.
          </p>
          <p className="leading-relaxed text-gray-800">
            A través de artículos profundos, entrevistas exclusivas, reportajes de campo y análisis especializados, Dominicanna busca brindar a sus lectores una visión integral sobre la planta Cannabis Sativa L., desde sus usos medicinales y terapéuticos hasta su influencia cultural y su potencial económico.
          </p>
        </div>
      </div>

      {/* Misión, Visión, Valores */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Misión, Visión y Valores</h2>
          </div>
        </div>
        <div className="py-5 space-y-4">
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Con un enfoque innovador y comprometido con la información precisa y actualizada, nos posicionamos como referentes en el diálogo abierto sobre el cannabis y su rol en la sociedad dominicana contemporánea.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Visión</h3>
            <p className="text-gray-700 leading-relaxed">
              Ser el puente entre la comunidad dominicana y el mundo del cannabis, fomentando el conocimiento responsable y el progreso social en República Dominicana y más allá.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Valores</h3>
            <p className="text-gray-700 leading-relaxed">
              Transparencia, educación, innovación y compromiso con la comunidad. Valoramos la diversidad de opiniones y el respeto por las experiencias individuales.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Qué nos hace únicos? */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">¿Qué nos hace únicos?</h2>
          </div>
        </div>
        <div className="py-5 space-y-3">
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">✓ Enfoque Educativo y Objetivo</h3>
            <p className="text-gray-700 leading-relaxed">
              Información basada en evidencia científica y experiencias reales, sin prejuicios ni sensacionalismo.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">✓ Voz Dominicana Auténtica</h3>
            <p className="text-gray-700 leading-relaxed">
              Entendemos las realidades culturales, legales y sociales del cannabis en República Dominicana.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">✓ Comunidad Inclusiva</h3>
            <p className="text-gray-700 leading-relaxed">
              Un espacio seguro para dialogar, aprender y compartir experiencias sobre el cannabis.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">✓ Contenido Actualizado</h3>
            <p className="text-gray-700 leading-relaxed">
              Mantenernos al día con las últimas investigaciones y desarrollos en la industria del cannabis.
            </p>
          </div>
        </div>
      </div>

      {/* Únete a la Conversación */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Únete a la Conversación</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            ¿Tienes preguntas sobre el cannabis? ¿Quieres compartir tu historia? Estamos aquí para escuchar y aprender juntos.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="bg-black hover:bg-gray-800 hover:text-white text-white px-4 py-2 text-sm font-bold tracking-wide transition-colors"
            >
              Contáctanos
            </a>
            <a
              href="/post"
              className="bg-black hover:bg-gray-800 hover:text-white text-white px-4 py-2 text-sm font-bold tracking-wide transition-colors"
            >
              Lee Nuestros Artículos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
