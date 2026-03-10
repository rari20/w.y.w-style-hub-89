import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Gift } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { customers, tierColors, type AdminCustomer } from '@/data/adminData';

export default function AdminCustomers() {
  const [customerList, setCustomerList] = useState(customers);
  const [search, setSearch] = useState('');
  const [editCustomer, setEditCustomer] = useState<AdminCustomer | null>(null);
  const [editTier, setEditTier] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [discountCustomer, setDiscountCustomer] = useState<AdminCustomer | null>(null);
  const [discountCode, setDiscountCode] = useState('');

  const filtered = customerList.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const openEdit = (c: AdminCustomer) => {
    setEditCustomer(c);
    setEditTier(c.loyaltyTier);
    setEditNotes(c.notes);
  };

  const saveEdit = () => {
    if (!editCustomer) return;
    setCustomerList(prev => prev.map(c => c.id === editCustomer.id ? { ...c, loyaltyTier: editTier as AdminCustomer['loyaltyTier'], notes: editNotes } : c));
    toast.success(`${editCustomer.id} updated.`);
    setEditCustomer(null);
  };

  const sendDiscount = () => {
    if (!discountCustomer || !discountCode) { toast.error('Select a discount code.'); return; }
    toast.success(`${discountCode} sent to ${discountCustomer.id}.`);
    setDiscountCustomer(null);
    setDiscountCode('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display">All Customers</h1>

        <Input placeholder="Search by ID, name, or email..." className="text-sm w-full sm:w-72" value={search} onChange={e => setSearch(e.target.value)} />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Customer ID', 'Name', 'Email', 'Loyalty Tier', 'Total Spend', 'Join Date', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="text-xs font-mono font-medium">{c.id}</TableCell>
                    <TableCell className="text-xs">{c.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.email}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tierColors[c.loyaltyTier]}`}>{c.loyaltyTier}</span>
                    </TableCell>
                    <TableCell className="text-xs font-medium">£{c.totalSpend}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        <button className="p-1 hover:bg-muted rounded transition-colors" title="View profile" onClick={() => toast.info(`Profile: ${c.id} — ${c.name}`)}>
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit" onClick={() => openEdit(c)}>
                          <Edit className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors" title="Send discount" onClick={() => setDiscountCustomer(c)}>
                          <Gift className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editCustomer} onOpenChange={open => { if (!open) setEditCustomer(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Customer</DialogTitle>
            <DialogDescription>{editCustomer?.id} — {editCustomer?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-body text-muted-foreground mb-1 block">Loyalty Tier</label>
              <Select value={editTier} onValueChange={setEditTier}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Spark', 'Volt', 'Surge', 'Watt'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-body text-muted-foreground mb-1 block">Internal Notes</label>
              <Textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} className="text-sm" rows={3} placeholder="Add notes..." />
            </div>
            <Button size="sm" className="w-full" onClick={saveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Discount Modal */}
      <Dialog open={!!discountCustomer} onOpenChange={open => { if (!open) setDiscountCustomer(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Send Discount</DialogTitle>
            <DialogDescription>Send a discount code to {discountCustomer?.id}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={discountCode} onValueChange={setDiscountCode}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select discount code" /></SelectTrigger>
              <SelectContent>
                {['WELCOME10', 'SPARK20', 'FREESHIP30', 'VOLT15', 'SPRING25'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button size="sm" className="w-full" onClick={sendDiscount}>Send Discount</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
