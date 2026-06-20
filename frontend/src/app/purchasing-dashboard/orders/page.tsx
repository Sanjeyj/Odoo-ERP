"use client";

import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import WorkflowTimeline from "@/components/dashboard/WorkflowTimeline";

type PurchaseOrder = { 
  id: string; 
  order_number: string; 
  vendor_name: string; 
  items: { product_name: string }[]; 
  created_at: string; 
  total_amount: string; 
  status: string 
};

const initialOrders: PurchaseOrder[] = [
  { id: "1", order_number: "PO-2026-001", vendor_name: "TimberKing Lumber Co.", items: [{ product_name: "Teak Wood Planks" }], created_at: "2026-06-19", total_amount: "85,000", status: "ordered" },
  { id: "2", order_number: "PO-2026-002", vendor_name: "FoamPro Upholstery", items: [{ product_name: "Premium Foam Padding" }], created_at: "2026-06-18", total_amount: "42,000", status: "received" },
  { id: "3", order_number: "PO-2026-003", vendor_name: "SteelCraft Hardware Hub", items: [{ product_name: "Steel Chair Legs" }], created_at: "2026-06-20", total_amount: "18,500", status: "draft" },
];

function PurchasingOrdersContent() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null);
  const [formData, setFormData] = useState({ vendor: "", material: "", amount: "", status: "draft" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`http://localhost:8000/api/v1/purchases/orders?view=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.items && data.items.length > 0 ? data.items : initialOrders);
      } else {
        setOrders(initialOrders);
      }
    } catch (err) {
      console.warn("Could not fetch purchase orders, using fallback.", err);
      setOrders(initialOrders);
    }
  };

  const handleOpenAdd = () => {
    setEditingOrder(null);
    setFormData({ vendor: "", material: "", amount: "", status: "draft" });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map((o) => o.id === editingOrder.id ? { 
        ...o, 
        vendor_name: formData.vendor,
        items: [{ product_name: formData.material }],
        total_amount: formData.amount,
        status: formData.status
      } : o));
    } else {
      const nextId = `PO-2026-${String(orders.length + 1).padStart(3, "0")}`;
      const newPO: PurchaseOrder = {
        id: nextId,
        order_number: nextId,
        vendor_name: formData.vendor,
        items: [{ product_name: formData.material }],
        created_at: new Date().toISOString(),
        total_amount: formData.amount.replace(/[₹,]/g, ""),
        status: formData.status,
      };
      setOrders([...orders, newPO]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Purchase Orders</h2>
          <p className="text-muted-foreground mt-1">Manage vendor POs, tracking details, and status updates.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Create PO
        </Button>
      </div>

      <Card className="glass-panel border-none shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-white/10 dark:bg-slate-900/10 border-b border-border/40">
          <CardTitle className="text-foreground">Purchase Registry</CardTitle>
          <CardDescription className="text-muted-foreground">Total active procurement entries managed by your office.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-border/40">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">PO Number</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Vendor</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Material Requested</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Order Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Total Value</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-b border-border/30 hover:bg-slate-200/20 dark:hover:bg-slate-800/10">
                  <TableCell className="font-mono text-amber-600 dark:text-amber-400 font-semibold px-6 py-4">{order.order_number}</TableCell>
                  <TableCell className="text-foreground font-semibold px-6 py-4">{order.vendor_name || 'N/A'}</TableCell>
                  <TableCell className="text-foreground px-6 py-4">
                    {order.items?.map((i) => i.product_name).join(", ") || 'N/A'}
                  </TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-foreground font-semibold px-6 py-4">₹{order.total_amount}</TableCell>
                  <TableCell className="px-6 py-4">
                    <WorkflowTimeline currentStatus={order.status} steps={['draft', 'ordered', 'partially_received', 'received', 'cancelled']} />
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
              <CardTitle className="text-white">{editingOrder ? "Edit Purchase Order" : "Create Purchase Order"}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Vendor</label>
                <input
                  required
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="e.g. TimberKing Lumber Co."
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Material Requested</label>
                <input
                  required
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g. Oak Timber Logs"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Amount (₹)</label>
                <input
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 50000"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  <option value="draft">DRAFT</option>
                  <option value="ordered">ORDERED</option>
                  <option value="received">RECEIVED</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-xl text-sm mt-4">
                Save Purchase Order
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function PurchasingOrdersPage() {
  return (
    <Suspense fallback={<div className="text-slate-400 p-6">Loading orders...</div>}>
      <PurchasingOrdersContent />
    </Suspense>
  );
}
