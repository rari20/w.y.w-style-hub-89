import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const tiers = [
  { name: 'Watt', value: 4850, max: 6540, color: 'bg-amber-500' },
  { name: 'Surge', value: 6540, max: 6540, color: 'bg-blue-500' },
  { name: 'Volt', value: 4432, max: 6540, color: 'bg-orange-500' },
  { name: 'Spark', value: 2005, max: 6540, color: 'bg-muted-foreground/40' },
];

const churnIndicators = [
  { label: 'Total Spend < £500', pct: 100 },
  { label: 'Loyalty Tier = Spark', pct: 100 },
  { label: 'Email Engagement = No', pct: 100 },
  { label: 'No Consultation Booked', pct: 100 },
  { label: 'Satisfaction Score ≤ 3', pct: 100 },
  { label: 'Days Inactive > 60', pct: 80 },
];

const funnel = [
  { label: 'Targeted', value: 5, width: '100%' },
  { label: 'Emails Sent', value: 5, width: '100%' },
  { label: 'Opened', value: 2, width: '40%' },
  { label: 'Clicked', value: 1, width: '20%' },
  { label: 'Converted', value: 0, width: '4%' },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-display">Analytics</h1>

        {/* Churn Analysis */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Churn Analysis</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-display text-green-600">67%</p>
                <p className="text-xs text-muted-foreground font-body">Retained</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-red-500">33%</p>
                <p className="text-xs text-muted-foreground font-body">Churn Risk</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-3 font-mono">CC = e/t = 5/15 = 0.33 (33%)</p>
          </CardContent>
        </Card>

        {/* Revenue by Tier */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Revenue by Tier</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {tiers.map(t => (
              <div key={t.name} className="space-y-1.5">
                <div className="flex justify-between text-sm font-body">
                  <span>{t.name}</span>
                  <span className="font-medium">£{t.value.toLocaleString()}</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${(t.value / t.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Churn Risk Indicators */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Top Churn Risk Indicators</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {churnIndicators.map(ci => (
              <div key={ci.label} className="space-y-1">
                <div className="flex justify-between text-xs font-body">
                  <span>{ci.label}</span>
                  <span className="text-muted-foreground">{ci.pct === 100 ? '5/5' : '4/5'} ({ci.pct}%)</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${ci.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Retention Campaign Effectiveness */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Retention Campaign Effectiveness</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {funnel.map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="text-xs font-body w-24 shrink-0 text-right">{f.label}</span>
                  <div className="flex-1 h-8 rounded bg-muted overflow-hidden">
                    <div className="h-full bg-primary/70 rounded flex items-center pl-3 transition-all" style={{ width: f.width }}>
                      <span className="text-[10px] font-bold text-primary-foreground">{f.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
