import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { carsData, brands } from '../data/brands';

interface Props {
  title?: string;
  description?: string;
}

const siteUrl = 'https://autolupa.pages.dev';

const carCount = carsData.length;
const brandCount = brands.length;

export function SEO({ title, description }: Props) {
  const { pathname } = useLocation();
  const siteName = 'AutoLupa';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Comparador de Autos ${new Date().getFullYear()}`;
  const desc = description || `Compara ${carCount} vehículos de ${brandCount} marcas en el mercado chileno. Precios, especificaciones, versiones y más.`;
  const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

  const jsonLd = pathname === '/'
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: desc,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: fullTitle,
        description: desc,
        url: canonical,
        isPartOf: {
          '@type': 'WebSite',
          name: siteName,
          url: siteUrl,
        },
      };

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
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}