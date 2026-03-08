import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { customers } from '@/data/adminData';

const columns = [
  {
    title: 'Day 1: Email Sent',
    color: 'border-blue-500',
    headerBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    cards: [
      { id: 'WYW011', label: 'Email sent today' },
      { id: 'WYW012', label: 'Email sent today' },
      { id: 'WYW015', label: 'Email sent today' },
    ],
  },
  {
    title: 'Day 7: WhatsApp Follow-up',
    color: 'border-amber-500',
    headerBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    cards: [{ id: 'WYW013', label: 'Email unopened — WhatsApp sent' }],
  },
  {
    title: 'Day 14: Final Offer',
    color: 'border-red-500',
    headerBg: 'bg-red-500/10 text-red-700 dark:text-red-400',
    cards: [{ id: 'WYW014', label: 'Free consultation offered — awaiting response' }],
  },
];

export default function AdminRetention() {
  const [showCreate, setShowCreate] = useState(false);

  const getName = (id: string) => customers.find(c => c.id === id)?.name || id;
  const getDays = (id: string) => customers.find(c => c.id === id)?.daysInactive || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display">Retention Campaigns</h1>
          <Button size="sm" onClick={() => setShowCreate(true)}>Create New Campaign</Button>
        </div>

        {/* Kanban */}
        <div className="grid md:grid-cols-3 gap-4">
          {columns.map(col => (
            <div key={col.title} className={`border-t-2 ${col.color} rounded-lg bg-card`}>
              <div className={`px-4 py-2.5 ${col.headerBg} rounded-t-lg`}>
                <p className="text-xs font-body font-medium">{col.title}</p>
              </div>
              <div className="p-3 space-y-2">
                {col.cards.map(card => (
                  <Card key={card.id} className="border">
                    <CardContent className="p-3">
                      <p className="text-xs font-body font-medium">{getName(card.id)}</p>
                      <p className="text-[10px] text-muted-foreground">{getDays(card.id)} days inactive</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{card.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-body font-medium">Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Emails Sent', value: '25' },
                { label: 'Open Rate', value: '40%' },
                { label: 'Consultations Booked', value: '0' },
              ].map(m => (
                <div key={m.label}>
                  <p className="text-2xl font-display">{m.value}</p>
                  <p className="text-xs text-muted-foreground font-body">{m.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Create New Campaign</DialogTitle>
            <DialogDescription>Set up a targeted retention campaign</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Campaign Name" className="text-sm" />
            <Select defaultValue="churn">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="churn">All Churn Risk</SelectItem>
                <SelectItem value="spark">Spark Tier</SelectItem>
                <SelectItem value="inactive">Inactive 60+ days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Discount Offer" className="text-sm" />
            <Textarea placeholder="Message template..." className="text-sm" />
            <div className="flex gap-4">
              {['Email', 'WhatsApp'].map(ch => (
                <label key={ch} className="flex items-center gap-2 text-xs font-body">
                  <input type="checkbox" defaultChecked className="accent-primary" /> {ch}
                </label>
              ))}
            </div>
            <Input type="date" className="text-sm" />
            <Button size="sm" className="w-full" onClick={() => { setShowCreate(false); toast.success('Campaign created successfully.'); }}>Create Campaign</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
