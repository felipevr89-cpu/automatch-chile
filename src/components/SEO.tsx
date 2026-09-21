import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { carsData, brands } from '../data/brands';

interface Props {
  title?: string;
  description?: string;
}

const siteUrl = 'https://automatchs.pages.dev';

const carCount = carsData.length;
const brandCount = brands.length;

export function SEO({ title, description }: Props) {
  const { pathname } = useLocation();
  const siteName = 'AutoMatch Chile';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Comparador de Autos ${new Date().getFullYear()}`;
  const desc = description || `Compara ${carCount} vehículos de ${brandCount} marcas en el mercado chileno. Precios, especificaciones, versiones y más.`;
  const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}