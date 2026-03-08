import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pause, Eye, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const campaigns = [
  {
    name: 'Churn Re-engagement Campaign',
    status: 'ACTIVE',
    statusColor: 'bg-red-500/20 text-red-700 dark:text-red-400',
    target: '25 at-risk customers (Segment D)',
    preview: "We miss you [Name] — here's 20% off your next W.Y.W order. Use code COMEBACK20.",
    sent: 25, opened: 10, clicked: 5, converted: 0,
    hasWhatsApp: true,
  },
  {
    name: 'Volt Tier Progression Nudge',
    status: 'ACTIVE',
    statusColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
    target: '10 Volt tier customers',
    preview: "You're [X] points away from Surge tier — shop now to unlock free express delivery.",
    sent: 5, opened: 4, clicked: 3, converted: 2,
    hasWhatsApp: false,
  },
];

export default function AdminEmailCampaigns() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display">Email Campaigns</h1>
          <Button size="sm" onClick={() => setShowCreate(true)}>Create Email Campaign</Button>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
            <TabsTrigger value="scheduled" className="text-xs">Scheduled</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            {campaigns.map(c => (
              <Card key={c.name}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-body font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">Target: {c.target}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.statusColor}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{c.preview}"</p>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { label: 'Sent', value: c.sent },
                      { label: 'Opened', value: c.opened },
                      { label: 'Clicked', value: c.clicked },
                      { label: 'Converted', value: c.converted },
                    ].map(m => (
                      <div key={m.label}>
                        <p className="text-lg font-display">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => toast.info('Campaign paused.')}>
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs gap-1.5">
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </Button>
                    {c.hasWhatsApp && (
                      <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => toast.success('WhatsApp follow-up sent.')}>
                        <Send className="h-3.5 w-3.5" /> Send WhatsApp Follow-up
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4">
            <p className="text-sm text-muted-foreground font-body py-8 text-center">No scheduled campaigns.</p>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <p className="text-sm text-muted-foreground font-body py-8 text-center">No completed campaigns yet.</p>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Create Email Campaign</DialogTitle>
            <DialogDescription>Build and schedule a targeted email campaign</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Campaign name" className="text-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All customers</SelectItem>
                <SelectItem value="tier">By tier</SelectItem>
                <SelectItem value="churn">Churn risk only</SelectItem>
                <SelectItem value="custom">Custom segment</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Subject line" className="text-sm" />
            <div>
              <Textarea placeholder="Message body..." className="text-sm" rows={4} />
              <p className="text-[10px] text-muted-foreground mt-1">Merge fields: {'{name}'}, {'{tier}'}, {'{points}'}, {'{discount_code}'}</p>
            </div>
            <Select>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Attach discount code (optional)" /></SelectTrigger>
              <SelectContent>
                {['WELCOME10', 'SPARK20', 'COMEBACK20', 'FREESHIP30', 'VOLT15'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-4">
              {['Email', 'WhatsApp'].map(ch => (
                <label key={ch} className="flex items-center gap-2 text-xs font-body">
                  <input type="checkbox" defaultChecked={ch === 'Email'} className="accent-primary" /> {ch}
                </label>
              ))}
            </div>
            <Select defaultValue="now">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Send now</SelectItem>
                <SelectItem value="schedule">Schedule for date</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="w-full" onClick={() => { setShowCreate(false); toast.success('Campaign created and sent.'); }}>
              Send Campaign
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
