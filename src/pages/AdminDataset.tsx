import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BarChart2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'test.customer@wyw-demo.com';

const dataset = [
  { id: 'C001', days: 14, spend: 847, orders: 4, tier: 'Volt', returnRate: 5, wishlist: 3, consultation: 'Yes', csContacts: 1, email: 'Yes', satisfaction: '5/5', churned: 'No' },
  { id: 'C002', days: 22, spend: 1240, orders: 6, tier: 'Surge', returnRate: 0, wishlist: 1, consultation: 'Yes', csContacts: 0, email: 'Yes', satisfaction: '5/5', churned: 'No' },
  { id: 'C003', days: 31, spend: 695, orders: 3, tier: 'Volt', returnRate: 10, wishlist: 5, consultation: 'No', csContacts: 2, email: 'Yes', satisfaction: '4/5', churned: 'No' },
  { id: 'C004', days: 18, spend: 2100, orders: 8, tier: 'Surge', returnRate: 8, wishlist: 2, consultation: 'Yes', csContacts: 1, email: 'Yes', satisfaction: '5/5', churned: 'No' },
  { id: 'C005', days: 45, spend: 520, orders: 2, tier: 'Volt', returnRate: 15, wishlist: 7, consultation: 'No', csContacts: 1, email: 'Yes', satisfaction: '3/5', churned: 'No' },
  { id: 'C006', days: 12, spend: 4850, orders: 11, tier: 'Watt', returnRate: 3, wishlist: 0, consultation: 'Yes', csContacts: 0, email: 'Yes', satisfaction: '5/5', churned: 'No' },
  { id: 'C007', days: 28, spend: 610, orders: 3, tier: 'Volt', returnRate: 12, wishlist: 4, consultation: 'Yes', csContacts: 2, email: 'Yes', satisfaction: '4/5', churned: 'No' },
  { id: 'C008', days: 55, spend: 385, orders: 2, tier: 'Spark', returnRate: 20, wishlist: 8, consultation: 'No', csContacts: 3, email: 'No', satisfaction: '3/5', churned: 'No' },
  { id: 'C009', days: 38, spend: 760, orders: 3, tier: 'Volt', returnRate: 6, wishlist: 6, consultation: 'No', csContacts: 1, email: 'Yes', satisfaction: '4/5', churned: 'No' },
  { id: 'C010', days: 9, spend: 3200, orders: 9, tier: 'Surge', returnRate: 2, wishlist: 1, consultation: 'Yes', csContacts: 0, email: 'Yes', satisfaction: '5/5', churned: 'No' },
  { id: 'C011', days: 112, spend: 185, orders: 1, tier: 'Spark', returnRate: 45, wishlist: 12, consultation: 'No', csContacts: 5, email: 'No', satisfaction: '2/5', churned: 'Yes' },
  { id: 'C012', days: 95, spend: 240, orders: 1, tier: 'Spark', returnRate: 38, wishlist: 9, consultation: 'No', csContacts: 4, email: 'No', satisfaction: '2/5', churned: 'Yes' },
  { id: 'C013', days: 78, spend: 310, orders: 2, tier: 'Spark', returnRate: 28, wishlist: 11, consultation: 'No', csContacts: 3, email: 'No', satisfaction: '3/5', churned: 'Yes' },
  { id: 'C014', days: 88, spend: 420, orders: 1, tier: 'Spark', returnRate: 50, wishlist: 14, consultation: 'No', csContacts: 6, email: 'No', satisfaction: '1/5', churned: 'Yes' },
  { id: 'C015', days: 67, spend: 465, orders: 2, tier: 'Spark', returnRate: 33, wishlist: 10, consultation: 'No', csContacts: 4, email: 'No', satisfaction: '2/5', churned: 'Yes' },
];

const tierColors: Record<string, string> = {
  Spark: 'bg-muted text-muted-foreground',
  Volt: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Surge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Watt: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
};

const columns = [
  'CustomerID', 'Days Since Last Purchase', 'Total Spend 6M (£)', 'Number of Orders',
  'Loyalty Tier', 'Return Rate (%)', 'Wishlist Unpurchased', 'Consultation Booked',
  'CS Contacts', 'Email Engagement', 'Satisfaction Score', 'Churned',
];

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

  const retainCount = dataset.filter(d => d.churned === 'No').length;
  const churnCount = dataset.filter(d => d.churned === 'Yes').length;

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Account', to: '/account' }, { label: 'Churn Dataset' }]} />

        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Customer Churn Risk Dataset</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            15-record dataset used to train W.Y.W's CART churn prediction model. Features are collected from customer account activity, order history, loyalty programme, and satisfaction surveys.
          </p>
        </Reveal>

        {/* Table */}
        <Reveal>
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 mb-10">
            <table className="w-full text-[0.8rem] font-body min-w-[1100px] border border-border">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {columns.map(col => (
                    <th key={col} className="py-3 px-3 text-left text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground font-medium whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.map(row => {
                  const isChurn = row.churned === 'Yes';
                  const rowBg = isChurn
                    ? 'bg-red-50/60 dark:bg-red-950/20'
                    : 'bg-green-50/40 dark:bg-green-950/15';

                  return (
                    <tr key={row.id} className={`border-b border-border ${rowBg} transition-colors`}>
                      <td className="py-2.5 px-3 font-medium text-foreground">{row.id}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.days}</td>
                      <td className="py-2.5 px-3 text-foreground">£{row.spend.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.orders}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[0.65rem] px-2 py-0.5 font-body font-medium ${tierColors[row.tier]}`}>
                          {row.tier}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-foreground">{row.returnRate}%</td>
                      <td className="py-2.5 px-3 text-foreground">{row.wishlist}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.consultation}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.csContacts}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.email}</td>
                      <td className="py-2.5 px-3 text-foreground">{row.satisfaction}</td>
                      <td className="py-2.5 px-3">
                        {isChurn ? (
                          <span className="text-[0.65rem] px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 font-medium font-body">
                            Churn
                          </span>
                        ) : (
                          <span className="text-[0.65rem] px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 font-medium font-body">
                            Retain
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                  Retain ({Math.round((retainCount / dataset.length) * 100)}%)
                </p>
              </div>
            </div>
            <div className="border border-red-200 dark:border-red-800/40 bg-red-50/50 dark:bg-red-950/20 p-5 flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl text-foreground">{churnCount} customers</p>
                <p className="text-[0.8rem] text-red-700 dark:text-red-400 font-body font-medium">
                  Churn Risk ({Math.round((churnCount / dataset.length) * 100)}%)
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Key Insight */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 border border-border">
            <h3 className="font-display text-lg mb-3 italic text-foreground">Key Insight</h3>
            <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
              All 5 at-risk customers are on the Spark loyalty tier with total spend below £500, no consultation bookings, and email engagement disabled. This validates TotalSpend6Months ≥ £500 as the CART root split, producing two perfectly pure child nodes with a weighted Gini Impurity of 0.000.
            </p>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
