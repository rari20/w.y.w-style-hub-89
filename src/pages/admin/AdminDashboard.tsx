import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import {
  Users, Activity, AlertTriangle, Star, Send, Tag, UserPlus,
} from 'lucide-react';
import { recentOrders } from '@/data/adminData';

const kpis = [
  { label: 'Total Customers', value: '15', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Active This Month', value: '10', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Churn Risk', value: '5', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', link: '/admin/churn-risk' },
  { label: 'Total Revenue 6M', value: '£21,067', icon: () => <span className="text-lg font-display">£</span>, color: 'text-amber-600', bg: 'bg-amber-500/10' },
  { label: 'Avg Satisfaction', value: '3.7/5', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Active Campaigns', value: '3', icon: Send, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const tiers = [
  { name: 'Watt', value: 4850, max: 6540, color: 'bg-amber-500' },
  { name: 'Surge', value: 6540, max: 6540, color: 'bg-blue-500' },
  { name: 'Volt', value: 4432, max: 6540, color: 'bg-orange-500' },
  { name: 'Spark', value: 2005, max: 6540, color: 'bg-muted-foreground/40' },
];

const statusColors: Record<string, string> = {
  Processing: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Shipped: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Delivered: 'bg-green-500/20 text-green-700 dark:text-green-400',
};

const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display">Good morning, Admin</h1>
          <p className="text-sm text-muted-foreground font-body">{today}</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map(kpi => {
            const Icon = kpi.icon;
            const inner = (
              <Card key={kpi.label} className={`${kpi.link ? 'cursor-pointer hover:border-foreground/20 transition-colors' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${kpi.color}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-body">{kpi.label}</p>
                      <p className="text-lg font-display">{kpi.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
            return kpi.link ? <Link key={kpi.label} to={kpi.link}>{inner}</Link> : <div key={kpi.label}>{inner}</div>;
          })}
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body font-medium">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Order ID</TableHead>
                      <TableHead className="text-xs">Customer</TableHead>
                      <TableHead className="text-xs">Items</TableHead>
                      <TableHead className="text-xs">Total</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map(o => (
                      <TableRow key={o.id}>
                        <TableCell className="text-xs font-mono">{o.id}</TableCell>
                        <TableCell className="text-xs">{o.customer}</TableCell>
                        <TableCell className="text-xs">{o.items}</TableCell>
                        <TableCell className="text-xs font-medium">{o.total}</TableCell>
                        <TableCell>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[o.status] || ''}`}>{o.status}</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Churn Risk Alert */}
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium">Churn Risk Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">5 customers have been identified as high churn risk by the CART model. Last updated: today.</p>
                    <Link to="/admin/churn-risk">
                      <Button variant="outline" size="sm" className="mt-3">View Customers</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue by Tier */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body font-medium">Revenue by Loyalty Tier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tiers.map(t => (
                  <div key={t.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span>{t.name}</span>
                      <span className="font-medium">£{t.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${(t.value / t.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Create Discount', icon: Tag, to: '/admin/discounts' },
                    { label: 'Send Campaign', icon: Send, to: '/admin/email-campaigns' },
                    { label: 'Add Customer', icon: UserPlus, to: '/admin/customers' },
                    { label: 'View Churn Risk', icon: AlertTriangle, to: '/admin/churn-risk' },
                  ].map(a => (
                    <Link key={a.label} to={a.to}>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs h-10">
                        <a.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {a.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
