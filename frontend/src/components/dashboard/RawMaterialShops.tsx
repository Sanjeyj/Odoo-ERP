import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, TrendingUp, TrendingDown, PackageOpen, Phone, MapPin } from "lucide-react";

export default function RawMaterialShops() {
  const shops = [
    {
      id: 1,
      name: "TimberKing Lumber Co.",
      material: "Teak, Oak & Walnut Wood",
      status: "Active",
      reliability: 97,
      leadTime: "2-4 Days",
      contact: "Rajan Pillai",
      phone: "+91 98451 12345",
      location: "Ernakulam, Kerala",
      trend: "up"
    },
    {
      id: 2,
      name: "FoamPro Upholstery Supplies",
      material: "Foam, Fabric & Upholstery",
      status: "Active",
      reliability: 93,
      leadTime: "5-7 Days",
      contact: "Anil Sharma",
      phone: "+91 80102 67890",
      location: "Coimbatore, TN",
      trend: "up"
    },
    {
      id: 3,
      name: "SteelCraft Hardware Hub",
      material: "Steel Legs, Screws & Fittings",
      status: "Warning",
      reliability: 80,
      leadTime: "10-14 Days",
      contact: "Suresh Kumar",
      phone: "+91 94471 33221",
      location: "Chennai, TN",
      trend: "down"
    },
    {
      id: 4,
      name: "GlassEdge Interiors",
      material: "Tempered Glass & Mirrors",
      status: "Active",
      reliability: 91,
      leadTime: "7-10 Days",
      contact: "Divya Nair",
      phone: "+91 97001 55678",
      location: "Thrissur, Kerala",
      trend: "up"
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
