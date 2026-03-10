import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReturnItem {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Refunded';
}

const initialReturns: ReturnItem[] = [
  { id: 'RET-001', orderId: 'WYW-2026-0071', customer: 'C022', reason: 'Wrong size', date: '08 Mar 2026', status: 'Pending' },
  { id: 'RET-002', orderId: 'WYW-2026-0065', customer: 'C041', reason: 'Changed mind', date: '06 Mar 2026', status: 'Approved' },
  { id: 'RET-003', orderId: 'WYW-2026-0058', customer: 'C015', reason: 'Faulty item', date: '02 Mar 2026', status: 'Refunded' },
];

const statusColor: Record<string, string> = {
  Pending: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Approved: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Refunded: 'bg-green-500/20 text-green-700 dark:text-green-400',
};

export default function AdminReturns() {
  const [returns, setReturns] = useState(initialReturns);

  const approve = (id: string) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' as const } : r));
    toast.success(`Return ${id} approved.`);
  };

  const reject = (id: string) => {
    setReturns(prev => prev.filter(r => r.id !== id));
    toast.success(`Return ${id} rejected.`);
  };

  const issueRefund = (id: string) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status: 'Refunded' as const } : r));
    toast.success(`Refund issued for ${id}.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display">Returns</h1>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Return ID', 'Order ID', 'Customer', 'Reason', 'Date Requested', 'Status', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="text-xs font-mono font-medium">{r.id}</TableCell>
                    <TableCell className="text-xs font-mono">{r.orderId}</TableCell>
                    <TableCell className="text-xs">{r.customer}</TableCell>
                    <TableCell className="text-xs">{r.reason}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.date}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[r.status]}`}>{r.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {r.status === 'Pending' && (
                          <>
                            <button className="text-xs text-green-600 hover:underline" onClick={() => approve(r.id)}>Approve</button>
                            <button className="text-xs text-red-500 hover:underline" onClick={() => reject(r.id)}>Reject</button>
                          </>
                        )}
                        {r.status === 'Approved' && (
                          <button className="text-xs text-primary hover:underline" onClick={() => issueRefund(r.id)}>Issue Refund</button>
                        )}
                        {r.status === 'Refunded' && (
                          <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => toast.info(`Viewing return ${r.id}`)}>View</button>
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
