import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Eye, Mail, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trainingData, retentionActions } from '@/data/cartModel';

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

  const churnCustomers = trainingData.filter(c => c.churn);
  const retainCustomers = trainingData.filter(c => !c.churn);

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
              { label: 'Training Records', value: String(trainingData.length) },
              { label: 'Retained', value: String(retainCustomers.length), color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
              { label: 'Churned', value: String(churnCustomers.length), color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
              { label: 'Churn Rate', value: `${Math.round((churnCustomers.length / trainingData.length) * 100)}%`, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
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
                  {['Customer', 'Delivery', 'Shopping', 'Security', 'Price', 'CART Reason', 'Retention Action'].map(col => (
                    <th key={col} className="py-3 px-3 text-left text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {churnCustomers.map(row => {
                  const reason = row.price === 'Unfair'
                    ? 'Price = Unfair (pure churn node)'
                    : row.delivery === 'Bad' && row.shopping === 'Normal'
                      ? 'Fair Price + Bad Delivery + Normal Shopping'
                      : 'Bad Delivery + Non-Efficient Shopping';

                  const action = row.price === 'Unfair'
                    ? 'Price review + COMEBACK20 discount'
                    : 'Delivery improvement + re-engagement email';

                  return (
                    <tr key={row.id} className="border-b border-border bg-red-50/60 dark:bg-red-950/20 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-foreground">Customer {row.id}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.delivery}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.shopping}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.security}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[0.65rem] px-2 py-0.5 font-body font-medium ${row.price === 'Unfair' ? 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-200' : 'bg-muted text-muted-foreground'}`}>
                          {row.price}
                        </span>
                      </td>
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
            When a customer is classified as "Churn" by the CART model, W.Y.W triggers a 3-step retention campaign:
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
                The CART decision tree identifies churn risk using three UX attributes in order of importance: <strong className="text-foreground">Price</strong> (Gini = 0.286), <strong className="text-foreground">Delivery</strong> (Gini = 0.191 on Fair subset), and <strong className="text-foreground">Shopping</strong> (Gini = 0.000 on Bad+Fair subset). Price perception is the strongest predictor — all customers who rated pricing as "Unfair" churned.
              </p>
            </div>
            <div className="bg-muted p-6 md:p-8 border border-border">
              <h3 className="font-display text-lg mb-3 italic text-foreground">Business Impact</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                A 50% churn rate indicates significant customer dissatisfaction. The CART model reveals two actionable insights: (1) competitive pricing directly prevents churn, and (2) delivery experience is the second most important factor. Improving these two areas while maintaining an efficient shopping experience will reduce churn rate.
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
                <p className="font-medium text-foreground mb-1">Price = Unfair → Retention via Discounts</p>
                <p>W.Y.W counters unfair price perception with targeted discount codes (COMEBACK20, SPARK20), loyalty tier progression (earning 1 point per £1), and free delivery thresholds at higher tiers.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Delivery = Bad → Service Improvement</p>
                <p>W.Y.W addresses bad delivery through order tracking, delivery guarantees, and proactive CS outreach when delivery issues are detected.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Shopping = Confusing → UX Optimisation</p>
                <p>The W.Y.W website features intuitive navigation, brand-filtered shopping, personalised styling consultations, and a streamlined checkout process.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Security = Unreliable → Trust Building</p>
                <p>W.Y.W implements secure payment processing, clear privacy policies, SSL certification badges, and transparent returns/refunds policies.</p>
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
