"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Clock, CheckCircle, Truck, Search } from "lucide-react";

const allOrders = [
  { id: "INV-2023-001", product: "Royal Teak Bed Frame (King)", date: "Mar 10, 2023", amount: "₹45,000", status: "Delivered", tracking: "TN2023001" },
  { id: "INV-2023-088", product: "Custom Furniture Design Service", date: "May 22, 2023", amount: "₹12,000", status: "Delivered", tracking: "TN2023088" },
  { id: "INV-2024-015", product: "6-Seater Dining Table Set", date: "Feb 14, 2024", amount: "₹72,000", status: "Delivered", tracking: "TN2024015" },
  { id: "INV-2024-201", product: "L-Shape Sofa Set (7-Seater)", date: "Jun 05, 2024", amount: "₹55,000", status: "In Transit", tracking: "TN2024201" },
  { id: "INV-2024-312", product: "3-Door Wardrobe (Walnut)", date: "Jun 19, 2024", amount: "₹38,500", status: "Processing", tracking: "TN2024312" },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Delivered:   { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
  "In Transit": { color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",   icon: Truck },
  Processing:  { color: "bg-amber-500/10 text-amber-400 border-amber-500/20",       icon: Clock },
};

export default function CustomerOrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = allOrders.filter((o) => {
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const totalSpent = allOrders.reduce((acc, o) => acc + parseInt(o.amount.replace(/[₹,]/g, "")), 0);
  const delivered = allOrders.filter((o) => o.status === "Delivered").length;
  const pending = allOrders.filter((o) => o.status !== "Delivered").length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-slate-400">Track your orders, view purchase history, and manage deliveries.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: ShoppingCart, color: "indigo" },
          { label: "Delivered Orders", value: delivered, icon: CheckCircle, color: "emerald" },
          { label: "Pending / In Transit", value: pending, icon: Clock, color: "amber" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-slate-900 border-slate-800">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Delivered", "In Transit", "Processing"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800/50">
                <TableHead className="text-slate-400 py-4 px-6">Invoice ID</TableHead>
                <TableHead className="text-slate-400 py-4 px-6">Product / Service</TableHead>
                <TableHead className="text-slate-400 py-4 px-6">Date</TableHead>
                <TableHead className="text-slate-400 py-4 px-6">Amount</TableHead>
                <TableHead className="text-slate-400 py-4 px-6">Status</TableHead>
                <TableHead className="text-slate-400 py-4 px-6">Tracking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 py-10">No orders found.</TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => {
                  const cfg = statusConfig[order.status];
                  const Icon = cfg.icon;
                  return (
                    <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-mono text-slate-300 py-4 px-6 text-sm">{order.id}</TableCell>
                      <TableCell className="text-white py-4 px-6">{order.product}</TableCell>
                      <TableCell className="text-slate-400 py-4 px-6 text-sm">{order.date}</TableCell>
                      <TableCell className="text-slate-300 font-semibold py-4 px-6">{order.amount}</TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge variant="outline" className={`${cfg.color} flex items-center gap-1 w-fit`}>
                          <Icon className="h-3 w-3" />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-xs text-indigo-400 font-mono">{order.tracking}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
