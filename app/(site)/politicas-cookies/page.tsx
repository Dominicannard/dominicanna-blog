import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Política de Cookies - Dominicanna",
	description: "Política de cookies de Dominicanna. Información sobre el uso de cookies en nuestro sitio web.",
	alternates: {
		canonical: "/politicas-cookies",
	},
};

export default function PoliticasCookiesPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="mb-2 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h1 className="text-white text-xl font-bold tracking-wide">Política de Cookies</h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="py-5">
        <p className="text-gray-600 text-lg mb-8">
          Información sobre el uso de cookies en Dominicanna
        </p>
      </div>

      {/* ¿Qué son las cookies? */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">¿Qué son las cookies?</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a recordar tus preferencias, mejorar tu experiencia de navegación y proporcionar funcionalidades importantes.
          </p>
          <p className="leading-relaxed text-gray-800">
            En Dominicanna, utilizamos cookies para garantizar el funcionamiento correcto del sitio, recordar tus configuraciones y analizar el uso del sitio web.
          </p>
        </div>
      </div>

      {/* Tipos de cookies que utilizamos */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Tipos de cookies que utilizamos</h2>
          </div>
        </div>
        <div className="py-5 space-y-3">
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Cookies estrictamente necesarias</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Estas cookies son esenciales para el funcionamiento básico del sitio web. Permiten la navegación y el uso de las funciones principales. Sin estas cookies, el sitio no funcionaría correctamente.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duración:</strong> Hasta el cierre del navegador o sesión (las de sesión) o 2 días (de inicio de sesión).
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Cookies de preferencias</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Estas cookies recuerdan tus elecciones, como tu nombre, dirección de correo electrónico y preferencias de visualización. Mejoran tu experiencia personalizando el sitio.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duración:</strong> 1 año o 2 semanas (si se selecciona &quot;Recordarme&quot;).
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Cookies de análisis</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Utilizamos herramientas como Google Analytics para entender cómo los visitantes interactúan con nuestro sitio. Esta información nos ayuda a mejorar nuestros contenidos y servicios.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duración:</strong> 26 meses.
            </p>
          </div>
          <div className="bg-white border-b border-gray-300 p-4 hover:bg-gray-100 transition-colors">
            <h3 className="font-bold text-black mb-2">Cookies de terceros</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Podemos incluir contenido incrustado de otros sitios web (como videos de YouTube o posts de redes sociales). Estos servicios pueden establecer sus propias cookies para trazar tu interacción.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duración:</strong> Depende de cada servicio tercero.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Cómo gestionar las cookies? */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">¿Cómo gestionar las cookies?</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800 mb-4">
            Puedes controlar y gestionar las cookies a través de la configuración de tu navegador web. La mayoría de los navegadores permiten:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Ver qué cookies tienes instaladas y eliminarlas individualmente</li>
            <li>Bloquear cookies de terceros</li>
            <li>Bloquear cookies de ciertos sitios</li>
            <li>Eliminar todas las cookies cuando cierres el navegador</li>
            <li>Rechazar cookies automáticamente</li>
          </ul>
          <p className="leading-relaxed text-gray-800 mt-4 mb-4">
            Ten en cuenta que deshabilitar ciertas cookies puede afectar el funcionamiento del sitio web.
          </p>
        </div>
      </div>

      {/* Cambios en nuestra política de cookies */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Cambios en nuestra política de cookies</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800">
            Podemos actualizar esta política de cookies para reflejar cambios en nuestras prácticas o por razones legales, regulatorias o operativas. Te recomendamos revisar esta política periódicamente para mantenerte informado sobre cómo utilizamos las cookies.
          </p>
        </div>
      </div>

      {/* Contacto */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Contacto</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <p className="leading-relaxed text-gray-800">
            Si tienes preguntas sobre nuestra política de cookies o deseas ejercer tus derechos relacionados con las cookies, puedes contactarnos a través de nuestro formulario de contacto en la página de contacto.
          </p>
        </div>
      </div>
    </div>
  );
}
