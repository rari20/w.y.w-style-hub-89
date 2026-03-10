import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { socialPlatforms, socialPostTemplates } from '@/data/adminData';

export default function AdminSocial() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(socialPlatforms.map(p => [p.name, true]))
  );
  const [handles, setHandles] = useState<Record<string, string>>(
    Object.fromEntries(socialPlatforms.map(p => [p.name, p.handle]))
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display">Social Media & Brand Links</h1>
          <p className="text-xs text-muted-foreground font-body">Manage W.Y.W's social presence and track engagement across platforms.</p>
        </div>

        {/* Platform cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPlatforms.map(p => (
            <Card key={p.name}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-[10px] font-bold font-body shrink-0`}>
                    {p.abbr}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-body font-medium">{p.name}</p>
                  </div>
                </div>
                {p.followers && <p className="text-xs text-muted-foreground">{p.followers} followers</p>}
                <Input
                  value={handles[p.name]}
                  onChange={e => setHandles(prev => ({ ...prev, [p.name]: e.target.value }))}
                  className="text-xs h-8"
                  onBlur={() => toast.success(`${p.name} handle updated.`)}
                />
                <p className="text-[10px] text-muted-foreground truncate">{p.link}</p>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 w-full" onClick={() => copyToClipboard(p.link)}>
                  <Copy className="h-3 w-3" /> Copy Link
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer toggles */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-body font-medium">Social Links on Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {socialPlatforms.map(p => (
                <label key={p.name} className="flex items-center justify-between gap-3 text-xs font-body p-2 rounded border border-border">
                  <span>{p.name}</span>
                  <input type="checkbox" checked={toggles[p.name]} onChange={e => setToggles(prev => ({ ...prev, [p.name]: e.target.checked }))} className="accent-primary" />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Post templates */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-body font-medium">Promotional Social Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {socialPostTemplates.map((t, i) => (
              <div key={i} className="p-3 border border-border rounded flex items-start gap-3">
                <p className="text-xs font-body text-muted-foreground flex-1">{t}</p>
                <Button size="sm" variant="outline" className="text-xs gap-1 shrink-0" onClick={() => copyToClipboard(t)}>
                  <Copy className="h-3 w-3" /> Copy
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
