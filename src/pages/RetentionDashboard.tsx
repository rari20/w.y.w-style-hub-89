import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Eye, Mail, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

const atRiskCustomers = [
  { id: 'C002', days: 95, spend: 120, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C004', days: 140, spend: 60, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C006', days: 160, spend: 80, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C008', days: 70, spend: 150, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C010', days: 130, spend: 100, tier: 'Spark', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'C012', days: 110, spend: 90, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C014', days: 155, spend: 70, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C016', days: 90, spend: 140, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C018', days: 135, spend: 95, tier: 'Spark', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'C020', days: 165, spend: 85, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C022', days: 100, spend: 130, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C024', days: 145, spend: 65, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C026', days: 150, spend: 80, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C028', days: 105, spend: 120, tier: 'Spark', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'C030', days: 138, spend: 95, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C032', days: 120, spend: 110, tier: 'Spark', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'C034', days: 170, spend: 75, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C036', days: 98, spend: 135, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C038', days: 148, spend: 90, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C040', days: 160, spend: 85, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C042', days: 112, spend: 125, tier: 'Spark', risk: 'High', action: 'WhatsApp follow-up sent', status: 'Pending' },
  { id: 'C044', days: 142, spend: 70, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C046', days: 125, spend: 105, tier: 'Spark', risk: 'High', action: 'Re-engagement email sent', status: 'Pending' },
  { id: 'C048', days: 155, spend: 80, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
  { id: 'C050', days: 165, spend: 90, tier: 'Spark', risk: 'Critical', action: 'Free consultation offered', status: 'Pending' },
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

  const criticalCount = atRiskCustomers.filter(c => c.risk === 'Critical').length;
  const highCount = atRiskCustomers.filter(c => c.risk === 'High').length;

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
              { label: 'Total Customers Analysed', value: '50', color: '' },
              { label: 'Retained (Low Risk)', value: '25', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
              { label: 'Critical Risk', value: String(criticalCount), color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
              { label: 'High Risk', value: String(highCount), color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
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
          <h2 className="font-display text-xl italic text-foreground mb-4">Segment D — High Churn Risk Customers ({atRiskCustomers.length})</h2>
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 mb-10">
            <table className="w-full text-[0.8rem] font-body min-w-[800px] border border-border">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {['Customer ID', 'Days Inactive', 'Total Spend', 'Tier', 'Risk Level', 'Retention Action', 'Status'].map((col) => (
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
                    <td className="py-2.5 px-3">
                      <span className={`text-[0.65rem] px-2 py-0.5 font-body font-medium ${row.risk === 'Critical' ? 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                        {row.risk === 'Critical' ? 'CRITICAL' : 'HIGH'}
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
                The W.Y.W CART model identified these 25 customers using a single root split: Total Spend 6M &lt; £500. All at-risk customers additionally share: Loyalty Tier = Spark, Email Engagement = N, and no consultation bookings. Customers with 120+ days inactive are classified as Critical risk. The weighted Gini Impurity of this split is 0.000, indicating a perfectly pure classification.
              </p>
            </div>
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">Business Impact</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                A 50% churn rate across W.Y.W's customer base represents significant lost lifetime value. Retaining even 10 of the 25 at-risk customers through this campaign would reduce churn rate from 50% to 30%, improving revenue retention and reducing new customer acquisition costs.
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
