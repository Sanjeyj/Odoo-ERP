"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link2, Plus, Trash2, ChevronDown, ChevronRight, Shield, Users, Clock, AlertCircle } from "lucide-react";

// ─── Invite Links ─────────────────────────────────────────────────────────────
type InviteLink = { id: string; role: string; expiry: string; uses: number; maxUses: number; created: string; url: string };

const initialLinks: InviteLink[] = [
  { id: "1", role: "Admin",    expiry: "7 Days",  uses: 2,  maxUses: 5,  created: "Jun 19, 2024", url: "https://smarterp.app/invite/ADM-7X9K2" },
  { id: "2", role: "Viewer",   expiry: "30 Days", uses: 8,  maxUses: 20, created: "Jun 10, 2024", url: "https://smarterp.app/invite/VWR-3P8M1" },
];

// ─── Approval Chains ──────────────────────────────────────────────────────────
type Step = { id: string; approver: string; role: string; condition: string };
type Chain = { id: string; name: string; trigger: string; steps: Step[]; active: boolean };

const initialChains: Chain[] = [
  {
    id: "1",
    name: "Purchase Order Approval",
    trigger: "When PO amount > ₹50,000",
    active: true,
    steps: [
      { id: "s1", approver: "Rajan Pillai", role: "Procurement Manager", condition: "Always required" },
      { id: "s2", approver: "Anita Das",    role: "Finance Head",        condition: "If amount > ₹1,00,000" },
      { id: "s3", approver: "CEO Office",   role: "Director",            condition: "If amount > ₹5,00,000" },
    ],
  },
  {
    id: "2",
    name: "Stock Write-Off Approval",
    trigger: "When stock is marked as damaged/lost",
    active: true,
    steps: [
      { id: "s4", approver: "Warehouse Lead", role: "Store Manager",   condition: "Always required" },
      { id: "s5", approver: "Anita Das",      role: "Finance Head",    condition: "If value > ₹10,000" },
    ],
  },
];

const roleOptions = ["Admin", "Manager", "Viewer", "Staff", "Finance"];
const expiryOptions = ["1 Day", "3 Days", "7 Days", "14 Days", "30 Days", "Never"];

