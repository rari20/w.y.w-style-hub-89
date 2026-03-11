import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

interface InventoryItem {
  name: string;
  collection: string;
  sku: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const getStatus = (stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 4) return 'Low Stock';
  return 'In Stock';
};

const initialInventory: InventoryItem[] = [
  { name: 'Ethereal Silk Blouse', brand: 'Lumenwear', sku: 'LMW-001', stock: 18, status: 'In Stock' },
  { name: 'Gossamer Wrap Dress', brand: 'Lumenwear', sku: 'LMW-002', stock: 12, status: 'In Stock' },
  { name: 'Powerline Structured Blazer', brand: 'Voltex Studio', sku: 'VTX-001', stock: 9, status: 'In Stock' },
  { name: 'Circuit Tailored Trousers', brand: 'Voltex Studio', sku: 'VTX-002', stock: 3, status: 'Low Stock' },
  { name: 'Flowing Midi Dress', brand: 'ArcThread', sku: 'ARC-001', stock: 7, status: 'In Stock' },
  { name: 'Heavy Wool Overcoat', brand: 'KiloKouture', sku: 'KLK-001', stock: 5, status: 'In Stock' },
  { name: 'Arc Pleat Skirt', brand: 'ArcThread', sku: 'ARC-002', stock: 14, status: 'In Stock' },
  { name: 'Voltage Track Jacket', brand: 'Voltex Studio', sku: 'VTX-003', stock: 0, status: 'Out of Stock' },
  { name: 'Dense Knit Cardigan', brand: 'KiloKouture', sku: 'KLK-002', stock: 6, status: 'In Stock' },
  { name: 'Weighted Silk Scarf', brand: 'KiloKouture', sku: 'KLK-003', stock: 11, status: 'In Stock' },
];

const statusColor: Record<string, string> = {
  'In Stock': 'bg-green-500/20 text-green-700 dark:text-green-400',
  'Low Stock': 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  'Out of Stock': 'bg-red-500/20 text-red-700 dark:text-red-400',
};

export default function AdminInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [newStock, setNewStock] = useState('');

  const lowCount = inventory.filter(i => i.status === 'Low Stock').length;
  const outCount = inventory.filter(i => i.status === 'Out of Stock').length;

  const updateStock = () => {
    if (!editItem || !newStock) return;
    const qty = parseInt(newStock);
    if (isNaN(qty) || qty < 0) { toast.error('Enter a valid number.'); return; }
    setInventory(prev => prev.map(i => i.sku === editItem.sku ? { ...i, stock: qty, status: getStatus(qty) } : i));
    toast.success(`${editItem.name} stock updated to ${qty}.`);
    setEditItem(null);
    setNewStock('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display">Inventory</h1>

        <div className="flex gap-3 text-sm font-body">
          <span className="text-amber-600 dark:text-amber-400">{lowCount} items low stock</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-red-600 dark:text-red-400">{outCount} item{outCount !== 1 ? 's' : ''} out of stock</span>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Product Name', 'Brand', 'SKU', 'Stock Count', 'Status', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map(item => (
                  <TableRow key={item.sku}>
                    <TableCell className="text-xs font-medium">{item.name}</TableCell>
                    <TableCell className="text-xs">{item.brand}</TableCell>
                    <TableCell className="text-xs font-mono">{item.sku}</TableCell>
                    <TableCell className="text-xs">{item.stock}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[item.status]}`}>{item.status}</span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { setEditItem(item); setNewStock(String(item.stock)); }}>
                        Update Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editItem} onOpenChange={open => { if (!open) setEditItem(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Update Stock</DialogTitle>
            <DialogDescription>{editItem?.name} ({editItem?.sku})</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input type="number" min={0} value={newStock} onChange={e => setNewStock(e.target.value)} className="text-sm" placeholder="New stock quantity" />
            <Button size="sm" className="w-full" onClick={updateStock}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
