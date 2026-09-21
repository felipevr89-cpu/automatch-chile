# AutoMatch Chile - Tareas Pendientes

## 🔴 Prioridad 1 — Renombrar: AutoLupa ✅ ELEGIDO

> **Problema resuelto:** AutoMatch choca con [automatchchile.cl](https://www.automatchchile.cl/) (concesionario en Talca).
> **Nuevo nombre:** **AutoLupa** 🔍 — "examinar cada auto de cerca"
>
> **Justificación:** Visual, único, explica la plataforma (catálogo + comparador + TCO + fichas técnicas). Los handles @autolupa en Instagram/Twitter están abandonados (1 seguidor, sin actividad). Dominio `autolupa.cl` disponible.

### Criterios cumplidos
- [x] Dominio `.cl` disponible (autolupa.cl)
- [x] Fácil de pronunciar en español chileno
- [x] No confundir con concesionario/venta directa
- [x] SEO-friendly (lupa = examinar, comparar, revisar)
- [x] Nombre único en el rubro automotriz chileno

### Tareas del rename
- [ ] Comprar dominio `autolupa.cl` (si aplica)
- [ ] Cambiar `name` en `package.json`
- [ ] Cambiar `title` y `og:title` en `index.html`
- [ ] Actualizar `manifest.json` (name, short_name, start_url)
- [ ] Actualizar `Navbar.tsx` (logo/texto del header)
- [ ] Actualizar `Footer.tsx` (copyright y nombre)
- [ ] Actualizar `SEO.tsx` (title, description, canonical por ruta)
- [ ] Actualizar `sitemap.xml`
- [ ] Actualizar `wrangler.toml` (name del proyecto Cloudflare)
- [ ] Renombrar proyecto en Cloudflare Pages (automatchs → autolupa)
- [ ] Renombrar repo GitHub si aplica
- [ ] Actualizar `AGENTS.md` y `SUMMARY.md`
- [ ] Buscar y reemplazar todas las menciones a "AutoMatch" en código
- [ ] Verificar que no queden referencias al nombre antiguo

---

## 🟠 Prioridad 2 — Deploy y estabilidad
- [x] Commit de pase de fotos 2026 + funcionalidades
- [ ] Push a GitHub (⏳ en curso)
- [ ] Verificar deploy automático en Cloudflare Pages
- [ ] Confirmar que las 131 fotos nuevas cargan en producción
- [ ] Verificar Performance (Lighthouse) — el chunk index >950 KB puede afectar carga

---

## 🟡 Prioridad 3 — Sección de Usados (en planeación)
- [ ] Definir modelo de negocio (marketplace, lead gen, directo)
- [ ] Autenticación (Firebase Auth)
- [ ] Formulario de publicación de vehículos
- [ ] Upload de fotos (Storage)
- [ ] Moderación / aprobación de publicaciones
- [ ] Chat entre comprador y vendedor
- [ ] Geolocalización / región
- [ ] Paginación / infinite scroll para listings

---

## 🟢 Prioridad 4 — Mejoras de datos
- [ ] Completar consumo Lynk & Co 09 (MHEV 2.0T)
- [ ] Completar batería/autonomía DFSK Glory iX5 EV
- [ ] Verificar marcas nuevas 2026 (anuncios oficiales Chile)
- [ ] Reducir las 54 siluetas restantes (buscar fotos en Commons)
- [ ] Auditoría de precios vs sitio oficial (actualización semestral)

---

## 🔵 Prioridad 5 — UX y rendimiento
- [ ] Code-splitting del chunk index (950 KB) → lazy load por ruta
- [ ] Lazy load de imágenes del catálogo (IntersectionObserver)
- [ ] Skeleton loading mejorado en todas las páginas
- [ ] Breadcrumb visible en todas las rutas internas
- [ ] Share buttons (WhatsApp, copiar link)
- [ ] PWA: notificaciones push para nuevos lanzamientos
- [ ] Analytics (Plausible/Umami, sin cookies)

---

## 🟣 Prioridad 6 — SEO y marketing
- [ ] Structured data (JSON-LD) para autos
- [ ] Blog / sección de guías de compra
- [ ] Landing pages por marca (ej: /marca/toyota)
- [ ] Meta tags optimizados por página
- [ ] Google Search Console setup
- [ ] Sitemap dinámico (generado desde datos)

---

## ⚪ Prioridad 7 — Monetización (futuro)
- [ ] Google AdSense / ads contextuales
- [ ] Afiliados (seguros, créditos, accesorios)
- [ ] Featured listings (pago por destacar)
- [ ] API pública del catálogo (B2B)
