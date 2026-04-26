"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight, 
  Minus, 
  Plus, 
  Star,
  Truck,
  Shield,
  RotateCcw,
  X
} from "lucide-react"
import { useStore } from "@/lib/store-context"
import { getProductById, products } from "@/lib/products"

const navItems = ["PERFUMES", "BRANDS", "SKINCARE", "MAKEUP", "HAIRCARE", "AROMATHERAPY", "CANDLES", "GIFTS"]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, cartCount } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description")

  const product = getProductById(parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-purple-700 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-center">
            <span className="text-yellow-400">★</span>
            <span>Only 11 days left until VALENTINE&apos;S DAY!</span>
            <span className="text-yellow-400">★</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="#" className="hover:text-gray-300">Help & Information</Link>
            <Link href="#" className="hover:text-gray-300">Connect with us</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-800 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-800 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </button>

            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Hey, what are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-purple-700">Perfume</span>
                  <span className="text-xl font-bold text-gray-800">Shop</span>
                  <span className="text-[8px] text-gray-500 align-top">.com</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/account" className="hidden sm:flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">My Account</span>
              </Link>
              <Link href="/wishlist" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden lg:inline">{cartCount} Items</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Hey, what are you looking for?"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        <nav className="hidden lg:block border-t bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-center gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <Link href="#" className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="bg-white w-80 h-full overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ul className="p-4">
                {navItems.map((item) => (
                  <li key={item} className="border-b">
                    <Link href="#" className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-700">Home</Link>
            <span>/</span>
            <Link href="#" className="hover:text-purple-700">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <span className={`absolute top-4 left-4 ${product.tagColor} text-white text-xs px-3 py-1 z-10`}>
                {product.tag}
              </span>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-50 rounded border-2 border-transparent hover:border-purple-700 cursor-pointer overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    width={100}
                    height={100}
                    className="object-contain p-2 w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.category} {product.type && `- ${product.type}`}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(48 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">or 4 interest-free payments of ${(product.price / 4).toFixed(2)} with Afterpay</p>
            </div>

            {/* Size */}
            {product.size && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">Size: {product.size}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-purple-700 text-purple-700 text-sm font-medium">
                    {product.size}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:border-gray-400">
                    200ml
                  </button>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-green-600">In Stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#1a1a2e] text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                ADD TO BAG
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`w-14 h-14 border flex items-center justify-center transition-colors ${
                  inWishlist ? "bg-pink-50 border-pink-300" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "text-pink-500 fill-pink-500" : "text-gray-600"}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-700" />
                <span className="text-xs text-gray-600">Free Shipping Over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-700" />
                <span className="text-xs text-gray-600">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-700" />
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-purple-700 border-b-2 border-purple-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-6">
                {activeTab === "description" && (
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                )}
                {activeTab === "details" && (
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Size:</strong> {product.size || "N/A"}</li>
                    <li><strong>Type:</strong> {product.type || product.category}</li>
                    <li><strong>Category:</strong> {product.category}</li>
                    <li><strong>SKU:</strong> PS-{product.id.toString().padStart(6, "0")}</li>
                  </ul>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">4.8</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">48 reviews</p>
                      </div>
                    </div>
                    <div className="border-t pt-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm font-medium">Sarah M.</span>
                          <span className="text-xs text-gray-500">Verified Purchase</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Absolutely love this fragrance! It lasts all day and I always get compliments when I wear it.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <div className="relative bg-gray-50 aspect-square mb-3 overflow-hidden">
                  <span className={`absolute top-2 left-2 ${p.tagColor} text-white text-[10px] px-2 py-0.5 z-10`}>
                    {p.tag}
                  </span>
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={150}
                      height={200}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate">{p.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-500">from </span>
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            Entire Contents Copyright © 1997-2023 PerfumeShop.com, Inc. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
