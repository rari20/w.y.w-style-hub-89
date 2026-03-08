import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { datasetTotals, customers } from '@/data/adminData';

const maxRevenue = Math.max(datasetTotals.revenueWatt, datasetTotals.revenueSurge, datasetTotals.revenueVolt, datasetTotals.revenueSpark);
const tiers = [
  { name: 'Watt', value: datasetTotals.revenueWatt, max: maxRevenue, color: 'bg-amber-500' },
  { name: 'Surge', value: datasetTotals.revenueSurge, max: maxRevenue, color: 'bg-blue-500' },
  { name: 'Volt', value: datasetTotals.revenueVolt, max: maxRevenue, color: 'bg-orange-500' },
  { name: 'Spark', value: datasetTotals.revenueSpark, max: maxRevenue, color: 'bg-muted-foreground/40' },
];

const churnCustomers = customers.filter(c => c.churnRisk === 'High');
const churnCount = churnCustomers.length;

const churnIndicators = [
  { label: 'Total Spend < £500', count: churnCustomers.filter(c => c.totalSpend < 500).length },
  { label: 'Loyalty Tier = Spark', count: churnCustomers.filter(c => c.loyaltyTier === 'Spark').length },
  { label: 'Email Engagement = No', count: churnCustomers.filter(c => !c.emailEngaged).length },
  { label: 'No Consultation Booked', count: churnCustomers.filter(c => c.consultations === 0).length },
  { label: 'Satisfaction Score ≤ 3', count: churnCustomers.filter(c => c.satisfaction <= 3).length },
  { label: 'Days Inactive > 60', count: churnCustomers.filter(c => c.daysInactive > 60).length },
];

const funnel = [
  { label: 'Targeted', value: churnCount, width: '100%' },
  { label: 'Emails Sent', value: churnCount, width: '100%' },
  { label: 'Opened', value: 10, width: `${(10 / churnCount) * 100}%` },
  { label: 'Clicked', value: 5, width: `${(5 / churnCount) * 100}%` },
  { label: 'Converted', value: 0, width: '4%' },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-display">Analytics</h1>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Churn Analysis</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-display text-green-600">50%</p>
                <p className="text-xs text-muted-foreground font-body">Retained</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-red-500">50%</p>
                <p className="text-xs text-muted-foreground font-body">Churn Risk</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-3 font-mono">CC = e/t = {churnCount}/{datasetTotals.totalCustomers} = {datasetTotals.churnCoefficient.toFixed(2)} ({(datasetTotals.churnCoefficient * 100).toFixed(0)}%)</p>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-body font-medium">Top Churn Risk Indicators</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {churnIndicators.map(ci => (
              <div key={ci.label} className="space-y-1">
                <div className="flex justify-between text-xs font-body">
                  <span>{ci.label}</span>
                  <span className="text-muted-foreground">{ci.count}/{churnCount} ({Math.round((ci.count / churnCount) * 100)}%)</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${(ci.count / churnCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

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
