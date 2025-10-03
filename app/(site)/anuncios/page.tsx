import React from "react";

export default function AnunciosPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="mb-2 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h1 className="text-white text-xl font-bold tracking-wide">Anuncios en Dominicanna</h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="py-5">
        <p className="text-gray-600 text-lg mb-8">
          Información sobre publicidad y oportunidades publicitarias en Dominicanna
        </p>
      </div>

      {/* ¿Por qué anunciarse con nosotros? */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">¿Por qué anunciarse con nosotros?</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            Dominicanna es la primera revista digital especializada en el mundo del cannabis en República Dominicana. Ofrecemos una plataforma única para conectar marcas y productos con una audiencia altamente interesada y comprometida.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-black mb-2">✓ Audiencia Especializada</h3>
              <p className="text-gray-700">Llegue a lectores apasionados por el Cannabis y temas relacionados.</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">✓ Contenido de Calidad</h3>
              <p className="text-gray-700">Nuestros artículos informativos posicionan las marcas junto a información relevante.</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">✓ Comunidad Enfocada</h3>
              <p className="text-gray-700">Únase a conversaciones significativas sobre el cannabis en República Dominicana.</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">✓ Formatos Flexibles</h3>
              <p className="text-gray-700">Ofrecemos diversas opciones publicitarias adaptadas a sus necesidades.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tipos de Anuncios */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Tipos de Anuncios Disponibles</h2>
          </div>
        </div>
        <div className="py-5 space-y-4">
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Banner Publicitario</h3>
            <p className="text-gray-700 mb-2">
              Ubicación destacada en la homepage y páginas de categorías. Dimensiones estándares: 728x90 (horizontal) y 300x250 (cuadrado).
            </p>
            <p className="text-sm text-gray-600"><strong>Tiempo mínimo:</strong> 1 mes</p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Publicación Patrocinada</h3>
            <p className="text-gray-700 mb-2">
              Artículo patrocinado con su marca/empresa integrado en nuestro flujo editorial. Mantiene la credibilidad del contenido informativo.
            </p>
            <p className="text-sm text-gray-600"><strong>Tiempo mínimo:</strong> 1 publicación</p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Widget Lateral</h3>
            <p className="text-gray-700 mb-2">
              Ubicación fija en la barra lateral, visible en todas las páginas de artículos. Ideal para llamadas a la acción.
            </p>
            <p className="text-sm text-gray-600"><strong>Tiempo mínimo:</strong> 1 mes</p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Newsletter y Redes Sociales</h3>
            <p className="text-gray-700 mb-2">
              Promoción a través de nuestros boletines y redes sociales. Incluye menciones y enlaces patrocinados.
            </p>
            <p className="text-sm text-gray-600"><strong>Tiempo mínimo:</strong> Una campaña</p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Logo en Footer</h3>
            <p className="text-gray-700 mb-2">
              Presencia discreta pero permanente en el footer de todas las páginas. Perfecto para branding de largo plazo.
            </p>
            <p className="text-sm text-gray-600"><strong>Tiempo mínimo:</strong> 3 meses</p>
          </div>
        </div>
      </div>

      {/* Directrices de los Anuncios */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Directrices de los Anuncios</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            Nos aseguramos de que todos los anuncios cumplan con nuestros estándares éticos y legales. Todas las campañas publicitarias deben alinearse con los valores de Dominicanna.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Productos y servicios deben cumplir con las leyes dominicanas</li>
            <li>No se aceptan anuncios de tabaco, alcohol o contenido controvertido</li>
            <li>Los anuncios deben ser veraces y no engañosos</li>
            <li>Todas las reclamaciones deben estar respaldadas por evidencia</li>
            <li>Respeto por la diversidad y la inclusión en todo el contenido publicitario</li>
          </ul>
        </div>
      </div>

      {/* Contacto */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Contáctanos</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            ¿Interesado en anunciarse con nosotros? Nos encantaría conversar sobre sus necesidades publicitarias.
          </p>
          <p className="leading-relaxed text-gray-800 mb-4">
            Para obtener más información o solicitar un presupuesto personalizado, contáctenos:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> hello.dominicanna@hotmail.com</p>
            <p><strong>Proceso:</strong> Responderemos a su consulta en menos de 24 horas hábiles</p>
          </div>
          <div className="mt-6 mb-4">
            <a className="bg-black hover:bg-gray-800 hover:text-white text-white px-6 py-3 font-bold tracking-wide transition-colors" href="mailto:hello.dominicanna@hotmail.com" target="_blank" rel="noopener noreferrer">
              Solicitar Información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
