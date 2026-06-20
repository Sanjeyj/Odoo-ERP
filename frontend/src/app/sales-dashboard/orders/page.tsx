"use client";

import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import WorkflowTimeline from "@/components/dashboard/WorkflowTimeline";

type SalesOrder = { 
  id: string; 
  order_number: string; 
  customer_name: string; 
  created_at: string; 
  total_amount: string; 
  status: string 
};

const initialOrders: SalesOrder[] = [
  { id: "1", order_number: "SO-2026-001", customer_name: "Priya Sharma", created_at: "2026-06-19", total_amount: "45,000", status: "confirmed" },
  { id: "2", order_number: "SO-2026-002", customer_name: "Arun Menon", created_at: "2026-06-18", total_amount: "72,000", status: "processing" },
  { id: "3", order_number: "SO-2026-003", customer_name: "Deepa Nair", created_at: "2026-06-20", total_amount: "55,000", status: "draft" },
];

function SalesOrdersContent() {
  const [orders, setOrders] = useState<SalesOrder[]>(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<SalesOrder | null>(null);
  const [formData, setFormData] = useState({ customer: "", amount: "", status: "draft" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`http://localhost:8000/api/v1/sales/orders?view=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.items && data.items.length > 0 ? data.items : initialOrders);
      } else {
        setOrders(initialOrders);
      }
    } catch (err) {
      console.warn("Could not fetch sales orders, using fallback.", err);
      setOrders(initialOrders);
    }
  };

  const handleOpenAdd = () => {
    setEditingOrder(null);
    setFormData({ customer: "", amount: "", status: "draft" });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map((o) => o.id === editingOrder.id ? { 
        ...o, 
        customer_name: formData.customer,
        total_amount: formData.amount,
        status: formData.status
      } : o));
    } else {
      const nextId = `SO-2026-${String(orders.length + 1).padStart(3, "0")}`;
      const newSO: SalesOrder = {
        id: nextId,
        order_number: nextId,
        customer_name: formData.customer,
        created_at: new Date().toISOString(),
        total_amount: formData.amount.replace(/[₹,]/g, ""),
        status: formData.status,
      };
      setOrders([...orders, newSO]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Sales Orders</h2>
          <p className="text-muted-foreground mt-1">View sales workflows, edit booking statuses, and record offline transactions.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md">
          <Plus className="mr-2 h-4 w-4" /> New Sales Order
        </Button>
      </div>

      <Card className="glass-panel border-none shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-white/10 dark:bg-slate-900/10 border-b border-border/40">
          <CardTitle className="text-foreground">Active Bookings Registry</CardTitle>
          <CardDescription className="text-muted-foreground">Total consumer bookings recorded via portal logins.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-border/40">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Order ID</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Customer</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Order Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Total Value</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-b border-border/30 hover:bg-slate-200/20 dark:hover:bg-slate-800/10">
                  <TableCell className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold px-6 py-4">{order.order_number}</TableCell>
                  <TableCell className="text-foreground font-semibold px-6 py-4">{order.customer_name || 'N/A'}</TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-foreground font-semibold px-6 py-4">₹{order.total_amount}</TableCell>
                  <TableCell className="px-6 py-4">
                    <WorkflowTimeline currentStatus={order.status} steps={['draft', 'confirmed', 'partially_delivered', 'delivered', 'cancelled']} />
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
              <CardTitle className="text-white">{editingOrder ? "Edit Sales Order" : "Create Sales Order"}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Customer Name</label>
                <input
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Total Value (₹)</label>
                <input
                  required
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 45000"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-100/50 dark:bg-slate-950/50 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="draft">DRAFT</option>
                  <option value="processing">PROCESSING</option>
                  <option value="confirmed">CONFIRMED</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-xl text-sm mt-4">
                Save Order Record
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function SalesOrdersPage() {
  return (
    <Suspense fallback={<div className="text-slate-400 p-6">Loading orders...</div>}>
      <SalesOrdersContent />
    </Suspense>
  );
}
