"use client";

import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import WorkflowTimeline from "@/components/dashboard/WorkflowTimeline";

type MfgOrder = { 
  id: string; 
  mo_number: string; 
  product_name: string; 
  planned_qty: number; 
  created_at: string; 
  status: string 
};

const initialOrders: MfgOrder[] = [
  { id: "MO-2026-001", mo_number: "MO-2026-001", product_name: "Royal Teak Bed Frame (King)", planned_qty: 15, created_at: "2026-06-19", status: "in_progress" },
  { id: "MO-2026-002", mo_number: "MO-2026-002", product_name: "6-Seater Dining Table Set", planned_qty: 30, created_at: "2026-06-20", status: "ready" },
  { id: "MO-2026-003", mo_number: "MO-2026-003", product_name: "3-Door Wardrobe (Walnut)", planned_qty: 10, created_at: "2026-06-18", status: "completed" },
];

function MfgOrdersContent() {
  const [orders, setOrders] = useState<MfgOrder[]>(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<MfgOrder | null>(null);
  const [formData, setFormData] = useState({ product: "", qty: 0, status: "ready" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`http://localhost:8000/api/v1/manufacturing/orders?view=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // If empty from API, fall back to initial local orders
        setOrders(data.items && data.items.length > 0 ? data.items : initialOrders);
      } else {
        setOrders(initialOrders);
      }
    } catch (err) {
      console.warn('Could not fetch manufacturing orders from backend, using local data.', err);
      setOrders(initialOrders);
    }
  };

  const handleOpenAdd = () => {
    setEditingOrder(null);
    setFormData({ product: "", qty: 10, status: "ready" });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map((o) => o.id === editingOrder.id ? { 
        ...o, 
        product_name: formData.product, 
        planned_qty: formData.qty, 
        status: formData.status 
      } : o));
    } else {
      const nextId = `MO-2026-${String(orders.length + 1).padStart(3, "0")}`;
      const newOrder: MfgOrder = {
        id: nextId,
        mo_number: nextId,
        product_name: formData.product,
        planned_qty: formData.qty,
        created_at: new Date().toISOString(),
        status: formData.status,
      };
      setOrders([...orders, newOrder]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Manufacturing Orders</h2>
          <p className="text-muted-foreground mt-1">Schedule furniture builds, configure lines, and dispatch works orders.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Add Production Run
        </Button>
      </div>

      <Card className="glass-panel border-none shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-white/10 dark:bg-slate-900/10 border-b border-border/40">
          <CardTitle className="text-foreground">All Active Production Runs</CardTitle>
          <CardDescription className="text-muted-foreground">Total job orders currently dispatching across workshops.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-border/40">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Order ID</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Product</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Target Output Qty</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Scheduled Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Operational Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-b border-border/30 hover:bg-slate-200/20 dark:hover:bg-slate-800/10">
                  <TableCell className="font-mono text-violet-600 dark:text-violet-400 font-semibold px-6 py-4">{order.mo_number}</TableCell>
                  <TableCell className="text-foreground font-semibold px-6 py-4">{order.product_name || 'N/A'}</TableCell>
                  <TableCell className="text-foreground px-6 py-4">{order.planned_qty} units</TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <WorkflowTimeline currentStatus={order.status} steps={['draft', 'ready', 'in_progress', 'completed', 'cancelled']} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="glass-panel border-none w-full max-w-md p-6 relative rounded-2xl shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-foreground">{editingOrder ? "Edit Work Order" : "Create Work Order"}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Product Name</label>
                <input
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g. Royal Teak Bed Frame"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Quantity</label>
                <input
                  required
                  type="number"
                  value={formData.qty}
                  onChange={(e) => setFormData({ ...formData, qty: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 15"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                >
                  <option value="draft">DRAFT</option>
                  <option value="ready">READY</option>
                  <option value="in_progress">IN_PROGRESS</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-xl text-sm mt-4">
                Save Work Order details
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function MfgOrdersPage() {
  return (
    <Suspense fallback={<div className="text-slate-400 p-6">Loading orders...</div>}>
      <MfgOrdersContent />
    </Suspense>
  );
}
