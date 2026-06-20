import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Package, Star, ArrowRight, ShieldCheck, Zap, Server } from "lucide-react";

export default function CustomerDashboard() {
  const products = [
    {
      id: 1,
      name: "Smart ERP Enterprise",
      description: "Full suite for large scale organizations with advanced AI capabilities.",
      price: "$999/mo",
      features: ["Unlimited Users", "24/7 Support", "Custom Analytics"],
      icon: Server,
    },
    {
      id: 2,
      name: "Smart ERP Professional",
      description: "Perfect for growing businesses needing streamlined operations.",
      price: "$299/mo",
      features: ["Up to 50 Users", "Email Support", "Standard Analytics"],
      icon: Zap,
    },
    {
      id: 3,
      name: "Smart ERP Starter",
      description: "Essential tools to get your small business off the ground.",
      price: "$99/mo",
      features: ["Up to 10 Users", "Community Support", "Basic Reports"],
      icon: Package,
    }
  ];

  const services = [
    {
      name: "Cloud Migration & Setup",
      description: "Seamlessly move your existing data and operations to Smart ERP cloud.",
      icon: ArrowRight,
    },
    {
      name: "Security Audit & Hardening",
      description: "Comprehensive security review to ensure your data is protected against modern threats.",
      icon: ShieldCheck,
    },
    {
      name: "Custom Integration Development",
      description: "Need to connect with legacy systems? Our experts can build custom bridges.",
      icon: Star,
    }
  ];

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 lg:p-12">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-32 -mt-10 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-indigo-500/20 text-indigo-400 mb-4 hover:bg-indigo-500/30 border-0">Welcome to Smart Customer Portal</Badge>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Products & Services</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Explore our cutting-edge enterprise resource planning solutions and professional services tailored to scale your business operations seamlessly.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/25">
            View My Orders
          </Button>
        </div>
      </div>

      {/* Products Catalog */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Store className="h-6 w-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Software Products</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                    <product.icon className="h-6 w-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
                    {product.price}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white mb-2">{product.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                      <ShieldCheck className="h-4 w-4 mr-2 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Professional Services */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Zap className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Professional Services</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-all cursor-pointer group">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {service.name}
                </h3>
                <service.icon className="h-5 w-5 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
              </div>
              <p className="text-slate-400 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
