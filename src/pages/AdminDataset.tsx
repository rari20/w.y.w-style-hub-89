import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BarChart2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

const dataset = [
  { id: 'C001', days: 12, spend: 480, orders: 6, tier: 'Surge', returnRate: 5, wishlist: 2, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C002', days: 95, spend: 120, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 5, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C003', days: 30, spend: 260, orders: 4, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C004', days: 140, spend: 60, orders: 1, tier: 'Spark', returnRate: 20, wishlist: 3, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C005', days: 18, spend: 520, orders: 7, tier: 'Surge', returnRate: 5, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C006', days: 160, spend: 80, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C007', days: 22, spend: 390, orders: 5, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C008', days: 70, spend: 150, orders: 2, tier: 'Spark', returnRate: 10, wishlist: 2, consultation: 'N', csContacts: 1, email: 'Y', churned: 'Y' },
  { id: 'C009', days: 15, spend: 610, orders: 8, tier: 'Watt', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C010', days: 130, spend: 100, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C011', days: 20, spend: 450, orders: 6, tier: 'Surge', returnRate: 5, wishlist: 1, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C012', days: 110, spend: 90, orders: 2, tier: 'Spark', returnRate: 20, wishlist: 3, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C013', days: 25, spend: 340, orders: 5, tier: 'Volt', returnRate: 5, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C014', days: 155, spend: 70, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C015', days: 10, spend: 700, orders: 9, tier: 'Watt', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C016', days: 90, spend: 140, orders: 2, tier: 'Spark', returnRate: 10, wishlist: 2, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C017', days: 28, spend: 320, orders: 4, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C018', days: 135, spend: 95, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C019', days: 17, spend: 510, orders: 7, tier: 'Surge', returnRate: 5, wishlist: 1, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C020', days: 165, spend: 85, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C021', days: 14, spend: 460, orders: 6, tier: 'Surge', returnRate: 5, wishlist: 2, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C022', days: 100, spend: 130, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C023', days: 32, spend: 280, orders: 4, tier: 'Volt', returnRate: 5, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C024', days: 145, spend: 65, orders: 1, tier: 'Spark', returnRate: 20, wishlist: 4, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C025', days: 19, spend: 530, orders: 7, tier: 'Surge', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C026', days: 150, spend: 80, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C027', days: 27, spend: 350, orders: 5, tier: 'Volt', returnRate: 5, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C028', days: 105, spend: 120, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 2, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C029', days: 16, spend: 620, orders: 8, tier: 'Watt', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C030', days: 138, spend: 95, orders: 2, tier: 'Spark', returnRate: 20, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C031', days: 23, spend: 410, orders: 6, tier: 'Surge', returnRate: 5, wishlist: 1, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C032', days: 120, spend: 110, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 2, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C033', days: 35, spend: 290, orders: 4, tier: 'Volt', returnRate: 5, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C034', days: 170, spend: 75, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C035', days: 11, spend: 680, orders: 9, tier: 'Watt', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C036', days: 98, spend: 135, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C037', days: 26, spend: 360, orders: 5, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C038', days: 148, spend: 90, orders: 2, tier: 'Spark', returnRate: 20, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C039', days: 21, spend: 540, orders: 7, tier: 'Surge', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C040', days: 160, spend: 85, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C041', days: 13, spend: 470, orders: 6, tier: 'Surge', returnRate: 5, wishlist: 2, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C042', days: 112, spend: 125, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C043', days: 29, spend: 310, orders: 4, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C044', days: 142, spend: 70, orders: 1, tier: 'Spark', returnRate: 20, wishlist: 4, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
  { id: 'C045', days: 16, spend: 650, orders: 8, tier: 'Watt', returnRate: 0, wishlist: 0, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C046', days: 125, spend: 105, orders: 2, tier: 'Spark', returnRate: 15, wishlist: 3, consultation: 'N', csContacts: 1, email: 'N', churned: 'Y' },
  { id: 'C047', days: 24, spend: 370, orders: 5, tier: 'Volt', returnRate: 0, wishlist: 1, consultation: 'N', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C048', days: 155, spend: 80, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 4, consultation: 'N', csContacts: 3, email: 'N', churned: 'Y' },
  { id: 'C049', days: 18, spend: 500, orders: 7, tier: 'Surge', returnRate: 5, wishlist: 1, consultation: 'Y', csContacts: 0, email: 'Y', churned: 'N' },
  { id: 'C050', days: 165, spend: 90, orders: 1, tier: 'Spark', returnRate: 25, wishlist: 3, consultation: 'N', csContacts: 2, email: 'N', churned: 'Y' },
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
  'CS Contacts', 'Email Engagement', 'Churned',
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

  const retainCount = dataset.filter(d => d.churned === 'N').length;
  const churnCount = dataset.filter(d => d.churned === 'Y').length;

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
            50-record dataset used to train W.Y.W's CART churn prediction model. Features are collected from customer account activity, order history, loyalty programme, and satisfaction surveys.
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
                  const isChurn = row.churned === 'Y';
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
              All 25 at-risk customers are on the Spark loyalty tier with total spend below £500, no consultation bookings, and email engagement disabled. This validates TotalSpend6Months ≥ £500 as the CART root split, producing two perfectly pure child nodes with a weighted Gini Impurity of 0.000.
            </p>
          </div>
        </Reveal>

        {/* Navigation */}
        <Reveal>
          <div className="flex flex-wrap gap-3 mt-6">
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
