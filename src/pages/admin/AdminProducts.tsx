import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  name: string;
  collection: string;
  price: number;
  category: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const initialProducts: Product[] = [
  { name: 'Ethereal Silk Blouse', collection: 'Lumenwear', price: 245, category: 'Tops', stock: 18, status: 'In Stock' },
  { name: 'Gossamer Wrap Dress', collection: 'Lumenwear', price: 385, category: 'Dresses', stock: 12, status: 'In Stock' },
  { name: 'Powerline Structured Blazer', collection: 'Voltex Studio', price: 495, category: 'Outerwear', stock: 9, status: 'In Stock' },
  { name: 'Circuit Tailored Trousers', collection: 'Voltex Studio', price: 275, category: 'Trousers', stock: 3, status: 'Low Stock' },
  { name: 'Flowing Midi Dress', collection: 'ArcThread', price: 425, category: 'Dresses', stock: 7, status: 'In Stock' },
  { name: 'Heavy Wool Overcoat', collection: 'KiloKouture', price: 895, category: 'Outerwear', stock: 5, status: 'In Stock' },
  { name: 'Arc Pleat Skirt', collection: 'ArcThread', price: 245, category: 'Skirts', stock: 14, status: 'In Stock' },
  { name: 'Voltage Track Jacket', collection: 'Voltex Studio', price: 345, category: 'Outerwear', stock: 0, status: 'Out of Stock' },
  { name: 'Dense Knit Cardigan', collection: 'KiloKouture', price: 545, category: 'Knitwear', stock: 6, status: 'In Stock' },
  { name: 'Weighted Silk Scarf', collection: 'KiloKouture', price: 245, category: 'Accessories', stock: 11, status: 'In Stock' },
];

const statusColor: Record<string, string> = {
  'In Stock': 'bg-green-500/20 text-green-700 dark:text-green-400',
  'Low Stock': 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  'Out of Stock': 'bg-red-500/20 text-red-700 dark:text-red-400',
};

const allCollections = ['All', 'Lumenwear', 'Voltex Studio', 'ArcThread', 'KiloKouture'];
const allCategories = ['All', 'Tops', 'Dresses', 'Outerwear', 'Trousers', 'Skirts', 'Knitwear', 'Accessories'];
const allStatuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (collectionFilter !== 'All' && p.collection !== collectionFilter) return false;
    if (catFilter !== 'All' && p.category !== catFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display">All Products</h1>
          <Button size="sm" onClick={() => setShowCreate(true)}>Add New Product</Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Input placeholder="Search products..." className="text-sm w-full sm:w-56" value={search} onChange={e => setSearch(e.target.value)} />
          <Select value={collectionFilter} onValueChange={setCollectionFilter}>
            <SelectTrigger className="text-sm w-40"><SelectValue /></SelectTrigger>
            <SelectContent>{allCollections.map(b => <SelectItem key={b} value={b}>{b === 'All' ? 'All Collections' : b}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="text-sm w-40"><SelectValue /></SelectTrigger>
            <SelectContent>{allCategories.map(c => <SelectItem key={c} value={c}>{c === 'All' ? 'All Categories' : c}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="text-sm w-40"><SelectValue /></SelectTrigger>
            <SelectContent>{allStatuses.map(s => <SelectItem key={s} value={s}>{s === 'All' ? 'All Status' : s}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Product Name', 'Collection', 'Price', 'Category', 'Stock Status', 'Actions'].map(h => (
                    <TableHead key={h} className="text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.name}>
                    <TableCell className="text-xs font-medium">{p.name}</TableCell>
                    <TableCell className="text-xs">{p.collection}</TableCell>
                    <TableCell className="text-xs">£{p.price}</TableCell>
                    <TableCell className="text-xs">{p.category}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>{p.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => toast.info('Edit modal would open here.')}>Edit</button>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setProducts(prev => prev.filter(x => x.name !== p.name)); toast.success(`${p.name} archived.`); }}>Archive</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">No products found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add New Product</DialogTitle>
            <DialogDescription>Add a product to the W.Y.W catalogue</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Product Name" className="text-sm" />
            <Select defaultValue="Lumenwear">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {allBrands.filter(b => b !== 'All').map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Price (£)" type="number" className="text-sm" />
            <Select defaultValue="Tops">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {allCategories.filter(c => c !== 'All').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea placeholder="Description..." className="text-sm" />
            <Input placeholder="Stock quantity" type="number" className="text-sm" />
            <Button size="sm" className="w-full" onClick={() => { setShowCreate(false); toast.success('Product added successfully.'); }}>Save Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
