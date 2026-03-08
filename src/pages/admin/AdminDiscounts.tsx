import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { discountCodes } from '@/data/adminData';

const statusColors: Record<string, string> = {
  Active: 'bg-green-500/20 text-green-700 dark:text-green-400',
  'Active (Retention)': 'bg-red-500/20 text-red-700 dark:text-red-400',
  Expired: 'bg-muted text-muted-foreground',
};

export default function AdminDiscounts() {
  const [codes, setCodes] = useState(discountCodes);
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState('');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display">Discounts & Coupons</h1>
          <Button size="sm" onClick={() => setShowCreate(true)}>Create New Discount</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Code', 'Type', 'Value', 'Usage', 'Expires', 'Status', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map(c => (
                  <TableRow key={c.code}>
                    <TableCell className="text-xs font-mono font-medium">{c.code}</TableCell>
                    <TableCell className="text-xs">{c.type}</TableCell>
                    <TableCell className="text-xs">{c.value}</TableCell>
                    <TableCell className="text-xs">{c.usage}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.expires}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[c.status] || ''}`}>{c.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => toast.info('Edit modal would open here.')}>Edit</button>
                        <button className="text-xs text-red-500 hover:text-red-700 transition-colors" onClick={() => { setCodes(prev => prev.filter(d => d.code !== c.code)); toast.success(`${c.code} deactivated.`); }}>Deactivate</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Create New Discount</DialogTitle>
            <DialogDescription>Set up a new discount code</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Code" className="text-sm flex-1" value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} />
              <Button size="sm" variant="outline" onClick={() => setNewCode(`WYW${Math.random().toString(36).substring(2, 6).toUpperCase()}`)}>Generate</Button>
            </div>
            <Select defaultValue="percentage">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Percentage', 'Fixed Amount', 'Free Delivery', 'Double Points', 'Free Consultation'].map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Value (e.g. 20)" type="number" className="text-sm" />
            <Input placeholder="Usage limit (leave empty for unlimited)" type="number" className="text-sm" />
            <Input type="date" className="text-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All customers</SelectItem>
                <SelectItem value="spark">Spark tier only</SelectItem>
                <SelectItem value="churn">Churn risk customers only</SelectItem>
                <SelectItem value="specific">Specific customer IDs</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Minimum order value (optional)" type="number" className="text-sm" />
            <Button size="sm" className="w-full" onClick={() => {
              if (!newCode) { toast.error('Enter a code.'); return; }
              setCodes(prev => [...prev, { code: newCode, type: 'Percentage', value: '20% off', usage: '0/∞', expires: 'TBD', status: 'Active' as const }]);
              setShowCreate(false); setNewCode('');
              toast.success(`Discount ${newCode} created.`);
            }}>Save Discount</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
