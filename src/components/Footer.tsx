export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AutoMatch</h3>
            <p className="text-sm leading-relaxed">
              El comparador de vehículos más completo de Chile. Encuentra, compara y elige el auto ideal para ti.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Herramientas</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Comparador de autos</a></li>
              <li><a href="/compare" className="hover:text-white transition-colors">Comparar seleccionados</a></li>
              <li><a href="/favorites" className="hover:text-white transition-colors">Mis favoritos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-default">Términos y condiciones</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Política de privacidad</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Contacto: info@automatch.cl</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Marcas 2026</h4>
            <p className="text-sm leading-relaxed">
              Más de 80 marcas y 400+ modelos disponibles en el mercado chileno. Actualizado constantemente.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} AutoMatch Chile. Todos los derechos reservados.</p>
          <p className="mt-1 text-xs">Los precios son referenciales y pueden variar según concesionario.</p>
        </div>
      </div>
    </footer>
  );
}
