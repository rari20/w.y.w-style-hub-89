import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Edit, Gift, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { customers, tierColors, riskColors, type AdminCustomer } from '@/data/adminData';

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [emailFilter, setEmailFilter] = useState('All');
  const [viewCustomer, setViewCustomer] = useState<AdminCustomer | null>(null);
  const [editCustomer, setEditCustomer] = useState<AdminCustomer | null>(null);
  const [discountCustomer, setDiscountCustomer] = useState<AdminCustomer | null>(null);
  const [discountType, setDiscountType] = useState('10% off next order');
  const [discountMessage, setDiscountMessage] = useState('');
  const [data, setData] = useState(customers);

  const filtered = data.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (tierFilter !== 'All' && c.loyaltyTier !== tierFilter) return false;
    if (riskFilter !== 'All' && c.churnRisk !== riskFilter) return false;
    if (emailFilter !== 'All' && (emailFilter === 'Yes' ? !c.emailEngaged : c.emailEngaged)) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display">All Customers</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." className="pl-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {[
            { label: 'Loyalty Tier', value: tierFilter, set: setTierFilter, options: ['All', 'Spark', 'Volt', 'Surge', 'Watt'] },
            { label: 'Churn Risk', value: riskFilter, set: setRiskFilter, options: ['All', 'High', 'Medium', 'Low'] },
            { label: 'Email Engagement', value: emailFilter, set: setEmailFilter, options: ['All', 'Yes', 'No'] },
          ].map(f => (
            <Select key={f.label} value={f.value} onValueChange={f.set}>
              <SelectTrigger className="w-[150px] text-xs"><SelectValue placeholder={f.label} /></SelectTrigger>
              <SelectContent>{f.options.map(o => <SelectItem key={o} value={o} className="text-xs">{o === 'All' ? `${f.label}: All` : o}</SelectItem>)}</SelectContent>
            </Select>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['ID', 'Name', 'Email', 'Tier', 'Total Spend', 'Days Inactive', 'Churn Risk', 'Email', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="text-xs font-mono">{c.id}</TableCell>
                    <TableCell className="text-xs font-medium">{c.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.email}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tierColors[c.loyaltyTier]}`}>{c.loyaltyTier}</span>
                    </TableCell>
                    <TableCell className="text-xs">£{c.totalSpend.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{c.daysInactive} days</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${riskColors[c.churnRisk]}`}>{c.churnRisk}</span>
                    </TableCell>
                    <TableCell className="text-xs">{c.emailEngaged ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <button onClick={() => setViewCustomer(c)} className="p-1.5 hover:bg-muted rounded transition-colors"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                        <button onClick={() => setEditCustomer(c)} className="p-1.5 hover:bg-muted rounded transition-colors"><Edit className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                        <button onClick={() => { setDiscountCustomer(c); setDiscountMessage(`Hi ${c.name.split(' ')[0]}, we'd love to welcome you back to W.Y.W with a special offer.`); }} className="p-1.5 hover:bg-muted rounded transition-colors"><Gift className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Customer Modal */}
      <Dialog open={!!viewCustomer} onOpenChange={() => setViewCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">{viewCustomer?.name}</DialogTitle>
            <DialogDescription>{viewCustomer?.id} — {viewCustomer?.email}</DialogDescription>
          </DialogHeader>
          {viewCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-body">
                {[
                  ['Loyalty Tier', viewCustomer.loyaltyTier],
                  ['Total Spend', `£${viewCustomer.totalSpend}`],
                  ['Days Inactive', `${viewCustomer.daysInactive}`],
                  ['Orders (6M)', `${viewCustomer.ordersLast6M}`],
                  ['Return Rate', `${viewCustomer.returnRate}%`],
                  ['Satisfaction', `${viewCustomer.satisfaction}/5`],
                  ['Email Engaged', viewCustomer.emailEngaged ? 'Yes' : 'No'],
                  ['Consultations', `${viewCustomer.consultations}`],
                  ['Segment', viewCustomer.segment],
                  ['Churn Risk', viewCustomer.churnRisk],
                  ['Flagged', viewCustomer.flaggedForRetention ? 'Yes' : 'No'],
                  ['Notes', viewCustomer.notes || '—'],
                ].map(([k, v]) => (
                  <div key={k as string}><span className="text-muted-foreground">{k}:</span> <span className="font-medium">{v}</span></div>
                ))}
              </div>
              <div className={`p-3 rounded text-xs font-body font-medium ${viewCustomer.churnRisk === 'High' ? 'bg-red-500/10 text-red-700 dark:text-red-400' : 'bg-green-500/10 text-green-700 dark:text-green-400'}`}>
                CART Prediction: {viewCustomer.churnRisk === 'High' ? 'CHURN RISK' : 'RETAIN'} — Segment {viewCustomer.segment}
              </div>
              {viewCustomer.churnRisk === 'High' && (
                <Button size="sm" className="w-full" onClick={() => { setViewCustomer(null); setDiscountCustomer(viewCustomer); }}>
                  Send Retention Offer
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Customer Modal */}
      <Dialog open={!!editCustomer} onOpenChange={() => setEditCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit {editCustomer?.name}</DialogTitle>
            <DialogDescription>Modify customer attributes</DialogDescription>
          </DialogHeader>
          {editCustomer && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-body text-muted-foreground">Loyalty Tier</label>
                <Select value={editCustomer.loyaltyTier} onValueChange={v => setEditCustomer({ ...editCustomer, loyaltyTier: v as any })}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{['Spark', 'Volt', 'Surge', 'Watt'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <p className="text-[10px] text-amber-600 mt-1">Manually changing tier will override earned points calculation</p>
              </div>
              <div>
                <label className="text-xs font-body text-muted-foreground">Churn Risk Override</label>
                <Select value={editCustomer.churnRisk} onValueChange={v => setEditCustomer({ ...editCustomer, churnRisk: v as any })}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{['Low', 'Medium', 'High'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-body text-muted-foreground">Internal Admin Notes</label>
                <Textarea className="text-sm" value={editCustomer.notes} onChange={e => setEditCustomer({ ...editCustomer, notes: e.target.value })} placeholder="Notes about this customer..." />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={editCustomer.flaggedForRetention} onChange={e => setEditCustomer({ ...editCustomer, flaggedForRetention: e.target.checked })} className="accent-primary" />
                <label className="text-xs font-body">Flag for retention campaign</label>
              </div>
              <Button size="sm" className="w-full" onClick={() => {
                setData(prev => prev.map(c => c.id === editCustomer.id ? editCustomer : c));
                setEditCustomer(null);
                toast.success(`${editCustomer.name} updated successfully.`);
              }}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Discount Modal */}
      <Dialog open={!!discountCustomer} onOpenChange={() => setDiscountCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Send Discount to {discountCustomer?.name}</DialogTitle>
            <DialogDescription>Choose a discount and delivery method</DialogDescription>
          </DialogHeader>
          {discountCustomer && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-body text-muted-foreground">Discount Type</label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['10% off next order', '20% off next order', 'Free delivery (30 days)', 'Free styling consultation', 'Double points (30 days)'].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-body text-muted-foreground">Message</label>
                <Textarea className="text-sm" value={discountMessage} onChange={e => setDiscountMessage(e.target.value)} />
              </div>
              <div className="flex gap-4">
                {['Email', 'WhatsApp'].map(ch => (
                  <label key={ch} className="flex items-center gap-2 text-xs font-body">
                    <input type="checkbox" defaultChecked={ch === 'Email'} className="accent-primary" /> {ch}
                  </label>
                ))}
              </div>
              <Button size="sm" className="w-full" onClick={() => {
                setDiscountCustomer(null);
                toast.success(`Discount sent to ${discountCustomer.name}.`);
              }}>Send Discount</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
