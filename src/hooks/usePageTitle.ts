import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `W.Y.W — ${title}` : 'W.Y.W — What Do You Want?';
    return () => { document.title = 'W.Y.W — What Do You Want?'; };
  }, [title]);
}
