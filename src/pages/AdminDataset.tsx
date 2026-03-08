import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { BarChart2, ShieldCheck, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trainingData, giniResults, featureRanking } from '@/data/cartModel';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

export default function AdminDataset() {
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

  const churnCount = trainingData.filter(d => d.churn).length;
  const retainCount = trainingData.length - churnCount;

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Account', to: '/account' }, { label: 'Churn Dataset' }]} />

        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">CART Training Dataset</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            10-record dataset used to train W.Y.W's CART churn prediction model. Features are UX attributes collected from customer experience surveys: Delivery, Shopping, Security, and Price perception.
          </p>
        </Reveal>

        {/* Training Data Table */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Customer Churn Training Data</h2>
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 mb-10">
            <table className="w-full text-[0.85rem] font-body border border-border">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {['Customer', 'Delivery', 'Shopping', 'Security', 'Price', 'Churn'].map(col => (
                    <th key={col} className="py-3 px-4 text-left text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trainingData.map(row => (
                  <tr key={row.id} className={`border-b border-border ${row.churn ? 'bg-red-50/60 dark:bg-red-950/20' : 'bg-green-50/40 dark:bg-green-950/15'} transition-colors`}>
                    <td className="py-3 px-4 font-medium text-foreground">Customer {row.id}</td>
                    <td className="py-3 px-4 text-foreground">{row.delivery}</td>
                    <td className="py-3 px-4 text-foreground">{row.shopping}</td>
                    <td className="py-3 px-4 text-foreground">{row.security}</td>
                    <td className="py-3 px-4 text-foreground">{row.price}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[0.7rem] px-2.5 py-0.5 font-medium font-body ${row.churn
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      }`}>
                        {row.churn ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[0.75rem] text-muted-foreground font-body mt-2 text-right">Total: {trainingData.length}</p>
          </div>
        </Reveal>

        {/* Summary Cards */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="border border-green-200 dark:border-green-800/40 bg-green-50/50 dark:bg-green-950/20 p-5 flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl text-foreground">{retainCount} customers</p>
                <p className="text-[0.8rem] text-green-700 dark:text-green-400 font-body font-medium">
                  No Churn ({Math.round((retainCount / trainingData.length) * 100)}%)
                </p>
              </div>
            </div>
            <div className="border border-red-200 dark:border-red-800/40 bg-red-50/50 dark:bg-red-950/20 p-5 flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl text-foreground">{churnCount} customers</p>
                <p className="text-[0.8rem] text-red-700 dark:text-red-400 font-body font-medium">
                  Churn ({Math.round((churnCount / trainingData.length) * 100)}%)
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Gini Impurity Calculations */}
        <Reveal>
          <h2 className="font-display text-xl italic text-foreground mb-4">Gini Impurity Analysis</h2>
          <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed mb-6 max-w-3xl">
            The CART algorithm selects the feature with the <strong className="text-foreground">lowest weighted Gini Impurity</strong> as each split. Gini = 1 − Σ(pᵢ)² where pᵢ is the probability of class i. A Gini of 0 = perfectly pure, 0.5 = maximum impurity (50-50 split).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {featureRanking.map(([feature, data], idx) => (
              <div key={feature} className={`border p-5 ${idx === 0 ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-border'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-base italic text-foreground capitalize">{feature}</h3>
                  <div className="flex items-center gap-2">
                    {idx === 0 && (
                      <span className="text-[0.6rem] px-2 py-0.5 bg-accent text-accent-foreground font-body font-bold uppercase tracking-wider">Best Split</span>
                    )}
                    <span className="font-body text-lg font-medium text-foreground">{data.gini.toFixed(3)}</span>
                  </div>
                </div>

                <table className="w-full text-[0.75rem] font-body">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-1.5 text-left text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">{feature}</th>
                      <th className="py-1.5 text-center text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">Yes</th>
                      <th className="py-1.5 text-center text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">No</th>
                      <th className="py-1.5 text-center text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">Count</th>
                      <th className="py-1.5 text-right text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">Gini</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.splits.map(s => (
                      <tr key={s.value} className="border-b border-border/50">
                        <td className="py-1.5 text-foreground font-medium">{s.value}</td>
                        <td className="py-1.5 text-center text-foreground">{s.yes}</td>
                        <td className="py-1.5 text-center text-foreground">{s.no}</td>
                        <td className="py-1.5 text-center text-foreground">{s.count}</td>
                        <td className="py-1.5 text-right text-foreground">{s.gini.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="text-[0.7rem] text-muted-foreground font-body mt-2">
                  Weighted Gini = {data.splits.map(s => `(${s.count}/${trainingData.length}) × ${s.gini.toFixed(3)}`).join(' + ')} = <strong className="text-foreground">{data.gini.toFixed(3)}</strong>
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Decision Tree Summary */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 border border-border mb-6">
            <h3 className="font-display text-lg mb-3 italic text-foreground">CART Decision Tree Structure</h3>
            <div className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed space-y-2">
              <p><strong className="text-foreground">Level 1 — Price</strong> (Gini = 0.286, best split)</p>
              <p className="pl-4">• <strong className="text-red-600 dark:text-red-400">Unfair → CHURN</strong> (3/3 customers churned — pure node)</p>
              <p className="pl-4">• Fair → proceed to Level 2</p>
              <p className="mt-2"><strong className="text-foreground">Level 2 — Delivery</strong> (Gini = 0.191 on Fair subset)</p>
              <p className="pl-4">• <strong className="text-green-600 dark:text-green-400">Good / OK → NO CHURN</strong> (4/4 retained — pure node)</p>
              <p className="pl-4">• Bad → proceed to Level 3</p>
              <p className="mt-2"><strong className="text-foreground">Level 3 — Shopping</strong> (Gini = 0.000 on Bad + Fair subset)</p>
              <p className="pl-4">• <strong className="text-red-600 dark:text-red-400">Normal → CHURN</strong> (2/2 churned — pure node)</p>
              <p className="pl-4">• <strong className="text-green-600 dark:text-green-400">Efficient → NO CHURN</strong> (1/1 retained — pure node)</p>
            </div>
          </div>
        </Reveal>

        {/* Data Sources */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 border border-border mb-6">
            <h3 className="font-display text-lg mb-3 italic text-foreground">Where Does the Data Come From?</h3>
            <div className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed space-y-2">
              <p><strong className="text-foreground">Customer Surveys</strong> — Post-purchase satisfaction surveys collecting Delivery, Shopping, Security and Price perception ratings.</p>
              <p><strong className="text-foreground">Browsing Activity Monitoring</strong> — Pages viewed, time on pages, usage of wishlist/saved/shopping lists.</p>
              <p><strong className="text-foreground">Transactional Records</strong> — Products bought, quantities, frequency, time gap between purchases, account closures.</p>
            </div>
          </div>
        </Reveal>

        {/* Navigation */}
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <a href="/ecom_dataset.xlsx" download>
              <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Dataset (.xlsx)</Button>
            </a>
            <Link to="/churn-predictor">
              <Button><BarChart2 className="h-4 w-4 mr-2" /> Test Model with New Customer</Button>
            </Link>
            <Link to="/retention-dashboard">
              <Button variant="outline">View Retention Actions</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
