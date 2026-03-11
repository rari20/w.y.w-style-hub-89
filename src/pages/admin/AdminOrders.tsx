import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customer: string;
  date: string;
  items: string;
  total: string;
  status: 'Processing' | 'Dispatched' | 'Delivered';
  fulfilment: 'Delivery' | 'Click & Collect';
}

const initialOrders: Order[] = [
  { id: 'WYW-2026-0089', customer: 'C012', date: '10 Mar 2026', items: '1 item', total: '£245', status: 'Processing', fulfilment: 'Delivery' },
  { id: 'WYW-2026-0088', customer: 'C031', date: '09 Mar 2026', items: '2 items', total: '£630', status: 'Dispatched', fulfilment: 'Click & Collect' },
  { id: 'WYW-2026-0087', customer: 'C007', date: '09 Mar 2026', items: '1 item', total: '£385', status: 'Dispatched', fulfilment: 'Delivery' },
  { id: 'WYW-2026-0086', customer: 'C044', date: '08 Mar 2026', items: '3 items', total: '£1,240', status: 'Delivered', fulfilment: 'Click & Collect' },
  { id: 'WYW-2026-0085', customer: 'C019', date: '08 Mar 2026', items: '1 item', total: '£495', status: 'Delivered', fulfilment: 'Delivery' },
  { id: 'WYW-2026-0084', customer: 'C003', date: '07 Mar 2026', items: '2 items', total: '£520', status: 'Delivered', fulfilment: 'Delivery' },
  { id: 'WYW-2026-0083', customer: 'C028', date: '06 Mar 2026', items: '1 item', total: '£895', status: 'Delivered', fulfilment: 'Click & Collect' },
  { id: 'WYW-2026-0082', customer: 'C011', date: '05 Mar 2026', items: '4 items', total: '£1,710', status: 'Delivered', fulfilment: 'Delivery' },
];

const statusColor: Record<string, string> = {
  Processing: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Dispatched: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Delivered: 'bg-green-500/20 text-green-700 dark:text-green-400',
};

const nextStatus: Record<string, 'Dispatched' | 'Delivered'> = {
  Processing: 'Dispatched',
  Dispatched: 'Delivered',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = nextStatus[o.status];
      if (next) {
        toast.success(`Order ${id} updated to ${next}.`);
        return { ...o, status: next };
      }
      return o;
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display">All Orders</h1>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell className="text-xs font-mono font-medium">{o.id}</TableCell>
                    <TableCell className="text-xs">{o.customer}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                    <TableCell className="text-xs">{o.items}</TableCell>
                    <TableCell className="text-xs font-medium">{o.total}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[o.status]}`}>{o.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => toast.info(`Viewing order ${o.id}`)}>View</button>
                        {o.status !== 'Delivered' && (
                          <button className="text-xs text-primary hover:underline" onClick={() => updateStatus(o.id)}>Update Status</button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
