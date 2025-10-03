import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="mb-2 mt-4 flex items-start">
        <div className="w-1 bg-black mr-6 self-stretch min-h-[50px]"></div>
        <div className="bg-black px-6 py-2">
          <h1 className="text-white text-xl font-bold tracking-wide">Contáctanos</h1>
        </div>
      </div>

      {/* Subtitle */}
      <div className="py-5">
        <p className="text-gray-600 text-lg mb-8">
          ¿Tienes preguntas, sugerencias o deseas anunciar en Dominicanna? Estamos aquí para escucharte.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Información de Contacto</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <div className="space-y-8 text-center">
            <div>
              <h3 className="font-semibold text-black mb-4">Envíanos un Email</h3>
              <p className="text-2xl font-bold text-blue-600">
                <a href="mailto:hello.dominicanna@hotmail.com" className="hover:underline">
                  hello.dominicanna@hotmail.com
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Para cualquier consulta o información sobre Dominicanna
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">Horario de Atención</h3>
              <p className="text-gray-700">
                Lunes a Viernes: 9:00 AM - 6:00 PM AST
              </p>
              <p className="text-gray-700">
                Respondemos todos los emails dentro de 24-48 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ or Additional Info */}
      <div className="mt-12">
        <div className="mb-2 flex items-start">
          <div className="w-1 bg-black mr-6 self-stretch min-h-[40px]"></div>
          <div className="bg-black px-4 py-1">
            <h2 className="text-white text-md font-bold tracking-wide">Preguntas Frecuentes</h2>
          </div>
        </div>
        <div className="py-5 bg-white border-b border-gray-300 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-black mb-2">¿Cuánto tiempo tarda la respuesta?</h3>
              <p className="text-gray-700">Respondemos a todas las consultas dentro de 24-48 horas hábiles.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">¿Cómo puedo anunciar en Dominicanna?</h3>
              <p className="text-gray-700">
                Visita nuestra página de <a href="/anuncios" className="text-blue-600 hover:underline">anuncios</a> o
                contáctanos directamente para información sobre oportunidades publicitarias.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">¿Aceptan propuestas de artículos?</h3>
              <p className="text-gray-700">Sí, revisamos propuestas de contenido relacionado con la planta Cannabis Sativa L.. Envíanos tu idea, propuesta, noticia, experiencia, contenido por email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
