import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    performance: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('wyw-cookie-consent');
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (data: typeof prefs) => {
    localStorage.setItem('wyw-cookie-consent', JSON.stringify({ ...data, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[800] w-[calc(100%-3rem)] max-w-[860px] bg-card border border-border shadow-lg animate-fade-in sm:bottom-6">
      {!showDetail ? (
        <div className="flex items-center justify-between gap-4 p-4 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <p className="font-body text-[0.8rem] font-medium text-foreground mb-0.5">We use cookies</p>
            <p className="font-body text-[0.72rem] text-muted-foreground leading-relaxed">
              To personalise your experience and analyse site performance.{' '}
              <a href="/cookies" className="text-primary underline underline-offset-2">Learn more</a>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowDetail(true)}
              className="inline-flex items-center gap-1.5 font-body text-[0.65rem] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
            >
              <Settings className="h-3.5 w-3.5" strokeWidth={1.5} /> Manage
            </button>
            <button
              onClick={() => save({ essential: true, performance: false, functional: false, marketing: false })}
              className="font-body text-[0.65rem] tracking-[0.1em] uppercase border border-border px-4 py-2 text-foreground hover:border-foreground transition-colors"
            >
              Essential only
            </button>
            <button
              onClick={() => save({ essential: true, performance: true, functional: true, marketing: true })}
              className="font-body text-[0.65rem] tracking-[0.1em] uppercase bg-foreground text-background px-4 py-2 hover:bg-primary transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body text-[0.85rem] font-medium text-foreground">Cookie preferences</h3>
            <button onClick={() => setShowDetail(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="border-t border-border">
            {[
              { key: 'essential' as const, label: 'Essential', desc: 'Required for the site to function.', locked: true },
              { key: 'performance' as const, label: 'Performance', desc: 'Helps us understand how visitors use the site.', locked: false },
              { key: 'functional' as const, label: 'Functional', desc: 'Remembers preferences like dark mode.', locked: false },
              { key: 'marketing' as const, label: 'Marketing', desc: 'Used for personalised recommendations.', locked: false },
            ].map(({ key, label, desc, locked }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-body text-[0.78rem] font-medium text-foreground">{label}</p>
                  <p className="font-body text-[0.7rem] text-muted-foreground">{desc}</p>
                </div>
                <button
                  onClick={() => !locked && setPrefs(p => ({ ...p, [key]: !p[key] }))}
                  disabled={locked}
                  className={`relative w-10 h-[22px] rounded-full border transition-colors flex-shrink-0 ${
                    prefs[key] ? 'bg-primary border-primary' : 'bg-transparent border-border'
                  } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full transition-transform ${
                    prefs[key] ? 'translate-x-[18px] bg-primary-foreground' : 'translate-x-0 bg-muted-foreground'
                  }`} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => save(prefs)}
              className="font-body text-[0.65rem] tracking-[0.1em] uppercase bg-foreground text-background px-6 py-2.5 hover:bg-primary transition-colors"
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
