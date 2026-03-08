import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import {
  Users, Activity, AlertTriangle, Star, Send, Tag, Bell, Zap, Check,
} from 'lucide-react';
import { adminNotifications, datasetTotals, type AdminNotification } from '@/data/adminData';
import { useState } from 'react';

const kpis = [
  { label: 'Total Customers', value: `${datasetTotals.totalCustomers}`, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Retained', value: `${datasetTotals.retainedCount}`, icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Churn Risk', value: `${datasetTotals.churnCount}`, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', link: '/admin/churn-risk' },
  { label: 'Total Revenue 6M', value: `£${datasetTotals.totalRevenue.toLocaleString()}`, icon: () => <span className="text-lg font-display">£</span>, color: 'text-amber-600', bg: 'bg-amber-500/10' },
  { label: 'Avg Satisfaction', value: `${datasetTotals.avgSatisfaction}/5`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Active Campaigns', value: '3', icon: Send, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const maxRevenue = Math.max(datasetTotals.revenueWatt, datasetTotals.revenueSurge, datasetTotals.revenueVolt, datasetTotals.revenueSpark);
const tiers = [
  { name: 'Watt', value: datasetTotals.revenueWatt, max: maxRevenue, color: 'bg-amber-500' },
  { name: 'Surge', value: datasetTotals.revenueSurge, max: maxRevenue, color: 'bg-blue-500' },
  { name: 'Volt', value: datasetTotals.revenueVolt, max: maxRevenue, color: 'bg-orange-500' },
  { name: 'Spark', value: datasetTotals.revenueSpark, max: maxRevenue, color: 'bg-muted-foreground/40' },
];

const notifIcons: Record<string, React.ElementType> = {
  churn: AlertTriangle,
  campaign: Send,
  system: Zap,
};

const notifColors: Record<string, string> = {
  churn: 'text-red-500 bg-red-500/10',
  campaign: 'text-purple-500 bg-purple-500/10',
  system: 'text-muted-foreground bg-muted',
};

const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function AdminDashboard() {
  const [notifications, setNotifications] = useState<AdminNotification[]>(adminNotifications);
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header with notification bell */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-display">Good morning, Admin</h1>
            <p className="text-sm text-muted-foreground font-body">{today}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 top-12 w-80 md:w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[480px] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <p className="text-xs font-body font-medium">Notifications</p>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-body flex items-center gap-1">
                      <Check className="h-3 w-3" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="overflow-y-auto flex-1">
                  {notifications.map(n => {
                    const Icon = notifIcons[n.type] || Bell;
                    return (
                      <Link
                        key={n.id}
                        to={n.link || '/admin'}
                        onClick={() => { markRead(n.id); setShowNotifs(false); }}
                        className={`flex items-start gap-3 p-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${
                          !n.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notifColors[n.type]}`}>
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-xs font-body ${!n.read ? 'font-medium' : ''}`}>{n.title}</p>
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{n.time}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium">Churn Risk Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">25 customers have been identified as high churn risk by the CART model. All are Spark tier with Total Spend &lt; £500.</p>
                    <Link to="/admin/churn-risk">
                      <Button variant="outline" size="sm" className="mt-3">View At-Risk Customers</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
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

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Create Discount', icon: Tag, to: '/admin/discounts' },
                    { label: 'Send Campaign', icon: Send, to: '/admin/email-campaigns' },
                    { label: 'View Churn Risk', icon: AlertTriangle, to: '/admin/churn-risk' },
                    { label: 'Social Media', icon: () => <span className="text-xs">📱</span>, to: '/admin/social' },
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

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-body font-medium">Recent Activity</CardTitle>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-red-500/20 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-0">
                {notifications.slice(0, 5).map(n => {
                  const Icon = notifIcons[n.type] || Bell;
                  return (
                    <Link
                      key={n.id}
                      to={n.link || '/admin'}
                      className={`flex items-start gap-2.5 py-2.5 border-b border-border last:border-0 hover:opacity-80 transition-opacity ${!n.read ? '' : 'opacity-60'}`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${notifColors[n.type]}`}>
                        <Icon className="h-3 w-3" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-body line-clamp-1">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/60">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />}
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
