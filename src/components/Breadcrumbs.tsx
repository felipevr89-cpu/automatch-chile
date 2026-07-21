import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link to={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
