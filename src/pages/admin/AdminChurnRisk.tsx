import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Tag, Calendar, TrendingUp, Check, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { customers } from '@/data/adminData';

const atRisk = customers.filter(c => c.churnRisk === 'High');

interface Actions {
  email: boolean;
  whatsapp: boolean;
  consultation: boolean;
  discount: boolean;
}

export default function AdminChurnRisk() {
  const [actions, setActions] = useState<Record<string, Actions>>(() =>
    Object.fromEntries(atRisk.map(c => [c.id, { email: false, whatsapp: false, consultation: false, discount: false }]))
  );

  const act = (id: string, key: keyof Actions, label: string) => {
    setActions(prev => ({ ...prev, [id]: { ...prev[id], [key]: true } }));
    if (label) toast.success(label);
  };

  const exportCSV = () => {
    const header = 'ID,TotalSpend,DaysInactive,LoyaltyTier,EmailEngaged,Satisfaction,ReturnRate,OrdersLast6M,ChurnRisk';
    const rows = atRisk.map(c => `${c.id},${c.totalSpend},${c.daysInactive},${c.loyaltyTier},${c.emailEngaged},${c.satisfaction},${c.returnRate},${c.ordersLast6M},${c.churnRisk}`);
    const blob = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'churn-risk-customers.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-2xl font-display">High Churn Risk Customers ({atRisk.length})</h1>
            <p className="text-xs text-muted-foreground font-body">Customers identified by the W.Y.W CART model as likely to churn. Root split: Total Spend 6M &lt; £500. All are Spark tier with email disengaged.</p>
          </div>
        </div>

        {/* Customer Cards */}
        <div className="space-y-4">
          {atRisk.map(c => {
            const a = actions[c.id];
            const pills = [
              { label: `${c.daysInactive} days inactive`, color: c.daysInactive > 60 ? 'bg-red-500/15 text-red-700 dark:text-red-400' : 'bg-amber-500/15 text-amber-700' },
              { label: c.loyaltyTier, color: 'bg-muted text-muted-foreground' },
              { label: `£${c.totalSpend} spend`, color: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
              { label: `Satisfaction: ${c.satisfaction}/5`, color: c.satisfaction <= 2 ? 'bg-red-500/15 text-red-700 dark:text-red-400' : 'bg-amber-500/15 text-amber-700' },
              { label: `${c.returnRate}% returns`, color: c.returnRate > 25 ? 'bg-red-500/15 text-red-700 dark:text-red-400' : 'bg-amber-500/15 text-amber-700' },
            ];
            return (
              <Card key={c.id}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-body font-medium text-sm">{c.id}</p>
                      <p className="text-xs text-muted-foreground">£{c.totalSpend} total spend — {c.ordersLast6M} orders in 6M</p>
                    </div>
                    <span className="bg-red-500/20 text-red-700 dark:text-red-400 text-[10px] px-2.5 py-1 rounded font-bold tracking-wider uppercase font-body">
                      CHURN RISK — Segment D
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pills.map(p => (
                      <span key={p.label} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.color}`}>{p.label}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => act(c.id, 'discount', `20% discount sent to ${c.id}`)}>
                      <Tag className="h-3.5 w-3.5" strokeWidth={1.5} /> Send 20% Discount
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => act(c.id, 'consultation', `Free consultation offered to ${c.id}`)}>
                      <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} /> Offer Free Consultation
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => toast.success(`${c.id} tier upgraded.`)}>
                      <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} /> Upgrade Tier
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 text-[10px] font-body">
                    {[
                      { label: 'Email Sent', done: a.email },
                      { label: 'WhatsApp Sent', done: a.whatsapp },
                      { label: 'Consultation Offered', done: a.consultation },
                      { label: 'Discount Applied', done: a.discount },
                    ].map(s => (
                      <span key={s.label} className={`flex items-center gap-1 ${s.done ? 'text-green-600' : 'text-muted-foreground/40'}`}>
                        {s.done && <Check className="h-3 w-3" />} {s.label}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bulk Actions */}
        <Card>
          <CardContent className="p-4 flex flex-wrap gap-3">
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => { atRisk.forEach(c => act(c.id, 'discount', '')); toast.success(`20% discount sent to all ${atRisk.length} at-risk customers.`); }}>
              <Tag className="h-3.5 w-3.5" /> Send 20% to all {atRisk.length}
            </Button>
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => { atRisk.forEach(c => act(c.id, 'email', '')); toast.success(`Re-engagement email sent to all ${atRisk.length}.`); }}>
              Send re-engagement email to all {atRisk.length}
            </Button>
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={exportCSV}>
              <Download className="h-3.5 w-3.5" /> Export as CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
