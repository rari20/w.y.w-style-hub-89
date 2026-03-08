import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { BarChart2, ShieldCheck, AlertTriangle, Eye, Mail, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

const atRiskCustomers = [
  { id: 'WYW011', days: 112, spend: 185, tier: 'Spark', satisfaction: '2/5', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'WYW012', days: 95, spend: 240, tier: 'Spark', satisfaction: '2/5', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'WYW013', days: 78, spend: 310, tier: 'Spark', satisfaction: '3/5', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'WYW014', days: 88, spend: 420, tier: 'Spark', satisfaction: '1/5', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'WYW015', days: 67, spend: 465, tier: 'Spark', satisfaction: '2/5', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
];

const campaignCards = [
  {
    title: 'Day 1: Re-engagement Email',
    icon: Mail,
    description: "Personalised email sent to all Segment D customers with subject line: 'We miss you, [Name] — here's 20% off your next order.' Discount code: COMEBACK20",
  },
  {
    title: 'Day 7: WhatsApp Follow-up',
    icon: MessageCircle,
    description: "If the Day 1 email was not opened, a WhatsApp message is sent via the W.Y.W customer service number: 'Hi [Name], we noticed you haven't visited recently. Your 20% discount is still waiting.'",
  },
  {
    title: 'Day 14: Final Offer',
    icon: Gift,
    description: 'Final retention attempt: a free 30-minute in-store styling consultation offered with no purchase required. Booking link sent via email and WhatsApp.',
  },
];

export default function RetentionDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="wyw-container pt-24 pb-16 flex justify-center">
          <p className="text-muted-foreground font-body">Loading…</p>
        </div>
      </Layout>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Churn Dataset', to: '/admin/dataset' }, { label: 'Retention Dashboard' }]} />

        {/* Section 1 — Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Retention Dashboard</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            Customers identified as churn risk by the W.Y.W CART model and the retention actions deployed.
          </p>
        </Reveal>

        {/* Section 2 — Summary Stats */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Customers Analysed', value: '15', color: '' },
              { label: 'Retained (Low Risk)', value: '10', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
              { label: 'Borderline (Monitor)', value: '1', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
              { label: 'Churn Risk', value: '5', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
            ].map((s) => (
              <div key={s.label} className="border border-border p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">{s.label}</p>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl text-foreground">{s.value}</span>
                  {s.color && <span className={`text-[0.6rem] px-2 py-0.5 font-body font-medium ${s.color}`}>{s.label.split('(')[1]?.replace(')', '') || ''}</span>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Section 3 — At-Risk Customers Table */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Segment D — High Churn Risk Customers</h2>
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 mb-10">
            <table className="w-full text-[0.8rem] font-body min-w-[900px] border border-border">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {['Customer ID', 'Days Inactive', 'Total Spend', 'Tier', 'Satisfaction', 'Risk Level', 'Retention Action', 'Status'].map((col) => (
                    <th key={col} className="py-3 px-3 text-left text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {atRiskCustomers.map((row) => (
                  <tr key={row.id} className="border-b border-border bg-red-50/60 dark:bg-red-950/20 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-foreground">{row.id}</td>
                    <td className="py-2.5 px-3 text-foreground">{row.days} days</td>
                    <td className="py-2.5 px-3 text-foreground">£{row.spend}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[0.65rem] px-2 py-0.5 font-body font-medium bg-muted text-muted-foreground">{row.tier}</span>
                    </td>
                    <td className="py-2.5 px-3 text-foreground">{row.satisfaction}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[0.65rem] px-2 py-0.5 font-body font-medium ${row.risk === 'Critical' ? 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                        {row.risk === 'Critical' ? 'CRITICAL' : 'CHURN RISK'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-foreground">{row.action}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[0.65rem] px-2 py-0.5 font-body font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Section 4 — Retention Campaign Details */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Retention Campaign</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {campaignCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="border border-border p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display text-sm italic text-foreground">{card.title}</h3>
                  </div>
                  <p className="text-[0.8rem] text-muted-foreground font-body font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Section 5 — Why These Customers Are at Risk */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">CART Model Decision</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                The W.Y.W CART model identified these customers using a single root split: Total Spend 6M &lt; £500. All 5 at-risk customers additionally share: Loyalty Tier = Spark, Email Engagement = No, Satisfaction Score ≤ 3, and no consultation bookings in the past 6 months. The weighted Gini Impurity of this split is 0.000, indicating a perfectly pure classification.
              </p>
            </div>
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">Business Impact</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                A 33% churn rate across W.Y.W's customer base represents significant lost lifetime value. Retaining even 3 of the 5 at-risk customers through this campaign would reduce churn rate from 33% to 13%, improving revenue retention and reducing new customer acquisition costs.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Navigation */}
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/dataset">
              <Button variant="outline">Back to Dataset</Button>
            </Link>
            <Link to="/churn-predictor">
              <Button>Test New Customer</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
