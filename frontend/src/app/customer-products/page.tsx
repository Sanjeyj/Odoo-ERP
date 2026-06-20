"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Star, ArrowRight, Zap } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Royal Teak Bed Frame",
    description: "Handcrafted solid teak wood king-size bed frame with intricate carvings. Built to last a lifetime.",
    price: "₹45,000",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 128,
    image: "/products/bed_frame.png",
    features: ["Solid Teak Wood", "King / Queen Size", "5-Year Warranty", "Free Assembly"],
    category: "Bedroom",
  },
  {
    id: 2,
    name: "6-Seater Dining Table Set",
    description: "Premium oak dining table with 6 cushioned chairs. Perfect for family gatherings.",
    price: "₹72,000",
    badge: "New Arrival",
    rating: 4.8,
    reviews: 94,
    image: "/products/dining_table.png",
    features: ["Solid Oak Wood", "6 Cushioned Chairs", "Scratch-Resistant Top", "3-Year Warranty"],
    category: "Dining",
  },
  {
    id: 3,
    name: "3-Door Wardrobe (Walnut)",
    description: "Spacious walnut-finish wardrobe with mirror panels and soft-close drawers.",
    price: "₹38,500",
    badge: "Popular",
    rating: 4.7,
    reviews: 76,
    image: "/products/wardrobe.png",
    features: ["Walnut Finish", "3 Doors + Mirror", "Soft-Close Drawers", "2-Year Warranty"],
    category: "Bedroom",
  },
  {
    id: 4,
    name: "L-Shape Sofa Set",
    description: "7-seater L-shaped sofa with premium foam cushioning and velvet upholstery.",
    price: "₹55,000",
    badge: "Trending",
    rating: 4.8,
    reviews: 112,
    image: "/products/sofa.png",
    features: ["7-Seater L-Shape", "Premium Foam", "Velvet Upholstery", "Washable Covers"],
    category: "Living Room",
  },
];

const services = [
  {
    name: "Custom Furniture Design",
    description: "Share your vision and our master craftsmen will build bespoke furniture tailored exactly to your space and style.",
    icon: Star,
    duration: "2–4 Weeks",
    price: "From ₹8,000",
  },
  {
    name: "Free Home Delivery & Assembly",
    description: "We deliver to your doorstep and our expert team assembles every piece with precision at no extra cost.",
    icon: ArrowRight,
    duration: "1–3 Days",
    price: "Free",
  },
  {
    name: "Furniture Restoration & Polish",
    description: "Breathe new life into your old furniture with our professional restoration, sanding, and premium polishing service.",
    icon: Zap,
    duration: "3–7 Days",
    price: "From ₹2,500",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

export default function CustomerProductsPage() {
  return (
    <div className="space-y-12 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Products & Services</h1>
        <p className="text-slate-400">Browse our premium handcrafted furniture collection and professional services.</p>
      </div>

      {/* Products Grid */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-indigo-500 rounded-full inline-block"></span>
          Our Furniture Collection
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {products.map((product) => (
            <Card key={product.id} className="bg-slate-900 border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group overflow-hidden">
              <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-amber-500/90 text-amber-950 font-semibold text-xs">{product.badge}</Badge>
                  <Badge className="bg-slate-800/90 text-slate-300 text-xs">{product.category}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <span className="text-indigo-400 font-bold text-lg">{product.price}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={product.rating} />
                  <span className="text-slate-400 text-xs">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <CardDescription className="text-slate-400 mt-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                      <ShieldCheck className="h-3.5 w-3.5 mr-2 text-emerald-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Order Now</Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-500 rounded-full inline-block"></span>
          Our Services
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all group">
              <div className="p-3 bg-emerald-500/10 rounded-xl w-fit mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <service.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{service.name}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
              <div className="flex justify-between text-xs text-slate-500 border-t border-slate-800 pt-3 mt-auto">
                <span>⏱ {service.duration}</span>
                <span className="text-emerald-400 font-medium">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
