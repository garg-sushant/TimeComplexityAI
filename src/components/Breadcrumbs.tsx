import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-on-surface-variant font-medium mb-6 px-4">
      <Link to="/time-complexity-calculator" className="flex items-center hover:text-primary transition-colors">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        // Format string (e.g. time-complexity-calculator -> Time Complexity Calculator)
        const formatTitle = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 opacity-50" />
            {last ? (
              <span className="text-on-surface font-bold truncate max-w-[200px] md:max-w-max" aria-current="page">
                {formatTitle(value)}
              </span>
            ) : (
              <Link to={to} className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-max">
                {formatTitle(value)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
