import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, TrendingUp, TrendingDown, PackageOpen, Phone, MapPin } from "lucide-react";

export default function RawMaterialShops() {
  const shops = [
    {
      id: 1,
      name: "Apex Metals & Alloys",
      material: "Steel & Aluminum",
      status: "Active",
      reliability: 98,
      leadTime: "3-5 Days",
      contact: "John Apex",
      phone: "+1 (555) 123-4567",
      location: "Detroit, MI",
      trend: "up"
    },
    {
      id: 2,
      name: "Global Polymers Ltd.",
      material: "Industrial Plastics",
      status: "Active",
      reliability: 94,
      leadTime: "7-10 Days",
      contact: "Sarah Jenkins",
      phone: "+1 (555) 987-6543",
      location: "Houston, TX",
      trend: "up"
    },
    {
      id: 3,
      name: "CircuitTech Components",
      material: "Microchips & Boards",
      status: "Warning",
      reliability: 82,
      leadTime: "14-21 Days",
      contact: "Mike Chen",
      phone: "+1 (555) 456-7890",
      location: "San Jose, CA",
      trend: "down"
    }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <Store className="h-6 w-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">Raw Material Purchasing Shops</h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <Card key={shop.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white mb-1">{shop.name}</CardTitle>
                  <CardDescription className="flex items-center text-slate-400">
                    <PackageOpen className="h-3 w-3 mr-1" />
                    {shop.material}
                  </CardDescription>
                </div>
                <Badge 
                  variant={shop.status === "Active" ? "default" : "destructive"} 
                  className={shop.status === "Active" ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"}
                >
                  {shop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Reliability Score</span>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-2">{shop.reliability}%</span>
                    {shop.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Avg Lead Time</span>
                  <span className="text-white font-medium">{shop.leadTime}</span>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="h-3 w-3 mr-2" />
                    {shop.location}
                  </div>
                  <div className="flex items-center text-xs text-slate-400">
                    <Phone className="h-3 w-3 mr-2" />
                    {shop.phone} ({shop.contact})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
