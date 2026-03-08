import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 pt-5 mb-8">
      {crumbs.map((crumb, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i < crumbs.length - 1 ? (
            <>
              <Link
                to={crumb.to || '/'}
                className="font-body text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
            </>
          ) : (
            <span className="font-body text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground/70">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
