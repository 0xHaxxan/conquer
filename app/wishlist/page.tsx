"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown,
  X,
  Trash2
} from "lucide-react"
import { useStore } from "@/lib/store-context"

const navItems = ["PERFUMES", "BRANDS", "SKINCARE", "MAKEUP", "HAIRCARE", "AROMATHERAPY", "CANDLES", "GIFTS"]

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, cartCount } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleAddToCart = (product: typeof wishlist[0]) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  const handleAddAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product)
    })
    wishlist.forEach(product => {
      removeFromWishlist(product.id)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
      <header className="bg-white border-b">
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
              <Link href="/wishlist" className="flex items-center gap-1 text-sm text-purple-700 font-medium">
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist ({wishlist.length})</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden lg:inline">{cartCount} Items</span>
              </Link>
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

      {/* Wishlist Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist ({wishlist.length} items)</h1>
          {wishlist.length > 0 && (
            <button 
              onClick={handleAddAllToCart}
              className="bg-[#1a1a2e] text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              ADD ALL TO BAG
            </button>
          )}
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                <div className="relative aspect-square bg-gray-50">
                  <span className={`absolute top-2 left-2 ${product.tagColor} text-white text-[10px] px-2 py-0.5 z-10`}>
                    {product.tag}
                  </span>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 shadow-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate hover:text-purple-700">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    <span className="text-xs font-normal text-gray-500">from </span>
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full border border-gray-900 py-2 text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save your favorite items to purchase later</p>
            <Link 
              href="/" 
              className="inline-block bg-[#1a1a2e] text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        )}
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
