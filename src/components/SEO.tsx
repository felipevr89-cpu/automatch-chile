import { Helmet } from 'react-helmet-async';
import { carsData, brands } from '../data/brands';

interface Props {
  title?: string;
  description?: string;
}

const carCount = carsData.length;
const brandCount = brands.length;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AutoMatch Chile',
  url: 'https://automatchs.pages.dev',
  description: `Compara ${carCount} vehículos de ${brandCount} marcas en el mercado chileno.`,
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://automatchs.pages.dev/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export function SEO({ title, description }: Props) {
  const siteName = 'AutoMatch Chile';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Comparador de Autos 2026`;
  const desc = description || `Compara ${carCount} vehículos de ${brandCount} marcas en el mercado chileno. Precios, especificaciones, versiones y más.`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href="https://automatchs.pages.dev/" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