export default function AdminSettingsPage() {
  const [links, setLinks] = useState<InviteLink[]>(initialLinks);
  const [chains, setChains] = useState<Chain[]>(initialChains);
  const [copied, setCopied] = useState<string | null>(null);
  const [newLinkRole, setNewLinkRole] = useState("Viewer");
  const [newLinkExpiry, setNewLinkExpiry] = useState("7 Days");
  const [newLinkMaxUses, setNewLinkMaxUses] = useState(10);
  const [expandedChain, setExpandedChain] = useState<string | null>("1");
  const [newStep, setNewStep] = useState<Record<string, { approver: string; role: string; condition: string }>>({});

  const copyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateLink = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newLink: InviteLink = {
      id: Date.now().toString(),
      role: newLinkRole,
      expiry: newLinkExpiry,
      uses: 0,
      maxUses: newLinkMaxUses,
      created: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
      url: `https://smarterp.app/invite/${newLinkRole.slice(0, 3).toUpperCase()}-${code}`,
    };
    setLinks([newLink, ...links]);
  };

  const revokeLink = (id: string) => setLinks(links.filter((l) => l.id !== id));

  const addStep = (chainId: string) => {
    const s = newStep[chainId];
    if (!s?.approver || !s?.role) return;
    setChains(chains.map((c) => c.id === chainId ? {
      ...c,
      steps: [...c.steps, { id: Date.now().toString(), approver: s.approver, role: s.role, condition: s.condition || "Always required" }]
    } : c));
    setNewStep({ ...newStep, [chainId]: { approver: "", role: "", condition: "" } });
  };

  const removeStep = (chainId: string, stepId: string) =>
    setChains(chains.map((c) => c.id === chainId ? { ...c, steps: c.steps.filter((s) => s.id !== stepId) } : c));

  const toggleChain = (chainId: string) =>
    setChains(chains.map((c) => c.id === chainId ? { ...c, active: !c.active } : c));

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h2 className="text-3xl font-bold text-white">Team & Workflow Settings</h2>
        <p className="text-slate-400 mt-1">Manage invite links and configure approval chain conditions.</p>
      </div>

      {/* ── Invite Links ─────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-500/10 rounded-lg"><Link2 className="h-5 w-5 text-indigo-400" /></div>
          <h3 className="text-xl font-bold text-white">Invite Links</h3>
        </div>

        {/* Generate */}
        <Card className="bg-slate-900 border-slate-800 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">Generate New Invite Link</CardTitle>
            <CardDescription className="text-slate-400">Create a shareable link to onboard team members with a specific role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Role</label>
                <select value={newLinkRole} onChange={(e) => setNewLinkRole(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                  {roleOptions.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Expires In</label>
                <select value={newLinkExpiry} onChange={(e) => setNewLinkExpiry(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                  {expiryOptions.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Max Uses</label>
                <input type="number" min={1} value={newLinkMaxUses} onChange={(e) => setNewLinkMaxUses(parseInt(e.target.value))}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm w-24 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <Button onClick={generateLink} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Generate Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 text-xs">{link.role}</Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                    <Clock className="h-2.5 w-2.5 mr-1" />{link.expiry}
                  </Badge>
                  <span className="text-xs text-slate-500">{link.uses}/{link.maxUses} uses</span>
                </div>
                <p className="text-sm font-mono text-slate-300 truncate">{link.url}</p>
                <p className="text-xs text-slate-500 mt-0.5">Created {link.created}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" onClick={() => copyLink(link.url, link.id)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  {copied === link.id ? <><Check className="h-3.5 w-3.5 mr-1 text-emerald-400" /> Copied</> : <><Copy className="h-3.5 w-3.5 mr-1" /> Copy</>}
                </Button>
                <Button size="sm" variant="outline" onClick={() => revokeLink(link.id)}
                  className="border-rose-800/50 text-rose-400 hover:bg-rose-500/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Approval Chains ───────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Shield className="h-5 w-5 text-emerald-400" /></div>
          <h3 className="text-xl font-bold text-white">Approval Chains</h3>
        </div>

        <div className="space-y-4">
          {chains.map((chain) => (
            <Card key={chain.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <button onClick={() => setExpandedChain(expandedChain === chain.id ? null : chain.id)}
                    className="flex items-center gap-3 text-left">
                    {expandedChain === chain.id ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                    <div>
                      <CardTitle className="text-white text-base">{chain.name}</CardTitle>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {chain.trigger}
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{chain.steps.length} steps</span>
                    <button onClick={() => toggleChain(chain.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${chain.active ? "bg-emerald-500" : "bg-slate-700"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${chain.active ? "left-5" : "left-0.5"}`}></span>
                    </button>
                  </div>
                </div>
              </CardHeader>

              {expandedChain === chain.id && (
                <CardContent className="pt-4">
                  {/* Steps */}
                  <div className="space-y-3 mb-5">
                    {chain.steps.map((step, idx) => (
                      <div key={step.id} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          {idx < chain.steps.length - 1 && <div className="w-0.5 h-8 bg-slate-800 mt-1"></div>}
                        </div>
                        <div className="flex-1 bg-slate-800/60 border border-slate-800 rounded-xl p-3 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-3.5 w-3.5 text-slate-500" />
                              <span className="text-white text-sm font-medium">{step.approver}</span>
                              <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">{step.role}</Badge>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Condition: {step.condition}
                            </p>
                          </div>
                          <button onClick={() => removeStep(chain.id, step.id)} className="text-slate-600 hover:text-rose-400 transition-colors flex-shrink-0">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Step */}
                  <div className="bg-slate-800/40 border border-slate-800 border-dashed rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-3 font-medium">Add Approval Step</p>
                    <div className="flex flex-wrap gap-3 items-end">
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Approver Name</label>
                        <input
                          placeholder="e.g. Priya Singh"
                          value={newStep[chain.id]?.approver ?? ""}
                          onChange={(e) => setNewStep({ ...newStep, [chain.id]: { ...newStep[chain.id], approver: e.target.value } })}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Role</label>
                        <input
                          placeholder="e.g. Finance Head"
                          value={newStep[chain.id]?.role ?? ""}
                          onChange={(e) => setNewStep({ ...newStep, [chain.id]: { ...newStep[chain.id], role: e.target.value } })}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Condition</label>
                        <input
                          placeholder="e.g. If amount > ₹1,00,000"
                          value={newStep[chain.id]?.condition ?? ""}
                          onChange={(e) => setNewStep({ ...newStep, [chain.id]: { ...newStep[chain.id], condition: e.target.value } })}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm w-64 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <Button size="sm" onClick={() => addStep(chain.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="h-3.5 w-3.5 mr-1" /> Add Step
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
