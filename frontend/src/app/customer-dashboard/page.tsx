import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight, Package, CheckCircle } from "lucide-react";

const featuredProducts = [
  { id: 1, name: "Royal Teak Bed Frame", price: "₹45,000", badge: "Best Seller", rating: 4.9, reviews: 128, image: "/products/bed_frame.png" },
  { id: 2, name: "6-Seater Dining Table", price: "₹72,000", badge: "New Arrival", rating: 4.8, reviews: 94,  image: "/products/dining_table.png" },
  { id: 3, name: "3-Door Wardrobe",       price: "₹38,500", badge: "Popular",    rating: 4.7, reviews: 76,  image: "/products/wardrobe.png" },
  { id: 4, name: "L-Shape Sofa Set",      price: "₹55,000", badge: "Trending",   rating: 4.8, reviews: 112, image: "/products/sofa.png" },
];

const reviews = [
  { name: "Priya Sharma", location: "Kochi, Kerala", rating: 5, product: "Royal Teak Bed Frame", text: "Absolutely stunning craftsmanship! The teak bed frame exceeded all expectations. The wood grain is beautiful and the finish is perfect. Highly recommend SmartFurniture!", avatar: "PS" },
  { name: "Arun Menon", location: "Chennai, TN", rating: 5, product: "6-Seater Dining Table", text: "Our family of 6 loves the dining table set. Solid oak, very sturdy, and the chairs are incredibly comfortable. Delivery and assembly were smooth and quick.", avatar: "AM" },
  { name: "Deepa Nair", location: "Bangalore, KA", rating: 4, product: "L-Shape Sofa Set", text: "The velvet sofa is luxurious and fits our living room perfectly. Very happy with the quality. Will definitely be ordering the matching coffee table next!", avatar: "DN" },
  { name: "Suresh Babu", location: "Coimbatore, TN", rating: 5, product: "3-Door Wardrobe", text: "The walnut wardrobe is spacious and the soft-close drawers are a premium touch. Mirror panels are clear and well-mounted. Great value for money.", avatar: "SB" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
      ))}
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <div className="space-y-12 pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 lg:p-12">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-32 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-indigo-500/20 text-indigo-400 mb-4 hover:bg-indigo-500/30 border-0">Welcome to Smart Furniture Customer Portal</Badge>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Your Home, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Perfectly Furnished</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Explore premium handcrafted furniture — from bedrooms to living rooms. Quality craftsmanship, delivered to your doorstep.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/customer-products">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 rounded-xl text-base transition-all shadow-lg shadow-indigo-500/25">
                Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/customer-orders">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-5 rounded-xl text-base">
                <ShoppingCart className="mr-2 h-4 w-4" /> My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Products", value: "50+", icon: Package },
          { label: "Happy Customers", value: "1,200+", icon: CheckCircle },
          { label: "Avg Rating", value: "4.8 ★", icon: Star },
          { label: "Cities Delivered", value: "35+", icon: ArrowRight },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-slate-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link href="/customer-products">
            <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300">View All <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="bg-slate-900 border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group overflow-hidden cursor-pointer">
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <Badge className="absolute top-2 left-2 bg-amber-500/90 text-amber-950 text-xs font-semibold">{product.badge}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={Math.round(product.rating)} />
                  <span className="text-slate-500 text-xs">({product.reviews})</span>
                </div>
                <p className="text-indigo-400 font-bold">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">What Our Customers Say</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((review, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-slate-500 text-xs">{review.location}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">"{review.text}"</p>
              <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs bg-slate-800/50">
                Purchased: {review.product}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
