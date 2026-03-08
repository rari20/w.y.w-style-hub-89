import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Eye, Mail, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trainingData, retentionActions, datasetStats } from '@/data/cartModel';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

const campaignCards = [
  {
    title: 'Day 1: Re-engagement Email',
    icon: Mail,
    description: retentionActions.churn[0].description,
  },
  {
    title: 'Day 7: WhatsApp Follow-up',
    icon: MessageCircle,
    description: retentionActions.churn[1].description,
  },
  {
    title: 'Day 14: Final Offer',
    icon: Gift,
    description: retentionActions.churn[2].description,
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

  const churnCustomers = trainingData.filter(c => c.churned);
  const retainCustomers = trainingData.filter(c => !c.churned);

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Churn Dataset', to: '/admin/dataset' }, { label: 'Retention Dashboard' }]} />

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Retention Dashboard</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            Customers identified as churn risk by the W.Y.W CART decision tree model and the retention actions deployed to prevent them from leaving.
          </p>
        </Reveal>

        {/* Summary Stats */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Training Records', value: String(datasetStats.totalCustomers) },
              { label: 'Retained', value: String(datasetStats.retainedCustomers), color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
              { label: 'Churned', value: String(datasetStats.churnedCustomers), color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
              { label: 'Churn Rate', value: `${datasetStats.churnRate}%`, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
            ].map(s => (
              <div key={s.label} className="border border-border p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">{s.label}</p>
                <span className="font-display text-2xl text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Churn Customers from Training Data */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Customers Predicted to Churn ({churnCustomers.length})</h2>
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 mb-10">
            <table className="w-full text-[0.8rem] font-body min-w-[700px] border border-border">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {['Customer', 'Tier', 'Spend 6M', 'Days Inactive', 'Return %', 'CART Reason', 'Retention Action'].map(col => (
                    <th key={col} className="py-3 px-3 text-left text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {churnCustomers.map(row => {
                  const reason = 'LoyaltyTier = Spark (100% churn node)';
                  const action = row.returnRate >= 20
                    ? 'Priority: Address returns + COMEBACK20 discount'
                    : row.daysSinceLastPurchase > 120
                      ? 'Urgent: Re-engagement email + consultation offer'
                      : 'Standard: COMEBACK20 discount + WhatsApp follow-up';

                  return (
                    <tr key={row.customerID} className="border-b border-border bg-red-50/60 dark:bg-red-950/20 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-foreground">{row.customerID}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[0.65rem] px-2 py-0.5 font-body font-medium bg-muted text-muted-foreground">
                          {row.loyaltyTier}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-foreground">£{row.totalSpend6Months}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.daysSinceLastPurchase}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.returnRate}%</td>
                      <td className="py-2.5 px-3 text-[0.75rem] text-muted-foreground">{reason}</td>
                      <td className="py-2.5 px-3 text-[0.75rem] text-foreground">{action}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Retention Campaign */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Retention Campaign</h2>
          <p className="text-[0.85rem] text-muted-foreground font-body font-light mb-6 max-w-3xl">
            When a customer is classified as "Churn" by the CART model (Spark tier), W.Y.W triggers a 3-step retention campaign:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {campaignCards.map(card => {
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

        {/* Why Churn — CART Model Insights */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">CART Model Decision</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                The CART decision tree identifies churn risk using <strong className="text-foreground">LoyaltyTier</strong> as the root split (Gini = 0.000 — perfect). All 25 Spark tier customers churned, while all Watt, Surge, and Volt customers were retained. Supporting features like EmailEngagement and ConsultationBooked also show perfect correlation.
              </p>
            </div>
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">Business Impact</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                A 50% churn rate concentrated entirely in the Spark tier indicates that entry-level customers need targeted engagement. Revenue at risk: £{datasetStats.sparkRevenue.toLocaleString()}. Key strategy: upgrade Spark customers through consultations, email engagement, and personalised discount offers.
              </p>
            </div>
          </div>
        </Reveal>

        {/* How W.Y.W Addresses Each Churn Factor */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 border border-border mb-10">
            <h3 className="font-display text-lg mb-4 italic text-foreground">How W.Y.W Addresses Each Churn Factor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
              <div>
                <p className="font-medium text-foreground mb-1">Spark Tier → Tier Upgrade Incentives</p>
                <p>W.Y.W offers targeted discount codes (COMEBACK20, SPARK20), loyalty point multipliers, and free consultation sessions to encourage Spark customers to increase engagement and spend.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">No Email Engagement → Re-engagement Campaigns</p>
                <p>Disengaged customers receive a 3-step email/WhatsApp campaign with personalised offers, styling tips, and exclusive access to new collections.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">High Return Rate → Quality & Fit Improvements</p>
                <p>Customers with high return rates are offered free styling consultations and size guides to reduce returns and increase satisfaction.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Long Inactivity → Win-Back Strategy</p>
                <p>Customers inactive for 60+ days receive urgent re-engagement emails with time-limited offers and personal WhatsApp follow-ups.</p>
              </div>
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